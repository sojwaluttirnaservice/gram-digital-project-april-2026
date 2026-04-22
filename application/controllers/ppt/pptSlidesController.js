const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");
const { sendApiResponse } = require("../../utils/apiResponses");
const pptSlidesModel = require("../../model/ppt/pptSlidesModel");
const pptModel = require("../../model/ppt/pptModel");
const { UPLOAD_PATHS } = require("../../config/uploadPaths");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");

// Helper function to handle multiple file uploads and return array of objects
const uploadImagesObj = async (files, prefix, directory) => {
  if (!files) return [];
  const fileArray = Array.isArray(files) ? files : [files];
  const uploadedObjs = [];

  // Enforce Max 2 limit
  const limitToProcess = fileArray.slice(0, 2);

  for (const file of limitToProcess) {
    if (file && file.name) {
      const fileName = generateUniqueFileName(file, prefix);
      await saveFile(file, `${directory}/${fileName}`);
      uploadedObjs.push({
        id: Math.floor(Math.random() * 1000000000).toString(),
        image_name: fileName,
      });
    }
  }
  return uploadedObjs;
};

// Helper function to delete multiple images (now accepts array of objects)
const deleteImagesObj = async (imageObjs, directory) => {
  if (!imageObjs || !Array.isArray(imageObjs)) return;
  for (const img of imageObjs) {
    if (img && img.image_name) {
      await deleteFile(`${directory}/${img.image_name}`);
    }
  }
};

const pptSlidesController = {
  // New API: Render the list of slides for a PPT
  renderSlideListPage: asyncHandler(async (req, res) => {
    const { pptId } = req.params;

    // Fetch PPT details for header context
    const [ppt] = await pptModel.getById(res.pool, pptId);
    if (!ppt) {
      return sendApiResponse(res, 404, false, "PPT not found");
    }

    // Fetch Slides
    const slides = await pptSlidesModel.listSlides(res.pool, pptId);

    renderPage(res, "user/ppt/slide-list-page.pug", {
      title: "Slide List",
      ppt,
      slides,
    });
  }),

  renderCreateSlidePage: asyncHandler(async (req, res) => {
    const { pptId } = req.params;
    renderPage(res, "user/ppt/ppt-slides-form-page.pug", {
      title: "Create Slide",
      pptId,
    });
  }),

  renderEditSlidePage: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [slide] = await pptSlidesModel.getSlideById(res.pool, id);

    let parsedBefore = [];
    let parsedAfter = [];
    try {
      let b = slide.before_images;
      let a = slide.after_images;

      if (typeof b === "string") b = JSON.parse(b);
      if (typeof b === "string") b = JSON.parse(b); // Catch double stringification

      if (typeof a === "string") a = JSON.parse(a);
      if (typeof a === "string") a = JSON.parse(a);

      parsedBefore = Array.isArray(b) ? b : [];
      parsedAfter = Array.isArray(a) ? a : [];
    } catch (e) {
      console.error("Parse error:", e);
    }

    slide.parsed_before_images = parsedBefore;
    slide.parsed_after_images = parsedAfter;

    renderPage(res, "user/ppt/edit-ppt-slides-form-page.pug", {
      title: "Edit Slide",
      slide,
    });
  }),

  createSlide: asyncHandler(async (req, res) => {
    const slideData = req.body;

    if (!slideData.ppt_id_fk) {
      return sendApiResponse(res, 400, false, "PPT ID is required");
    }

    // Process file uploads
    let before_images = [];
    let after_images = [];

    if (req.files) {
      before_images = await uploadImagesObj(
        req.files.before_images,
        "slide-before",
        UPLOAD_PATHS.ppt.slideBefore,
      );
      after_images = await uploadImagesObj(
        req.files.after_images,
        "slide-after",
        UPLOAD_PATHS.ppt.slideAfter,
      );
    }

    slideData.before_images = before_images;
    slideData.after_images = after_images;

    const newSlide = await pptSlidesModel.saveSlide(res.pool, slideData);

    // Update ppt total slide count automatically
    await pptModel.updateSlideCount(res.pool, slideData.ppt_id_fk);

    return sendApiResponse(res, 200, true, "Slide created successfully", {
      newSlide,
    });
  }),

  updateSlide: asyncHandler(async (req, res) => {
    const slideData = req.body;

    if (!slideData.id) {
      return sendApiResponse(
        res,
        400,
        false,
        "Slide ID is required for update.",
      );
    }

    const [existing] = await pptSlidesModel.getSlideById(
      res.pool,
      slideData.id,
    );

    if (!existing) {
      return sendApiResponse(res, 404, false, "Slide not found.");
    }

    // Retain existing images by default, parse them if they are stored as JSON strings
    let parsedBefore = [];
    let parsedAfter = [];

    try {
      let b = existing.before_images;
      let a = existing.after_images;

      if (typeof b === "string") b = JSON.parse(b);
      if (typeof b === "string") b = JSON.parse(b);

      if (typeof a === "string") a = JSON.parse(a);
      if (typeof a === "string") a = JSON.parse(a);

      parsedBefore = Array.isArray(b) ? b : [];
      parsedAfter = Array.isArray(a) ? a : [];
    } catch (e) {
      console.error("Failed to parse existing slide images", e);
    }

    // Capture specific images user explicitly deleted on frontend (by ID)
    let removedBeforeIds = req.body.removed_before_ids
      ? JSON.parse(req.body.removed_before_ids)
      : [];
    let removedAfterIds = req.body.removed_after_ids
      ? JSON.parse(req.body.removed_after_ids)
      : [];

    // Filter out logically deleted images
    let retainedBefore = parsedBefore.filter(
      (img) => !removedBeforeIds.includes(img.id),
    );
    let retainedAfter = parsedAfter.filter(
      (img) => !removedAfterIds.includes(img.id),
    );

    // Delete the physically removed ones
    const physicallyRemovedBefore = parsedBefore.filter((img) =>
      removedBeforeIds.includes(img.id),
    );
    const physicallyRemovedAfter = parsedAfter.filter((img) =>
      removedAfterIds.includes(img.id),
    );

    await deleteImagesObj(
      physicallyRemovedBefore,
      UPLOAD_PATHS.ppt.slideBefore,
    );
    await deleteImagesObj(physicallyRemovedAfter, UPLOAD_PATHS.ppt.slideAfter);

    let finalBeforeImages = retainedBefore;
    let finalAfterImages = retainedAfter;

    if (req.files) {
      // Process newly added before images (respecting max 2 limit combined with retained)
      if (req.files.new_before_images) {
        const newBefore = Array.isArray(req.files.new_before_images)
          ? req.files.new_before_images
          : [req.files.new_before_images];
        const availableBeforeSlots = Math.max(0, 2 - retainedBefore.length);
        const limitBefore = newBefore.slice(0, availableBeforeSlots);

        if (limitBefore.length > 0) {
          const uploadedNewBefore = await uploadImagesObj(
            limitBefore,
            "slide-before",
            UPLOAD_PATHS.ppt.slideBefore,
          );
          finalBeforeImages = [...retainedBefore, ...uploadedNewBefore];
        }
      }

      // Process newly added after images (respecting max 2 limit combined with retained)
      if (req.files.new_after_images) {
        const newAfter = Array.isArray(req.files.new_after_images)
          ? req.files.new_after_images
          : [req.files.new_after_images];
        const availableAfterSlots = Math.max(0, 2 - retainedAfter.length);
        const limitAfter = newAfter.slice(0, availableAfterSlots);

        if (limitAfter.length > 0) {
          const uploadedNewAfter = await uploadImagesObj(
            limitAfter,
            "slide-after",
            UPLOAD_PATHS.ppt.slideAfter,
          );
          finalAfterImages = [...retainedAfter, ...uploadedNewAfter];
        }
      }
    }

    slideData.before_images = finalBeforeImages;
    slideData.after_images = finalAfterImages;

    const updatedSlide = await pptSlidesModel.updateSlide(res.pool, slideData);

    return sendApiResponse(res, 200, true, "Slide updated successfully", {
      updatedSlide,
    });
  }),

  deleteSlide: asyncHandler(async (req, res) => {
    const { id } = req.body; // or req.params depending on how the frontend calls it. Usually delete operations pass id in body or query/params

    if (!id) {
      return sendApiResponse(res, 400, false, "Slide ID is required");
    }

    const [existing] = await pptSlidesModel.getSlideById(res.pool, id);

    if (!existing) {
      return sendApiResponse(res, 404, false, "Slide not found");
    }

    // Clean up associated images
    try {
      let b = existing.before_images;
      let a = existing.after_images;

      if (typeof b === "string") b = JSON.parse(b);
      if (typeof b === "string") b = JSON.parse(b);

      if (typeof a === "string") a = JSON.parse(a);
      if (typeof a === "string") a = JSON.parse(a);

      const parsedBefore = Array.isArray(b) ? b : [];
      const parsedAfter = Array.isArray(a) ? a : [];

      await deleteImagesObj(parsedBefore, UPLOAD_PATHS.ppt.slideBefore);
      await deleteImagesObj(parsedAfter, UPLOAD_PATHS.ppt.slideAfter);
    } catch (e) {
      console.error("Failed to parse existing slide images during delete", e);
    }

    await pptSlidesModel.deleteSlide(res.pool, id);

    // Update model slide count (needs ppt_id_fk to decrement accurately)
    await pptModel.updateSlideCount(res.pool, existing.ppt_id_fk);

    return sendApiResponse(res, 200, true, "Slide deleted successfully");
  }),

  // API to get all slides for a PPT (used by frontend carousel)
  getSlides: asyncHandler(async (req, res) => {
    const { pptId } = req.params;
    if (!pptId) {
      return sendApiResponse(res, 400, false, "PPT ID is required");
    }

    const [ppt] = await pptModel.getById(res.pool, pptId);

    console.log(ppt)

    const slides = await pptSlidesModel.listSlides(res.pool, pptId);
    return sendApiResponse(res, 200, true, "Slides fetched successfully", {
      ppt,
      slides,
    });
  }),
};

module.exports = pptSlidesController;
