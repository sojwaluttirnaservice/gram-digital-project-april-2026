$(() => {
  // Attaching an event on the the button show-more-info-btn of the members list
  // on clikc show the member basic info plus the description part

  $(document).on("click", ".show-more-info-btn", function (e) {
    let member = null;
    let memberData = $(this).attr("data-member");

    if (memberData && memberData.trim().startsWith("{")) {
      member = JSON.parse(memberData);
    }

    showMemberInfoInModal(member);
  });

  //   function for showing the information of the gp member in the modal

  function showMemberInfoInModal(member) {
    daisyUIModal.show("gp-member-info-modal");

    // show photo
    $("#gp-member-image").prop("src", `/gp/asstes/images/team/${member.image}`);
    // show name
    $("#gp-member-name").html(member.name);
    // show post
    $("#gp-member-post").html(member.p_name);
    // show the description or sadasyaInfo
    $("#gp-member-info").html(member.sadasyaInfo);
  }

  //   for gallery image skeleton on the home page

 (function () {
    const skeleton = document.getElementById("gp-carousel-skeleton");
    const content = document.getElementById("gp-carousel-content");
    const $carousel = $(".gp-images-carousel");

    if (!skeleton || !content || !$carousel.length) return;

    const reveal = () => {
        skeleton.remove();
        content.classList.remove("opacity-0", "pointer-events-none");
        content.classList.add("opacity-100");

        // 🔑 force Owl to recalc widths
        $carousel.trigger("refresh.owl.carousel");
    };

    // CASE 1: Owl already initialized
    if ($carousel.hasClass("owl-loaded")) {
        window.addEventListener("load", reveal, { once: true });
        return;
    }

    // CASE 2: Owl initializes later
    $carousel.on("initialized.owl.carousel", () => {
        window.addEventListener("load", reveal, { once: true });
    });
})();
});
