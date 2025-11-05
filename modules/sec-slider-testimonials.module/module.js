  document.addEventListener('DOMContentLoaded', function () {
    const setFadeUpAnimations = () => {
      const authorSection = document.querySelector('#author-section');
      if (!authorSection) return;

      gsap.killTweensOf(authorSection); // Detener animaciones previas
      gsap.fromTo(authorSection,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    // Sistema de testimonios sincronizado
    const initTestimonialsSystem = () => {
      const slider = document.getElementById('testimonials-swiper');
      const backgroundImg = document.querySelector('#dynamic-image');
      const authorImg = document.querySelector('#author-image');
      const authorName = document.querySelector('#author-name');
      const authorGrade = document.querySelector('#author-grade');
      const backgroundContainer = document.getElementById('testimonials-background');

      if (!slider || !backgroundImg) return;

      // Función para actualizar contenido basado en slide activo
      const updateContent = (activeSlide) => {
        const videoId = activeSlide.dataset.videoId;
        const backgroundImage = activeSlide.dataset.backgroundImage;
        const author = activeSlide.dataset.author;
        const grade = activeSlide.dataset.grade;
        const authorImage = activeSlide.dataset.authorImage;
           const cursor = document.querySelector('#custom-cursor');

        // Actualizar imagen de fondo con transición elegante
        if (backgroundImage && backgroundImg) {
          gsap.to(backgroundImg, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              backgroundImg.src = backgroundImage;
              gsap.to(backgroundImg, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.inOut'
              });
            }
          });
        }

     
      // NUEVA LÓGICA: Condicionar cursor y funcionalidad de video
      if (videoId && videoId.trim() !== '' && backgroundContainer) {
        // HAY VIDEO - Habilitar funcionalidad
        backgroundContainer.setAttribute('data-video-id', videoId);
        backgroundContainer.classList.add('cursor-pointer');
        
 // Habilitar cursor con GSAP (solo desktop)
        if (cursor && window.innerWidth >= 1024) {
          gsap.set(cursor, { display: 'block' });
        }
      } else {
        // NO HAY VIDEO - Deshabilitar funcionalidad
        backgroundContainer.removeAttribute('data-video-id');
        backgroundContainer.classList.remove('cursor-pointer');
        
       
        // Deshabilitar cursor con GSAP y resetear estado
        if (cursor) {
          gsap.set(cursor, { 
            display: 'none',
            scale: 0,
            opacity: 1
          });
        }
      }

        // Actualizar información del autor
        if (author && authorName) authorName.textContent = author;
        if (grade && authorGrade) authorGrade.textContent = grade;
        if (authorImage && authorImg) authorImg.src = authorImage;
      };

      // Inicializar Swiper
      const swiper = new Swiper('#testimonials-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '#testimonials-swiper-next',
          prevEl: '#testimonials-swiper-prev',
        },
        pagination: {
          el: '#testimonials-swiper-pagination',
          clickable: true,
        },
        on: {
          slideChange: function () {
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
              updateContent(activeSlide);
              setFadeUpAnimations();
            }
          },
          init: function () {
            // Actualizar contenido inicial
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
              updateContent(activeSlide);
            }
          }
        }
      });
    };

    // Inicializar sistema de testimonios
    initTestimonialsSystem();

    // Custom cursor para testimonios - SOLO DESKTOP
    const container = document.querySelector('#testimonials-background');
    const cursor = document.querySelector('#custom-cursor');
    if (!cursor || !container) return;

    const mm = gsap.matchMedia();

    // Solo activar cursor personalizado en desktop (con mouse)
    mm.add('(min-width: 1024px)', () => {
      const xTo = gsap.quickSetter(cursor, 'x', 'px');
      const yTo = gsap.quickSetter(cursor, 'y', 'px');

      // Inicializar cursor oculto
      gsap.set(cursor, {
        opacity: 1,
        scale: 0
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
        gsap.to(cursor, { opacity: 1, scale: 0, ease: 'bounce.out', duration: 0.3 });
      });
    });

    // En móviles y tablets: mantener cursor oculto
    mm.add('(max-width: 1023px)', () => {
      gsap.set(cursor, {
        opacity: 0,
        display: 'none'
      });
    });
  });
