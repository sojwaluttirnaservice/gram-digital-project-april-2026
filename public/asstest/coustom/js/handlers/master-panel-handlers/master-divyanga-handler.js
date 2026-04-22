$(function () {
  console.log("in master divyanga handler");

  $(document).on("click", ".showDivyangaUserDetailsBtn", function (e) {
    e.preventDefault();
    // alert( )

    let id = $(this).attr("data-id");

    $(`#divyangaApplicantModal-${id}`).modal("show");
  });

});
