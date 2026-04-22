const { UPLOAD_PATHS } = require("../../config/uploadPaths");
const pptModel = require("../../model/ppt/pptModel");
const pptSlidesModel = require("../../model/ppt/pptSlidesModel");
const { sendApiResponse } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const pptController = {
  renderPptListPage: asyncHandler(async (req, res) => {
    let sort = req.query.sort || "desc";

    let ppts = await pptModel.list(res.pool);

    if (sort === "asc") {
      ppts = ppts.reverse();
    }

    renderPage(res, "user/ppt/ppt-list-page.pug", {
      title: "PPT List",
      ppts,
      sort,
    });
  }),

  renderCreatePptPage: asyncHandler(async (req, res) => {
    renderPage(res, "user/ppt/ppt-form-page.pug", {
      title: "Create PPT",
    });
  }),

  renderEditPptPage: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [ppt] = await pptModel.getById(res.pool, id);
    renderPage(res, "user/ppt/edit-ppt-form-page.pug", {
      title: "Edit PPT",
      ppt,
    });
  }),

  create: asyncHandler(async (req, res) => {
    const pptData = req.body;

    const coverImage = req.files.cover_image;
    const page1Image = req.files.page_1_image;
    const page2Image = req.files.page_2_image;
    const page3Image = req.files.page_3_image;
    const remainingPagesHeaderImage = req.files.remaining_pages_header_image;

    if (
      !coverImage ||
      !page1Image ||
      !page2Image ||
      !page3Image ||
      !remainingPagesHeaderImage
    ) {
      return sendApiResponse(res, 404, false, "All images are required");
    }

    /**
     * COVER IMAGE
     */
    const cover_image = generateUniqueFileName(coverImage, "ppt-cover-img");
    await saveFile(coverImage, `${UPLOAD_PATHS.ppt.cover}/${cover_image}`);

    /**
     * PAGE IMAGES
     */
    const page_1_image = generateUniqueFileName(page1Image, "ppt-page-1-img");
    await saveFile(page1Image, `${UPLOAD_PATHS.ppt.pages}/${page_1_image}`);

    const page_2_image = generateUniqueFileName(page2Image, "ppt-page-2-img");
    await saveFile(page3Image, `${UPLOAD_PATHS.ppt.pages}/${page_2_image}`);

    const page_3_image = generateUniqueFileName(page3Image, "ppt-page-4-img");
    await saveFile(page3Image, `${UPLOAD_PATHS.ppt.pages}/${page_3_image}`);

    const remaining_pages_header_image = generateUniqueFileName(
      remainingPagesHeaderImage,
      "ppt-remaining-pages-header-img",
    );

    await saveFile(
      remainingPagesHeaderImage,
      `${UPLOAD_PATHS.ppt.pages}/${remaining_pages_header_image}`,
    );

    /**
     * SAVE DB
     */
    const { insertId } = await pptModel.save(res.pool, {
      ...pptData,
      cover_image,
      page_1_image,
      page_2_image,
      page_3_image,
      remaining_pages_header_image,
    });

    return sendApiResponse(res, 200, true, "PPT created successfully", {
      insertId,
    });
  }),

  update: asyncHandler(async (req, res) => {
    const pptData = req.body;

    // 1. Validate ID
    if (!pptData.id) {
      return sendApiResponse(res, 400, false, "PPT ID is required for update.");
    }

    // 2. Fetch existing record
    const [existing] = await pptModel.getById(res.pool, pptData.id);

    if (!existing) {
      return sendApiResponse(res, 404, false, "PPT not found.");
    }

    const coverImage = req.files?.cover_image;
    const page1Image = req.files?.page_1_image;
    const page2Image = req.files?.page_2_image;
    const page3Image = req.files?.page_3_image;
    const remainingPagesHeaderImage = req.files?.remaining_pages_header_image;

    let cover_image = existing.cover_image;
    let page_1_image = existing.page_1_image;
    let page_2_image = existing.page_2_image;
    let page_3_image = existing.page_3_image;
    let remaining_pages_header_image = existing.remaining_pages_header_image;

    /**
     * COVER IMAGE
     */
    if (coverImage) {
      cover_image = generateUniqueFileName(coverImage, "ppt-cover-img");

      await saveFile(coverImage, `${UPLOAD_PATHS.ppt.cover}/${cover_image}`);

      if (existing.cover_image) {
        await deleteFile(`${UPLOAD_PATHS.ppt.cover}/${existing.cover_image}`);
      }
    }

    /**
     * PAGE 1 IMAGE
     */
    if (page1Image) {
      page_1_image = generateUniqueFileName(page1Image, "ppt-page-1-img");

      await saveFile(page1Image, `${UPLOAD_PATHS.ppt.pages}/${page_1_image}`);

      if (existing.page_1_image) {
        await deleteFile(`${UPLOAD_PATHS.ppt.pages}/${existing.page_1_image}`);
      }
    }

    /**
     * PAGE 2 IMAGE
     */
    if (page2Image) {
      page_2_image = generateUniqueFileName(page2Image, "ppt-page-2-img");

      await saveFile(page2Image, `${UPLOAD_PATHS.ppt.pages}/${page_2_image}`);

      if (existing.page_2_image) {
        await deleteFile(`${UPLOAD_PATHS.ppt.pages}/${existing.page_2_image}`);
      }
    }

    /**
     * PAGE 3 IMAGE
     */
    if (page3Image) {
      page_3_image = generateUniqueFileName(page3Image, "ppt-page-3-img");

      await saveFile(page3Image, `${UPLOAD_PATHS.ppt.pages}/${page_3_image}`);

      if (existing.page_3_image) {
        await deleteFile(`${UPLOAD_PATHS.ppt.pages}/${existing.page_3_image}`);
      }
    }

    /**
     * REMAINING PAGE HEADER IMAGE
     */
    if (remainingPagesHeaderImage) {
      remaining_pages_header_image = generateUniqueFileName(
        remainingPagesHeaderImage,
        "ppt-remaining-pages-header-img",
      );

      await saveFile(
        remainingPagesHeaderImage,
        `${UPLOAD_PATHS.ppt.pages}/${remaining_pages_header_image}`,
      );

      if (existing.remaining_pages_header_image) {
        await deleteFile(
          `${UPLOAD_PATHS.ppt.pages}/${existing.remaining_pages_header_image}`,
        );
      }
    }

    /**
     * Attach final values
     */
    Object.assign(pptData, {
      cover_image,
      page_1_image,
      page_2_image,
      page_3_image,
      remaining_pages_header_image,
    });

    /**
     * Update DB
     */
    const updatedPpt = await pptModel.update(res.pool, pptData);

    return sendApiResponse(res, 200, true, "PPT updated successfully", {
      updatedPpt,
    });
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) return sendApiResponse(res, 400, false, "PPT ID is required");

    const [existingPpt] = await pptModel.getById(res.pool, id);
    if (!existingPpt) return sendApiResponse(res, 404, false, "PPT not found");

    // 1. Fetch all slides for this PPT to delete their individual images securely
    const slides = await pptSlidesModel.listSlides(res.pool, id);

    for (const slide of slides) {
      try {
        let b = slide.before_images;
        let a = slide.after_images;
        if (typeof b === "string") b = JSON.parse(b);
        if (typeof b === "string") b = JSON.parse(b);
        if (typeof a === "string") a = JSON.parse(a);
        if (typeof a === "string") a = JSON.parse(a);

        const parsedBefore = Array.isArray(b) ? b : [];
        const parsedAfter = Array.isArray(a) ? a : [];

        for (const img of parsedBefore) {
          if (img && img.image_name)
            await deleteFile(
              `${UPLOAD_PATHS.ppt.slideBefore}/${img.image_name}`,
            );
        }
        for (const img of parsedAfter) {
          if (img && img.image_name)
            await deleteFile(
              `${UPLOAD_PATHS.ppt.slideAfter}/${img.image_name}`,
            );
        }
      } catch (e) {
        console.error(
          "Error deleting slide images during PPT cascade delete:",
          e,
        );
      }
    }

    // 2. Delete the PPT's root cover image if it exists
    if (existingPpt.cover_image) {
      await deleteFile(`${UPLOAD_PATHS.ppt.cover}/${existingPpt.cover_image}`);
    }

    // 3. Delete all slide records and the parent PPT from the database
    await pptModel.hardDelete(res.pool, id);

    return sendApiResponse(
      res,
      200,
      true,
      "PPT and all its slides were deleted successfully.",
    );
  }),

  renderPptPrintPage: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [ppt] = await pptModel.getById(res.pool, id);
    if (!ppt) {
      return res.status(404).send("PPT not found");
    }

    const slides = await pptSlidesModel.listSlides(res.pool, id);

    // Process slides to parse image arrays and determine base URLs for images
    const processedSlides = slides.map((slide) => {
      let b = slide.before_images;
      let a = slide.after_images;
      if (typeof b === "string") b = JSON.parse(b);
      if (typeof b === "string") b = JSON.parse(b);
      if (typeof a === "string") a = JSON.parse(a);
      if (typeof a === "string") a = JSON.parse(a);

      return {
        ...slide,
        parsed_before_images: Array.isArray(b) ? b : [],
        parsed_after_images: Array.isArray(a) ? a : [],
      };
    });

    renderPage(res, "user/ppt/ppt-print-page.pug", {
      title: "Print PPT",
      ppt,
      slides: processedSlides,
      layout: false, // If we want a clean layout for printing
    });
  }),

  downloadPptPdf: asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Use localhost and internal port to avoid DNS hair-pinning and proxy loop issues in production
    const port = process.env.PORT || 5900;
    const pdfUrl = `http://127.0.0.1:${port}/ppt/print/${id}`;

    const generatePdf = require("../../utils/generatePdf"); // required dynamically to avoid circular dependencies if any, or can import at top

    try {
      const pdfBuffer = await generatePdf(pdfUrl, {
        landscape: true,
        width: "1280px",
        height: "720px",
        printBackground: true,
        margin: {
          top: "0mm",
          right: "0mm",
          bottom: "0mm",
          left: "0mm",
        },
        preferCSSPageSize: true,
      });

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="PPT_${id}.pdf"`,
        "Content-Length": pdfBuffer.length,
      });

      res.send(pdfBuffer);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      res.status(500).send("Error generating PDF");
    }
  }),
};

module.exports = pptController;
