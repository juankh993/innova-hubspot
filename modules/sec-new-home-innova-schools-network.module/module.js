//Swiper Aliados
const swiper = new Swiper('.schools-network-swiper', {
  direction: 'horizontal',
  loop: false,
  autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
  slidesPerView: 3,
  spaceBetween: 20,

});
//Animación componentes con gsap
gsap.registerPlugin(ScrollTrigger);

const sectionSchoolsNetwork = document.querySelector('#section-schools-network');
const descriptionSchoolsNetwork = document.querySelector('#description-network-school');
const schoolsNetworkButtons = document.querySelectorAll('.button-reverse');

let tl = gsap.timeline({
 scrollTrigger: {
    trigger: sectionSchoolsNetwork,
    start: 'top 80%',  
    once: true         
  }
});

tl.fromTo(descriptionSchoolsNetwork,
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.8 },
  "+=0.5"
);



schoolsNetworkButtons.forEach((button) => {
  tl.fromTo(button,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6 },
    "+=0.5"  
  );
});
