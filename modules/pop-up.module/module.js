(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector("#overlay");
    const popup = document.querySelector("#popup");
    const closeBtn = document.querySelector("#closeButton");
    const ctaRegister = document.querySelector("#cta-register");

    if (!overlay || !popup || !closeBtn) return;

    let isOpen = false;

    function openPopup() {
      if (isOpen) return;
      overlay.classList.remove("popup-hidden");
      void overlay.offsetHeight;
      popup.style.position = "fixed";
      popup.classList.remove("popup-hidden");
      document.body.classList.add("popup-visible");
      document.body.style.overflow = "hidden";
      isOpen = true;
    }

    function closePopup() {
      if (!isOpen) return;
      popup.classList.add("popup-hidden");
      overlay.classList.add("popup-hidden");
      document.body.classList.remove("popup-visible");
      document.body.style.overflow = "";
      isOpen = false;
    }

    function init() {
      overlay.classList.add("popup-hidden");
      popup.classList.add("popup-hidden");
      setTimeout(openPopup, 100);
    }

    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      closePopup();
    });

    if (ctaRegister) {
      ctaRegister.addEventListener("click", function (e) {
        e.preventDefault();
        closePopup();
        const sectionForm = document.querySelector("#section-form-enrollment");
        if (sectionForm) sectionForm.scrollIntoView({ behavior: "smooth" });
      });
    }

    overlay.addEventListener("click", closePopup);

    popup.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    init();
  });
})();
