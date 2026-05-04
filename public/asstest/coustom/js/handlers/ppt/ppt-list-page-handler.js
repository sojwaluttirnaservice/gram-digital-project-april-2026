/*
========================================================
STANDARD SLIDE MEASUREMENTS (16:9 PRESENTATION RATIO)
========================================================

Total Slide Size
----------------
Width  : 1280px
Height : 720px

This follows the absolute standard presentation ratio (16:9) used by:
- PowerPoint
- Google Slides
- Keynote

By using EXACT pixel uploads, your images will NOT be stretched or cropped.
They will perfectly fit the layout.

--------------------------------------------------------

SLIDE LAYOUT STRUCTURE (ON REMAINING PAGES)

┌─────────────────────────────────────────────┐
│                HEADER AREA                  │
│                (1280 x 80)                  │
├─────────────────────────────────────────────┤
│                TITLE AREA                   │
│                (1280 x 80)                  │
├─────────────────────────────────────────────┤
│                                             │
│        BEFORE IMAGES        | AFTER IMAGES  │
│         (Left Panel)        | (Right Panel) │
│         (640 x 560 max)     | (640 x 560 max)│
│                             |               │
└─────────────────────────────────────────────┘

--------------------------------------------------------

SECTION MEASUREMENTS & RECOMMENDED UPLOADS

1️⃣ HEADER IMAGE (Remaining Pages Header Image)
-----------------------------------------------
Expected Width : 1280px
Expected Height: 80px
Why?: So the image covers the exact dimension (100% width, 11.11% height) 
without stretching text, logos, or distorting your branding. Uploading exactly
1280x80 ensures a pixel-perfect fit. 

2️⃣ TITLE AREA (Dynamic Text) 
-----------------------------------------------
Width : 1280px
Height: 80px (Text is automatically centered here)

3️⃣ IMAGE PANELS (Before & After)
-----------------------------------------------
Total Height: 560px
Total Width : 1280px

Divided into 2 columns:
Before images: 640px × 560px
After images:  640px × 560px

Within each panel, images naturally scale uniformly without stretching 
(using object-fit: contain). We constrain their width to 85% of their column 
(approx 544px) so they don't look overly stretched horizontally and maintain a 
clean, standard border distance.

Recommended Upload Size (Before & After):
Width  : 1000px 
Height : 750px (Standard 4:3 Ratio looks best)

4️⃣ FULL PAGE IMAGES & COVER IMAGES (Intro Pages)
-----------------------------------------------
Width  : 1920px 
Height : 1080px (These will scale cleanly down to 1280x720) 

========================================================
QUICK UPLOAD CHEATSHEET
========================================================

Image Type                Expected Minimum Dimension
------------------------------------------------------
Cover Image               1920 × 1080 (16:9 Ratio)
Page Images (Intro 1-3)   1920 × 1080 (16:9 Ratio)
Header Image (Top)        1280 × 80   (EXACT SIZE)
Before Images             1000 × 750  (4:3 Ratio)
After Images              1000 × 750  (4:3 Ratio)

========================================================
*/

$(() => {
  const gpElement = document.querySelector("#gpData");
  const gp = JSON.parse(gpElement.getAttribute("data-gp"));

  const carouselModalEl = document.getElementById("ppt-slides-carousel-modal");
  // Initialize Modal if element exists
  let carouselModal = null;
  if (carouselModalEl) {
    carouselModal = new bootstrap.Modal(carouselModalEl);
  }

  const carouselEl = document.getElementById("pptSlidesCarousel");
  let bsCarousel = null;
  if (carouselEl) {
    bsCarousel = new bootstrap.Carousel(carouselEl, {
      interval: false,
      wrap: true, // allow looping
    });
  }

  const innerContainer = document.getElementById("ppt-carousel-inner");
  const indicatorsContainer = document.getElementById(
    "ppt-carousel-indicators",
  );

  const titleEl = document.getElementById("carousel-ppt-title-footer");

  // Button event listener for View Slides
  $(document).on("click", ".view-ppt-slides-btn", async function () {
    const pptId = $(this).data("pptid");
    const pptTitle = $(this).data("ppttitle");

    if (titleEl) titleEl.textContent = pptTitle;
    if (carouselModal) carouselModal.show();

    // Show loading state
    if (innerContainer) {
      innerContainer.innerHTML = `
                <div class="text-center text-muted w-100 py-5">
                    <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                    Loading Slides...
                </div>
            `;
    }
    if (indicatorsContainer) indicatorsContainer.innerHTML = "";

    try {
      const res = await fetch(`/ppt/slides/api/list/${pptId}`);
      const data = await res.json();

      if (data.success && data.data) {
        const { slides, ppt } = data.data;
        renderSlides(slides, ppt);
      } else {
        if (innerContainer)
          innerContainer.innerHTML = `<div class="text-danger w-100 text-center py-5">No slides found for this PPT.</div>`;
      }
    } catch (err) {
      console.error(err);
      if (innerContainer)
        innerContainer.innerHTML = `<div class="text-danger w-100 text-center py-5">Failed to load slides.</div>`;
    }
  });

  function renderSlides(slides, ppt) {
    if (!innerContainer || !indicatorsContainer) return;

    let allSlides = [];

    // ---------------------------------------------
    // 1️⃣ PAGE IMAGES
    // ---------------------------------------------
    ["page_1_image", "page_2_image", "page_3_image"].forEach((field) => {
      if (ppt && ppt[field]) {
        allSlides.push({
          type: "page",
          image: ppt[field],
          path: "/uploads/images/ppt/pages-images/",
        });
      }
    });

    // ---------------------------------------------
    // 2️⃣ REAL SLIDES (FLATTENED)
    // ---------------------------------------------
    slides.forEach((slide) => {
      const pages = generateSlideContent(slide, ppt); // ✅ array now

      pages.forEach((pageHtml) => {
        allSlides.push({
          type: "slide",
          html: pageHtml,
        });
      });
    });

    // ---------------------------------------------
    // 3️⃣ RENDER
    // ---------------------------------------------
    let innerHTML = "";
    let indicatorsHTML = "";

    allSlides.forEach((item, index) => {
      const activeClass = index === 0 ? "active" : "";

      // Indicators
      indicatorsHTML += `
      <button type="button"
        data-bs-target="#pptSlidesCarousel"
        data-bs-slide-to="${index}"
        class="${activeClass}"
        aria-label="Slide ${index + 1}">
      </button>
    `;

      // -----------------------------------------
      // PAGE / COVER
      // -----------------------------------------
      if (item.type === "page") {
        innerHTML += `
        <div class="carousel-item ${activeClass}" style="background:#111;">
          <div style="
              width:100%;
              height:100%;
              display:flex;
              align-items:center;
              justify-content:center;
          ">
            <img src="${item.path}${item.image}"
              style="width:100%;height:100%;object-fit:contain;">
          </div>
        </div>
      `;
      }

      // -----------------------------------------
      // SLIDES (ALREADY FINAL HTML)
      // -----------------------------------------
      if (item.type === "slide") {
        innerHTML += `
        <div class="carousel-item ${activeClass}" style="background:#fff; height:100%;">
          <div class="d-flex flex-column justify-content-center align-items-center w-100 h-100 p-2 p-md-4">
            ${item.html}
          </div>
        </div>
      `;
      }
    });

    indicatorsContainer.innerHTML = indicatorsHTML;
    innerContainer.innerHTML = innerHTML;

    totalSlidesCount = allSlides.length;

    if (slideCounterEl) {
      slideCounterEl.textContent = `1 of ${totalSlidesCount}`;
    }
  }

  function generateSlideContent(slide, ppt) {
    let beforeImages = [];
    let afterImages = [];

    try {
      let b = slide.before_images;
      let a = slide.after_images;

      if (typeof b === "string") b = JSON.parse(b);
      if (typeof a === "string") a = JSON.parse(a);

      beforeImages = Array.isArray(b) ? b : [];
      afterImages = Array.isArray(a) ? a : [];
    } catch (e) {}

    const slides = []; // ✅ multiple pages

    const header = `
    <div style="width:1280px;">
      <h3 style="font-size:40px;color:#f6339a;margin-top:12rem;"
        class="fw-bold mb-0 text-center noto-sans-devanagari-500">
        ग्राम पंचायत कार्यालय ${gp.gp_name}
      </h3>
    </div>

    <div style="width:1280px;">
      <h3 style="font-size:20px;color:#101828;"
        class="fw-bold mb-0 text-center noto-sans-devanagari-500">
        पंचायत समिती ${gp.gp_taluka}, जिल्हा परिषद ${gp.gp_dist}
      </h3>
    </div>
  `;

    function wrap(content) {
      return `
    <div style="
      width:100%;
      max-width:1280px;
      aspect-ratio:16/9;
      margin:auto;
      display:flex;
      flex-direction:column;
      background-image:url('/img/ppt/mh-panchayat-raj.jpeg');
      background-size:100% auto;
      background-repeat:no-repeat;
    ">
      ${content}
    </div>`;
    }

    // =========================
    // 🟢 PAGE 1 (TEXT PAGE)
    // =========================
    let firstPage = `
    ${header}

    <div style="
      width:1280px;
      text-align:center;
      margin-top:1rem;
      padding:0 20px;
    ">
      <h3 class="text-danger fw-bold" style="font-size:30px;">
        ${slide.slide_title || ""}
      </h3>

      ${
        slide.slide_subtitle
          ? `<h5 class="text-primary fw-bold" style="font-size:20px;">
              ${slide.slide_subtitle}
            </h5>`
          : ""
      }

      ${
        slide.slide_description
          ? `<h5 class="text-success fw-bold" style="margin-top:2rem;font-size:20px;">
              ${slide.slide_description}
            </h5>`
          : ""
      }
    </div>
  `;

    slides.push(wrap(firstPage));

    // =========================
    // 🟡 IMAGE PAGES (PAIR WISE)
    // =========================
    const totalPairs = Math.min(beforeImages.length, afterImages.length);

    for (let i = 0; i < totalPairs; i++) {
      const before = beforeImages[i];
      const after = afterImages[i];

      let imagePage = `
      ${header}

      <div style="
        width:1280px;
        height:500px;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:40px;
        margin-top:2rem;
      ">

            
 <!-- BEFORE -->
<div style="
    width:500px;
    height:380px;
    border:2px solid #ff6b6b;
    border-radius:16px;
    padding:1px;
    box-shadow:0 6px 14px rgba(0,0,0,0.12);
    display:flex;
    align-items:center;
    justify-content:center;
">
    <img
      src="/uploads/images/ppt/slides/before/${before.image_name}"
      style="
        width:100%;
        height:100%;
        object-fit:contain;
        border-radius:12px;
        background:#f8f9fa;
      "
    />
</div>

<!-- AFTER -->
<div style="
    width:500px;
    height:380px;
    border:2px solid #52c41a;
    border-radius:16px;
    padding:1px;
    box-shadow:0 6px 14px rgba(0,0,0,0.12);
    display:flex;
    align-items:center;
    justify-content:center;
">
    <img
      src="/uploads/images/ppt/slides/after/${after.image_name}"
      style="
        width:100%;
        height:100%;
        object-fit:contain;
        border-radius:12px;
        background:#f8f9fa;
      "
    />
</div>


      </div>
    `;

      slides.push(wrap(imagePage));
    }

    return slides; // ✅ IMPORTANT
  }

  // ----------------------------------------------------
  // Carousel Auto-Play Logic
  // ----------------------------------------------------
  let autoPlayInterval = null;

  $(document).on("click", "#play-carousel-btn", function () {
    if (!bsCarousel) return;

    if (autoPlayInterval) clearInterval(autoPlayInterval);
    bsCarousel.next(); // Go to next slide immediately

    autoPlayInterval = setInterval(() => {
      bsCarousel.next();
    }, 3000); // 3 seconds per slide

    $("#play-carousel-btn").removeClass("btn-primary").addClass("btn-success");
    $("#pause-carousel-btn")
      .removeClass("btn-warning")
      .addClass("btn-outline-warning");
  });

  $(document).on("click", "#pause-carousel-btn", function () {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }

    $("#play-carousel-btn").removeClass("btn-success").addClass("btn-primary");
    $("#pause-carousel-btn")
      .removeClass("btn-outline-warning")
      .addClass("btn-warning");
  });

  // ----------------------------------------------------
  // Carousel Slide Counter Logic
  // ----------------------------------------------------
  const slideCounterEl = document.getElementById("ppt-slide-counter");
  let totalSlidesCount = 0;

  if (carouselEl) {
    carouselEl.addEventListener("slid.bs.carousel", function (event) {
      if (slideCounterEl && totalSlidesCount > 0) {
        slideCounterEl.textContent = `${event.to + 1} of ${totalSlidesCount}`;
      }
    });
  }

  // Update renderSlides to initialize counter
  //   const originalRenderSlides = renderSlides;
  //   renderSlides = function (slides) {
  //     originalRenderSlides(slides);
  //     totalSlidesCount = slides && slides.length ? slides.length : 0;
  //     if (slideCounterEl) {
  //       if (totalSlidesCount > 0) {
  //         slideCounterEl.textContent = `1 of ${totalSlidesCount}`;
  //       } else {
  //         slideCounterEl.textContent = "";
  //       }
  //     }
  //   };

  const originalRenderSlides = renderSlides;
  renderSlides = function (slides, ppt) {
    originalRenderSlides(slides, ppt);

    const introSlidesCount =
      //   (ppt?.cover_image ? 1 : 0) +
      (ppt?.page_1_image ? 1 : 0) +
      (ppt?.page_2_image ? 1 : 0) +
      (ppt?.page_3_image ? 1 : 0);

    totalSlidesCount = introSlidesCount + (slides ? slides.length : 0);

    if (slideCounterEl) {
      if (totalSlidesCount > 0) {
        slideCounterEl.textContent = `1 of ${totalSlidesCount}`;
      } else {
        slideCounterEl.textContent = "";
      }
    }
  };

  // Clear interval when modal is closed
  if (carouselModalEl) {
    carouselModalEl.addEventListener("hidden.bs.modal", function () {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
      $("#play-carousel-btn")
        .removeClass("btn-success")
        .addClass("btn-primary");
      $("#pause-carousel-btn")
        .removeClass("btn-outline-warning")
        .addClass("btn-warning");

      if (slideCounterEl) slideCounterEl.textContent = "";
      totalSlidesCount = 0;
    });
  }
  // ----------------------------------------------------
  // Handle Delete PPT
  // ----------------------------------------------------
  $(document).on("click", ".delete-ppt-btn", function () {
    const $btn = $(this);
    const pptId = +$btn.attr("data-pptid");
    if (!pptId) return;

    alertjs.deleteSpl(
      "हे PPT आणि त्यातील सर्व स्लाईड्स कायमचे डिलीट होतील. डिलीट करायचे?",
      async (status) => {
        if (status) {
          const originalText = $btn.html();
          $btn
            .prop("disabled", true)
            .html('<i class="fa fa-spinner fa-spin"></i>');

          try {
            const { success, message } = await fetch(`/ppt`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: pptId }),
            }).then((res) => res.json());

            if (success) {
              alertjs.success({ t: "Success", m: message }, () => {
                window.location.reload();
              });
            } else {
              alertjs.error({ t: "Error", m: message });
              $btn.prop("disabled", false).html(originalText);
            }
          } catch (error) {
            console.error(error);
            alertjs.error({
              t: "Error",
              m: "An error occurred while deleting.",
            });
            $btn.prop("disabled", false).html(originalText);
          }
        }
      },
    );
  });
});
