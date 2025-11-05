document.addEventListener('DOMContentLoaded', function () {
  const modalCloseReverse = document.getElementById("modal-close-reverse");
  const accordionTitleReverse = document.querySelectorAll(".accordion-title-reverse");

  function openModalReverse() {
    const modalOverlayReverse = document.getElementById("modalOverlay-reverse");
    const containerSlideReverse = document.querySelector('#carousel-main-reverse');

    if (!containerSlideReverse) {
      console.warn("No se encontró #carousel-main-reverse");
      return;
    }

    modalOverlayReverse.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModalReverse() {
    const modalOverlayReverse = document.getElementById("modalOverlay-reverse");
    modalOverlayReverse.classList.remove("active");
document.body.style.overflow = "auto";
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    
  }

  function setupCarouselClickListener() {
    const containerSlider = document.querySelectorAll('#carousel-main-reverse .swiper-slide');
    const carouselMobile = document.querySelectorAll('.carousel-mobile-reverse .swiper .swiper-slide');
    
    if (containerSlider) {
      containerSlider.forEach(slide => {
        slide.addEventListener("click", () => openModalReverse());
      });
    }

    if (carouselMobile) {
      carouselMobile.forEach(mobile => {
        mobile.addEventListener("click", () => openModalReverse());
      });
    }
  }

  function detectAccordionClicks() {
    accordionTitleReverse.forEach(title => {
      title.addEventListener("click", () => {
        setTimeout(() => {
          setupCarouselClickListener();
        }, 100);
      });
    });
  }

  setupCarouselClickListener();
  detectAccordionClicks();

  modalCloseReverse.addEventListener("click", () => closeModalReverse());
});

