document.addEventListener('DOMContentLoaded', function() {

    if(!document.querySelector('#inn-slider')) return;

    gsap.registerPlugin(Draggable,ScrollTrigger)

    // Seleccionamos los elementos
    const slides = gsap.utils.toArray('.slide');

    const bulletsContainer = document.querySelector('.inn-slider-bullets');
    slides.forEach((slide, index) => {
        slide.setAttribute('data-index', index);
        const bullet = document.createElement('span');
        bullet.classList.add('inn-slider-bullet', 'after:block', 'after:w-1', 'after:h-3', 'after:bg-[#A7B2F2]', 'after:m-auto', 'flex', 'flex-col', 'mb-2', 'last-of-type:after:content-none','after:transition-all', 'after:duration-300');
        bullet.innerHTML = `<span class="w-[10px] h-[10px] rounded-full bg-white mb-2 m-auto transition-all duration-500"></span>`;
        if (index === 0) bullet.classList.add('active');
        bulletsContainer.appendChild(bullet);
    });

    const bullets = gsap.utils.toArray('.inn-slider-bullet');

    for (let i = 1; i < slides.length; i++) {
        if(i !== slides.length - 1) {
            gsap.set(slides[i]?.querySelector('.inn-slider-picture'), { yPercent: 200, opacity: 0, xPercent: 20, rotation: -15 });
        } else {
            gsap.set(slides[i], { yPercent: func_mob_desk(0,50), opacity: 0, xPercent: func_mob_desk(50,0), rotation: 0 });
        }
    }

    const tl = gsap.timeline();
    slides.forEach((slide, index) => {
        const isLast = index === slides.length - 1;
        if(!isLast) {
            tl.to(slide?.querySelector('.inn-slider-picture'), { yPercent: func_mob_desk(0,-100), rotation: func_mob_desk(0,15), opacity: 0, duration: func_mob_desk(0.5,0.8), xPercent: func_mob_desk(-100,20) })
            .fromTo(
                slides[index + 1]?.querySelector('.inn-slider-picture'),
                { yPercent: func_mob_desk(0,150), opacity: 0, xPercent: func_mob_desk(100,20), rotation: func_mob_desk(0,-15), duration: func_mob_desk(0.5,1), delay: func_mob_desk(0,0.2) },
                { yPercent: 0, opacity: 1, rotation: 0, xPercent: 0, duration: func_mob_desk(0.6,1)},
                '<'
            );
            tl.to(slide?.querySelector('.inn-slider-content'), { opacity: 0, duration: func_mob_desk(0.3,1) },'<')
            .fromTo(
                slides[index + 1]?.querySelector('.inn-slider-content'),
                { opacity: 0, duration: func_mob_desk(0.3,0.8), delay: func_mob_desk(0,0.5) },
                { opacity: 1, duration: func_mob_desk(0.3,0.8)},
                '<0.2'
            );
        } else {
            tl.to(slide, { yPercent: 0, opacity: 1, duration: .8, rotation: 0, xPercent: 0, delay: 0 },func_mob_desk('<0.2','<0.7'));
        }

    });

    const section_size = document.querySelector('#inn-slider').offsetHeight;
    ScrollTrigger.create({
        animation: tl,
        trigger: '.vertical-carousel',
        //start: `${func_mob_desk('-86', '-90')} top`,
        start: 'top top',
        // end: () => `+=${(slides.length - 1) * window.innerHeight} bottom`,
        end: () => `+=${slides.length * (section_size + 100)} bottom`,
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
            const index = Math.round(self.progress * (slides.length - 1));
            updateBullets(index);
        },
        markers: false
    });

    function updateBullets(activeIndex) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === activeIndex);
        });
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === activeIndex);
        });
    }


    const swiper = new Swiper(".inn-slider-swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });


    function func_mob_desk(mob,desk) {
        const width = window.innerWidth;
        if(width <= 1024) {
            return mob
        }
        return desk
    }
});