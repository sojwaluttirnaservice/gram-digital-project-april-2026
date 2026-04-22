document.addEventListener("DOMContentLoaded", function () {
  /* NAVIGATION */

  // LARGE SCREEN NAVIGATION
  // Select all buttons with data-toggle-dropdown attribute
  // const dropdownButtons = document.querySelectorAll("[data-toggle-dropdown]");
  const dropdownMenus = document.querySelectorAll("[aria-labelledby]");

  //   dropdownMenus.forEach((menu) => menu.classList.add("hidden"));
  // Initialize each button
  const dropdownButtons = document.querySelectorAll("[data-toggle-dropdown]");

  dropdownButtons.forEach((button) => {
    const dropdownButtonId = button.getAttribute("id");
    const dropdownMenu = document.querySelector(
      `[aria-labelledby="${dropdownButtonId}"]`,
    );

    if (!dropdownButtonId || !dropdownMenu) return;

    let zIndexBase = 10;
    let hoverTimeout = null;

    function setZIndexRecursively(menu, level) {
      menu.style.zIndex = zIndexBase + level * 10;

      const nestedButtons = menu.querySelectorAll("[data-toggle-dropdown]");
      nestedButtons.forEach((nestedButton) => {
        const nestedMenuId = nestedButton.getAttribute("id");
        const nestedMenu = document.querySelector(
          `[aria-labelledby="${nestedMenuId}"]`,
        );
        if (nestedMenu) setZIndexRecursively(nestedMenu, level + 1);
      });
    }

    setZIndexRecursively(dropdownMenu, 0);

    function openDropdown() {
      dropdownMenu.setAttribute("aria-expanded", "true");
      dropdownMenu.classList.remove("hidden");
    }

    function closeDropdown() {
      dropdownMenu.setAttribute("aria-expanded", "false");
      dropdownMenu.classList.add("hidden");
    }

    /* CLICK TOGGLE (unchanged behavior) */
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = dropdownMenu.getAttribute("aria-expanded") === "true";
      isOpen ? closeDropdown() : openDropdown();
    });

    /* HOVER OPEN */
    button.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      openDropdown();
    });

    dropdownMenu.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      openDropdown();
    });

    /* HOVER CLOSE (delayed, safe for nesting) */
    button.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(closeDropdown, 180);
    });

    dropdownMenu.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(closeDropdown, 180);
    });

    /* OUTSIDE CLICK CLOSE */
    document.addEventListener("click", (e) => {
      if (
        dropdownMenu.getAttribute("aria-expanded") === "true" &&
        !button.contains(e.target) &&
        !dropdownMenu.contains(e.target)
      ) {
        closeDropdown();
      }
    });
  });

  document.addEventListener("mouseover", function (e) {
    const item = e.target.closest(
      '[role="menuitem"], button[data-toggle-dropdown]',
    );

    if (!item || item.hasAttribute("disabled")) return;

    // ✅ only apply inside dropdown menu
    if (!item.closest('[role="menu"]')) return;

    item.classList.add(
      "bg-gradient-to-r",
      "from-[#203a5e]",
      "via-[#3a6b5c]",
      "to-[#203a5e]",
      "text-white",
    );
  });

  document.addEventListener("mouseout", function (e) {
    const item = e.target.closest(
      '[role="menuitem"], button[data-toggle-dropdown]',
    );

    if (!item || item.hasAttribute("disabled")) return;

    // ✅ only apply inside dropdown menu
    if (!item.closest('[role="menu"]')) return;

    item.classList.remove(
      "bg-gradient-to-r",
      "from-[#203a5e]",
      "via-[#3a6b5c]",
      "to-[#203a5e]",
      "text-white",
    );
  });

  /** */

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.querySelector(
    `[aria-labelledby="${"mobile-menu-btn"}"]`,
  );

  // console.log(mobileMenuBtn);
  mobileMenuBtn.addEventListener("click", function (e) {
    // console.log("Don't give e aleaet");
    e.preventDefault();

    const isMenuHidden = mobileMenu.getAttribute("aria-expanded") === "false";

    const mobileMenuHamIcon = document.getElementById("mobile-menu-ham-icon");
    const mobileMenuCloseIcon = document.getElementById(
      "mobile-menu-close-icon",
    );

    if (isMenuHidden) {
      mobileMenuCloseIcon.classList.remove("hidden");
      mobileMenuHamIcon.classList.add("hidden");
      mobileMenu.setAttribute("aria-expanded", "true");

      mobileMenu.classList.remove("max-h-0");
      mobileMenu.classList.remove("opacity-0");
      mobileMenu.classList.add("max-h-screen");
      mobileMenu.classList.add("opacity-100");
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenuCloseIcon.classList.add("hidden");
      mobileMenuHamIcon.classList.remove("hidden");
      mobileMenu.setAttribute("aria-expanded", "false");

      mobileMenu.classList.remove("max-h-screen");
      mobileMenu.classList.remove("opacity-100");
      mobileMenu.classList.add("max-h-0");
      mobileMenu.classList.add("opacity-0");

      mobileMenu.classList.add("hidden");
    }
  });

  // this handle the event in teh modal pop up which opens up when we click on the login page
  // if gp udner the certain gp are more, then this modal opens, and inside that modal, tehre are links

  // on click of whihc we redirect tot corrssponding gp under main gp

  //

  Array.from(
    document.getElementsByClassName("redirectToLoginPageModalBtn"),
  ).forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const redirectUrl = this.getAttribute("data-url");

      let redirectBackToAfterLogout = window.location.origin;

      localStorage.setItem(
        "redirectBackToAfterLogout",
        redirectBackToAfterLogout,
      );

      window.location.href =
        redirectUrl +
        "?redirectBack=" +
        encodeURIComponent(redirectBackToAfterLogout);
    });
  });

  const urlParams = new URLSearchParams(window.location.search);

  // console.log('navigation bar getting place')

  const redirectBack = urlParams.get("redirectBack");
  if (redirectBack)
    localStorage.setItem("redirectBackToAfterLogout", redirectBack || "");
 
  (function () {
    // ==========================
    // Generate QR Codes on Page Load
    // ==========================
    const qrBoxes = document.querySelectorAll(".qr-box");

    qrBoxes.forEach((box) => {
      const endpointAttr = box.dataset.endpoint;
      if (!endpointAttr) return;

      const endpoint = endpointAttr.startsWith("http")
        ? endpointAttr
        : new URL(endpointAttr, window.origin).href;

      const sizeAttr = box.dataset.size;
      let size;
      if (sizeAttr) {
        size = parseInt(sizeAttr);
      } else {
        // 👇 fallback: take full width of parent/container
        size = box.offsetWidth || box.parentElement.offsetWidth || 150;
      }

      if (endpoint) {
        box.innerHTML = ""; // clear any existing content
        new QRCode(box, {
          text: endpoint,
          width: size,
          height: size,
        });
      }
    });

    // ==========================
    // Download QR Code Button
    // ==========================
    const downloadButtons = document.querySelectorAll(".download-qr-btn");

    downloadButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetId = btn.dataset.target;
        const qrBox = document.getElementById(targetId);

        if (!qrBox) return;

        const qrImg =
          qrBox.querySelector("img") || qrBox.querySelector("canvas");
        if (!qrImg) return;

        // If QR code is an <img>, draw to temporary canvas for download
        if (qrImg.tagName.toLowerCase() === "img") {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = qrImg.naturalWidth;
          canvas.height = qrImg.naturalHeight;

          const tempImg = new Image();
          tempImg.crossOrigin = "Anonymous"; // avoid CORS issues
          tempImg.src = qrImg.src;

          tempImg.onload = function () {
            ctx.drawImage(tempImg, 0, 0);
            triggerDownload(canvas, btn);
          };
        } else if (qrImg.tagName.toLowerCase() === "canvas") {
          triggerDownload(qrImg, btn);
        }
      });
    });

    // ==========================
    // Helper: Trigger download
    // ==========================
    function triggerDownload(canvas, btn) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      const titleText = btn
        .closest(".qr-card")
        .querySelector("a")
        .textContent.trim();
      link.download = `${titleText}.png`;
      link.click();
    }
  })();
});
