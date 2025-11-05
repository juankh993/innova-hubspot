document.addEventListener('DOMContentLoaded', function () {
  const modalClose = document.getElementById("modal-close");
  const accordionTitle = document.querySelectorAll(".accordion-title");

  function openModal() {
    const modalOverlay = document.getElementById("modalOverlay");
    const containerSlide = document.querySelector('#carousel-main');

    if (!containerSlide) {
      console.warn("No se encontró #carousel-main");
      return;
    }

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modalOverlay = document.getElementById("modalOverlay");
    modalOverlay.classList.remove("active");
document.body.style.overflow = "auto";
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    
  }

  function setupCarouselClickListener() {
    const containerSlider = document.querySelectorAll('#carousel-main .swiper-slide');
    const carouselMobile = document.querySelectorAll('.carousel-mobile .swiper .swiper-slide');
    
    if (containerSlider) {
      containerSlider.forEach(slide => {
        slide.addEventListener("click", () => openModal());
      });
    }

    if (carouselMobile) {
      carouselMobile.forEach(mobile => {
        mobile.addEventListener("click", () => openModal());
      });
    }
  }

  function detectAccordionClicks() {
    accordionTitle.forEach(title => {
      title.addEventListener("click", () => {
        setTimeout(() => {
          setupCarouselClickListener();
        }, 100);
      });
    });
  }

  setupCarouselClickListener();
  detectAccordionClicks();

  modalClose.addEventListener("click", () => closeModal());
});

