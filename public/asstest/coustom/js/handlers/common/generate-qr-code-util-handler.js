// NOTE: USE THIS IN CONJUCTION WITH
// script(src='/asstest/plugins/qrcodejs/qrcode.min.js')
document.addEventListener("DOMContentLoaded", function () {
  function resolveSizeToPx(sizeValue) {
    if (!sizeValue) return null;

    // Pure number → px
    if (/^\d+(\.\d+)?$/.test(sizeValue)) {
      return Number(sizeValue);
    }

    // rem → px
    if (sizeValue.endsWith("rem")) {
      const remValue = parseFloat(sizeValue);
      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      return remValue * rootFontSize;
    }

    return null;
  }

  function generateQRCode(name, qrUrl, sizePx) {
    if (!name || !qrUrl || !sizePx) return;

    // Prepare final URL
    const finalQrUrl = qrUrl.startsWith("http")
      ? qrUrl
      : `${window.location.origin}${qrUrl}`;

    // Check for ID
    const idEl = document.getElementById(name);
    if (idEl) {
      idEl.innerHTML = "";
      new QRCode(idEl, {
        text: finalQrUrl,
        width: sizePx,
        height: sizePx,
      });
    }

    // Check for class
    const classEls = document.getElementsByClassName(name);
    if (classEls && classEls.length > 0) {
      Array.from(classEls).forEach((el) => {
        el.innerHTML = "";
        new QRCode(el, {
          text: finalQrUrl,
          width: sizePx,
          height: sizePx,
        });
      });
    }
  }

  const mentionedQrTargetTarget = document.getElementById(
    "mentioned-qr-target-tag",
  );

  if (mentionedQrTargetTarget) {
    const targetElementName =
      mentionedQrTargetTarget.getAttribute("data-target");

    const targetUrl = mentionedQrTargetTarget.getAttribute("data-targeturl");

    const sizeAttr = mentionedQrTargetTarget.getAttribute("data-size");

    const sizePx = resolveSizeToPx(sizeAttr);

    if (targetElementName && targetUrl && sizePx) {
      generateQRCode(targetElementName, targetUrl, sizePx);
    }
  }
});
