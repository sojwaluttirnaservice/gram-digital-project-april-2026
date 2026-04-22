const puppeteer = require("puppeteer");

module.exports = async function generatePdf(url, options = {}) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=none",
    ],
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      right: "10mm",
      bottom: "12mm",
      left: "10mm",
    },
    ...options,
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
};
