// This is the code in vanilla js converted from below commented code
document.addEventListener("DOMContentLoaded", () => {
  const el = {
    pBtn: document.querySelector(".previous-button"),
    nBtn: document.querySelector(".next-button"),
  };

  const searchParams = new URLSearchParams(window.location.search);

  const page = Number(searchParams.get("p")) || 0;
  const totalPrint = Number(searchParams.get("tp")) || 10;
  const year1 = searchParams.get("year1");
  const year2 = searchParams.get("year2");
  const showWatermark = searchParams.get("showWatermark");
  const date = searchParams.get("date");
  const printFormat = searchParams.get("printFormat");
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.split("?")[0];

  // Assume totalRecords is already defined or coming from a global scope
  const totalPages = Math.ceil(Number(totalRecords) / totalPrint);

  // let pageNoHtml = "";

  // for (let i = 0; i < totalPages; i++) {
  // 	pageNoHtml += `
  //     <li class="page-item">
  //       <button class="page-link page-number ${i === page ? "bg-primary text-light" : ""}" data-pageNo="${i}">
  //         ${i + 1}
  //       </button>
  //     </li>`;
  // }

  let pageNoHtml = Array.from({ length: totalPages }, (_, index) => {
    let isActive = index == page;
    return `
		 <li class="page-item">
          <button class="page-link page-number" style="${isActive ? "background:oklch(65.6% 0.241 354.308) !important; font-weight:bold; color: white;" : ""}" data-pageNo="${index}">
            ${index + 1}
          </button>
        </li>
		`;
  }).join("");

  const pageNumbersContainer = document.querySelector(".page-numbers");
  if (pageNumbersContainer) {
    pageNumbersContainer.innerHTML = pageNoHtml;
  }

  // document.addEventListener("click", function (e) {
  // 	const target = e.target;
  // 	if (target.classList.contains("page-number")) {
  // 		const selectedPage = target.getAttribute("data-pageNo");
  // 		window.open(
  // 			`${baseUrl}?year1=${year1}&year2=${year2}${date ? `&date=${date}` : ""}${showWatermark ? `&showWatermark=${showWatermark}` : ""
  // 			}&p=${selectedPage}&tp=${totalPrint}${printFormat ? `&printFormat=${printFormat}` : ''}`,
  // 			"_self"
  // 		);
  // 	}
  // });

//   replacing above logic with this
  document.addEventListener("click", function (e) {
    const target = e.target;

    if (target.classList.contains("page-number")) {
      const selectedPage = target.getAttribute("data-pageNo");

      const queryParams = new URLSearchParams();

      if (typeof year1 !== "undefined" && year1 !== null) {
        queryParams.append("year1", year1);
      }
      if (typeof year2 !== "undefined" && year2 !== null) {
        queryParams.append("year2", year2);
      }
      if (typeof date !== "undefined" && date !== null) {
        queryParams.append("date", date);
      }
      if (typeof showWatermark !== "undefined" && showWatermark !== null) {
        queryParams.append("showWatermark", showWatermark);
      }
      if (typeof selectedPage !== "undefined" && selectedPage !== null) {
        queryParams.append("p", selectedPage);
      }
      if (typeof totalPrint !== "undefined" && totalPrint !== null) {
        queryParams.append("tp", totalPrint);
      }
      if (typeof printFormat !== "undefined" && printFormat !== null) {
        queryParams.append("printFormat", printFormat);
      }

      window.open(`${baseUrl}?${queryParams.toString()}`, "_self");
    }
  });

  if (page === 0 && el.pBtn) {
    el.pBtn.setAttribute("disabled", true);
  }

  if (page >= totalPages - 1 && el.nBtn) {
    el.nBtn.setAttribute("disabled", true);
  }

  if (el.pBtn) {
    el.pBtn.addEventListener("click", () => {
      window.open(
        `${baseUrl}?year1=${year1}&year2=${year2}${date ? `&date=${date}` : ""}${
          showWatermark ? `&showWatermark=${showWatermark}` : ""
        }&p=${page - 1}&tp=${totalPrint}${printFormat ? `&printFormat=${printFormat}` : ""}`,
        "_self"
      );
    });
  }

  if (el.nBtn) {
    el.nBtn.addEventListener("click", getNextPage);
  }

  function getNextPage() {
    window.open(
      `${baseUrl}?year1=${year1}&year2=${year2}${date ? `&date=${date}` : ""}${
        showWatermark ? `&showWatermark=${showWatermark}` : ""
      }&p=${page + 1}&tp=${totalPrint}${printFormat ? `&printFormat=${printFormat}` : ""}`,
      "_self"
    );
  }
});

/*
$(document).ready(() => {
  const el = {
	pBtn: $(".previous-button"),
	nBtn: $(".next-button"),
  };

  let searchParams = new URLSearchParams(window.location.search);

  let page = searchParams.get("p");
  let totalPrint = searchParams.get("tp");
  let year1 = searchParams.get("year1");
  let year2 = searchParams.get("year2");
  let showWatermark = searchParams.get("showWatermark");
  let date = searchParams.get("date");

  let currentUrl = `${window.location.href}`;




  // alert(currentUrl)
  // console.log(currentUrl);
  let url;
  // if (currentUrl.split("?").length > 1) {
  url = currentUrl.split("?")[0];
  // console.log('urlllllllllll --', url)
  // } else {
  //   url = currentUrl.split("/").at(-1).split("?")[0];
  // }

  // console.log(url)

  // console.log(url, 'url--')
  let totalPages = Math.ceil(Number(totalRecords) / totalPrint);

  let pageNoHtml = "";
  for (let i = 0; i < totalPages; i++) {
	pageNoHtml += `<li class="page-item">
					<button class="page-link page-number ${i == page ? "bg-primary text-light" : ""
	  }" data-pageNo='${i}'>
					  ${i + 1}
					</button>
				  </li>`;
  }
  $(".page-numbers").html(pageNoHtml);


  const baseUrl = currentUrl.split("?")[0]

  $(document).on("click", ".page-number", function () {
	window.open(
	  `${baseUrl}?year1=${year1}&year2=${year2}${date ? `&date=${date}` : ""}${showWatermark ? `&showWatermark=${showWatermark || 1}` : ""}&p=${$(
		this
	  ).attr("data-pageNo")}&tp=${totalPrint}`,
	  "_self"
	);
  });

  if (page == 0) {
	$(el.pBtn).attr("disabled", true);
  }

  if (Number(page) >= totalPages - 1) {
	$(el.nBtn).attr("disabled", true);
  }

  el.pBtn.click(function (e) {
	window.open(
	  `${baseUrl}?year1=${year1}&year2=${year2}${date ? `&date=${date}` : ""}${showWatermark ? `&showWatermark=${showWatermark || 1}` : ""}&p=${Number(page) - 1
	  }&tp=${totalPrint}`,
	  "_self"
	);
  });

  el.nBtn.click(function () {
	getNextPage();
  });

  function getNextPage() {
	window.open(
	  `${baseUrl}?year1=${year1}&year2=${year2}${date ? `&date=${date}` : ""}${showWatermark ? `&showWatermark=${showWatermark || 1}` : ""}&p=${Number(page) + 1
	  }&tp=${totalPrint}`,
	  "_self"
	);
  }
});

*/
