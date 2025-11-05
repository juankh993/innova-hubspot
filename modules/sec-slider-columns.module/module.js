document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 40,
      centeredSlides: true,      // centrado en móvil
      navigation: {
            nextEl: '#transform-swiper-next',
            prevEl: '#transform-swiper-prev',
          },
          pagination: {
            el: '#transform-swiper-pagination',
            clickable: true,
          },
      breakpoints: {
        768: {
          slidesPerView: 2,
          centeredSlides: false,  // desactivar centrado en tablet+
        },
        1024: {
          slidesPerView: 3,
          centeredSlides: false,  // desactivar centrado en desktop
        },
      },
    });
  });
