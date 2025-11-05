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
        const audioSrc = activeSlide.dataset.audio;
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
        
         // Actualizar audio del testimonio
        if (audioSrc) {
          const audioElement = document.getElementById('audio-player__audio');
          const audioSource = document.getElementById('audio-source');
          if (audioElement && audioSource) {
            // Pausar audio actual si está reproduciéndose
            audioElement.pause();
            audioElement.currentTime = 0;
            
            // Cambiar la fuente del audio
            audioSource.src = audioSrc;
            audioElement.load(); // Recargar el elemento audio con la nueva fuente
            
            // Resetear la visualización de barras de audio
            const svgPaths = document.querySelectorAll('#audio-player__line path');
            svgPaths.forEach(path => {
              path.setAttribute('stroke', '#B5B5B5');
            });
            
            // Resetear el tiempo mostrado
            const timeElement = document.getElementById('audio-player__time');
            if (timeElement) {
              timeElement.textContent = '00:00';
            }
          }
        }
      };

      // Inicializar Swiper
      const swiper = new Swiper('#testimonials-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
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
    
    //Logica de audio testimonial
    const cursorButton = document.getElementById('audio-player__cursor');
    const line = document.getElementById('audio-player__line');
    const time = document.getElementById('audio-player__time');
    const audio = document.getElementById('audio-player__audio');
    const svgPaths = line.querySelectorAll('path');
    const totalBars = svgPaths.length;
    let isPlaying = false;

    cursorButton.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play();
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        
        time.textContent = formatTime(currentTime);
        
        const progress = currentTime / duration;
        
        const barsToColor = Math.floor(progress * totalBars);
        
        svgPaths.forEach((path, index) => {
            if (index < barsToColor) {
                path.setAttribute('stroke', '#F85245');
            } else {
                path.setAttribute('stroke', '#B5B5B5');
            }
        });
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        svgPaths.forEach(path => {
            path.setAttribute('stroke', '#B5B5B5');
        });
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
    });

    audio.addEventListener('play', () => {
        isPlaying = true;
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
       }
    )