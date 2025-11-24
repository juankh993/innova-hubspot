document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.hero-new-home-section').closest('.row-fluid-wrapper').classList.add('container-sticky-banner');
  const slideData = JSON.parse(document.getElementById('carousel-data').textContent);
  let currentSlideIndex = 0;
  let mainSwiper = null;
  let isUpdatingContent = false;

  // Función para actualizar contenido dinámico
  function updateDynamicContent(slideIndex) {
    if (isUpdatingContent || !slideData[slideIndex]) {
      return;
    }
    isUpdatingContent = true;

    const currentSlide = slideData[slideIndex];

    // Elementos del DOM
    const mainTitle = document.getElementById('dynamic-main-title');
    const subtitle = document.getElementById('dynamic-subtitle');
    const description = document.getElementById('dynamic-description');
    const buttonsContainer = document.getElementById('dynamic-buttons');

    // Aplicar transición de salida
    const elements = [mainTitle, subtitle, description];
    elements.forEach(el => {
      if (el) {
        el.classList.add('content-transition', 'content-fade-out');
      }
    });

    // Actualizar contenido después del fade out
    setTimeout(() => {
      // Actualizar título principal
      if (mainTitle && currentSlide.main_title) {
        mainTitle.textContent = currentSlide.main_title;
      }

      // Actualizar subtítulo  
      if (subtitle && currentSlide.subtitle) {
        subtitle.textContent = currentSlide.subtitle;
      }

      // Actualizar descripción
      if (description && currentSlide.description) {
        description.innerHTML = currentSlide.description;
      }

      // Actualizar botones según las condicionales
      if (buttonsContainer && currentSlide.boton_inscribete) {
        let buttonHTML = '';


        if (currentSlide.botones && currentSlide.botones.buton_type === 'buton-primary') {
          // Botón Naranja
          buttonHTML = `
            <div class="mb-4" id="primary-button-container">
              <a href="#banner-hero" id="primary-button"
                class="relative group inline-flex justify-center items-center gap-2 uppercase px-[18px] pt-[12px] pb-[12px] bg-[#F85245] rounded-full tracking-normal transition-colors duration-300 navbar-estilos overflow-hidden CTA_Inscribete"
                role="tab">
                <span class="absolute inset-0 bg-[#FDB731] group-active:bg-[#FF6D62] transition-[clip-path] duration-1000 ease-out [clip-path:circle(0px_at_10%_0px)] group-hover:[clip-path:circle(150%_at_50%_0px)]"></span>
                <span class="text-[#ffffff] relative z-10 font-['Otterco'] uppercase texture-image font-bold italic text-[20px] leading-[20px]">
                  ${currentSlide.botones.buton_text || '¡Inscríbete!'}
                </span>
                <svg class="relative z-10" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0186 13.8545L8.31152 12.3408L8.31738 12.3271L8.30469 12.3428L6.32422 14.7568H6.32324C6.22632 14.8807 6.095 14.9433 5.92773 14.9434C5.85748 14.9434 5.79808 14.9325 5.75 14.9111H5.74902C5.64668 14.8734 5.56489 14.8096 5.50293 14.7207C5.44095 14.6318 5.41022 14.5335 5.41016 14.4258V11.5693L12.4805 2.9043L12.4707 2.89648L12.4717 2.89551L3.72461 10.4639L0.495117 9.14062H0.494141C0.394229 9.10278 0.317388 9.04652 0.263672 8.97266C0.209939 8.89874 0.179015 8.80624 0.170898 8.69531L0.171875 8.61719C0.176922 8.5414 0.195248 8.4736 0.227539 8.41406C0.270558 8.33479 0.337801 8.26912 0.429688 8.21777L14.0508 0.360352C14.1317 0.311872 14.218 0.287109 14.3096 0.287109C14.4173 0.287179 14.5144 0.316762 14.6006 0.375977C14.6897 0.440796 14.7517 0.516633 14.7881 0.602539C14.8244 0.688648 14.8346 0.786323 14.8184 0.894531L12.7236 13.4668C12.6967 13.623 12.6106 13.7446 12.4648 13.8311C12.3895 13.8741 12.3056 13.8955 12.2139 13.8955C12.1548 13.8955 12.089 13.8816 12.0186 13.8545Z" fill="white" stroke="white" stroke-width="0.012278"/>
                </svg>
              </a>
            </div>
          `;
        } else if (currentSlide.botones && currentSlide.botones.buton_type === 'buton-secondary') {
          // Botón Azul
          buttonHTML = `
          <a href="${currentSlide.botones.buton_url?.href || '#'}"

 class="relative group inline-flex justify-center items-center gap-2 uppercase px-[18px] pt-[12px] pb-[12px]  border-[2px] border-[#003B87] rounded-full tracking-normal transition-colors duration-300 overflow-hidden font-bold" role="tab" id="CTA_Inscribete">
                                <span class="absolute inset-0 bg-[#003B87] group-active:bg-[#FF6D62] transition-[clip-path] duration-500 ease-in-out [clip-path:circle(0px_at_10%_0px)] group-hover:[clip-path:circle(150%_at_50%_0px)]"></span>
                                <span class="!text-[#003B87] group-hover:!text-white relative z-10 font-['Otterco'] uppercase texture-image">
                                       ${currentSlide.botones.buton_text_secondary || '¡Inscríbete!'}
                                </span>
                                


                            </a>
          `;
        }

        buttonsContainer.innerHTML = buttonHTML;
      } else {
        // Si no se debe mostrar botón, limpiar contenedor
        if (buttonsContainer) {
          buttonsContainer.innerHTML = '';
        }
      }

      // Aplicar transición de entrada
      setTimeout(() => {
        elements.forEach(el => {
          if (el) {
            el.classList.remove('content-fade-out');
          }
        });
        isUpdatingContent = false;
      }, 50);
    }, 150);
  }

  // Inicializar Swiper principal
  function initMainSwiper() {
    const mainCarousel = document.getElementById("carousel-main");
    if (mainCarousel && slideData.length > 0) {
      mainSwiper = new Swiper("#carousel-main", {
        loop: true,
        effect: 'fade', 
        fadeEffect: {
          crossFade: true 
        },
        speed: 800,
        pagination: {
          el: ".swiper-pagination-custom",
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        },
        navigation: {
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        },
        on: {
          slideChangeTransitionEnd: function () {
            // Usar solo slideChangeTransitionEnd para mayor estabilidad
            const realIndex = this.realIndex;
            // Validar que el índice esté dentro del rango de datos y sea diferente al actual
            if (realIndex >= 0 && realIndex < slideData.length && realIndex !== currentSlideIndex) {
              currentSlideIndex = realIndex;
              updateDynamicContent(currentSlideIndex);
            }
          }
        }
      });
    }
  }

  // Inicialización
  if (slideData && slideData.length > 0) {
    initMainSwiper();

    // Establecer contenido inicial manualmente después de un breve delay
    setTimeout(() => {
      if (currentSlideIndex === 0 && !isUpdatingContent) {
        updateDynamicContent(0);
      }
    }, 200);
  }

  const setCustomCursor = () => {
    const container = document.querySelector('.video-overlay');
    const cursor = document.getElementById('video-cursor-banner');
    if (!cursor || !container) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const xTo = gsap.quickSetter(cursor, 'x', 'px');
      const yTo = gsap.quickSetter(cursor, 'y', 'px');

      gsap.set(cursor, {
        opacity: 1,
        scale: 1
      });

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        xTo(x);
        yTo(y);
      });

      container.addEventListener('mouseenter', () => {
        gsap.to(cursor, { opacity: 1, scale: 1, ease: 'bounce.out', duration: 0.3 });
      });

      container.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 1, scale: 1, ease: 'bounce.out', duration: 0.3 });
      });
    });
  };

  setCustomCursor();

  // Agregar al final del DOMContentLoaded, después de setCustomCursor()

  // Funcionalidad del modal de video
  const videoModal = document.getElementById('universal-video-modal');
  const videoIframe = document.getElementById('universal-video-iframe');
  const closeButton = document.getElementById('close-universal-video');
  const videoOverlays = document.querySelectorAll('[data-blendy-from="universal-video"]');

  // Función para abrir modal
  function openVideoModal(videoId) {
    if (videoModal && videoIframe && videoId) {
      const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      videoIframe.src = videoUrl;
      videoModal.classList.remove('hidden');
      videoModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }

  // Función para cerrar modal
  function closeVideoModal() {
    if (videoModal && videoIframe) {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
      videoIframe.src = '';
      document.body.style.overflow = '';
    }
  }

  // Event listeners para overlays
  videoOverlays.forEach(overlay => {
    overlay.addEventListener('click', function () {
      const videoId = this.getAttribute('data-video-id');
      openVideoModal(videoId);

    });

    // Soporte para accesibilidad
    overlay.addEventListener('keypress', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const videoId = this.getAttribute('data-video-id');
        openVideoModal(videoId);
      }
    });
  });

  // Event listener para cerrar modal
  if (closeButton) {
    closeButton.addEventListener('click', closeVideoModal);
  }

  // Cerrar con tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && videoModal.classList.contains('flex')) {
      closeVideoModal();
    }
  });

  // Cerrar al hacer clic fuera del contenido
  if (videoModal) {
    videoModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeVideoModal();
      }
    });
  }

});
