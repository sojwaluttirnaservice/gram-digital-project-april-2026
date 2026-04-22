$(document).ready(() => {
  console.log("js loaded");
  // console.log(data);
  let page = Math.ceil(data.length / 5);
  // console.log(page);

  let start = 0;
  let count = 0;
  let pagenusarTotal = [];
  let dataObject = {
    malmattaNoFrom: 0,
    malmattaNoTo: 0,
    lastBuildingTax: 0,
    currentBuildingTax: 0,
    totalBuildingTax: 0,
    lastTaxFine: 0,
    lastDivaTax: 0,
    currentDivaTax: 0,
    totalDivaTax: 0,
    lastArogyaTax: 0,
    currentArogyaTax: 0,
    totalArogyaTax: 0,
    totalTax: 0,
  };

  for (let i = 0; i < page; i++) {
    start = count * 5;
    let array1 = data.slice(start, start + 5);
    // console.log(array1);
    dataObject.malmattaNoFrom = array1[0].feu_malmattaNo;
    dataObject.malmattaNoTo = array1[array1.length - 1].feu_malmattaNo;

    array1.forEach((el, i) => {
      dataObject.lastBuildingTax += el.lastBuildingTax;
      dataObject.currentBuildingTax += el.currentBuildingTax;
      dataObject.totalBuildingTax += el.totalBuildingTax;
      dataObject.lastTaxFine += el.lastTaxFine;
      dataObject.lastDivaTax += el.lastDivaTax;
      dataObject.currentDivaTax += el.currentDivaTax;
      dataObject.totalDivaTax += el.totalDivaTax;
      dataObject.lastArogyaTax += el.lastArogyaTax;
      dataObject.currentArogyaTax += el.currentArogyaTax;
      dataObject.totalArogyaTax += el.totalArogyaTax;
      dataObject.totalTax +=
        el.totalBuildingTax + el.totalDivaTax + el.totalArogyaTax;
    });
    pagenusarTotal.push(dataObject);
    dataObject = {
      malmattaNoFrom: 0,
      malmattaNoTo: 0,
      lastBuildingTax: 0,
      currentBuildingTax: 0,
      totalBuildingTax: 0,
      lastTaxFine: 0,
      lastDivaTax: 0,
      currentDivaTax: 0,
      totalDivaTax: 0,
      lastArogyaTax: 0,
      currentArogyaTax: 0,
      totalArogyaTax: 0,
      totalTax: 0,
    };
    count++;
  }
  console.log(pagenusarTotal);
});
