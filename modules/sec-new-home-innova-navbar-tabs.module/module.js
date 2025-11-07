const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');


function switchTab(tabIndex) {
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  tabContents.forEach(content => {
    content.classList.add('hidden');
  });

  const selectedButton = document.querySelector(`[data-tab-index="${tabIndex}"]`);
  const selectedContent = document.getElementById(`tab-content-${tabIndex}`);

  if (selectedButton && selectedContent) {
    selectedButton.classList.add('active');
    selectedButton.setAttribute('aria-selected', 'true');
    selectedContent.classList.remove('hidden');
  }
}

tabButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const tabIndex = e.currentTarget.getAttribute('data-tab-index');
    switchTab(tabIndex);
  });
});

let currentAccordionIndex = 0;
function setupAccordions() {
  const accordionItems = document.querySelectorAll(".accordion-item");
  const accordionImages = document.querySelectorAll(".accordion-image");

  accordionItems.forEach(function (item, index) {
    const button = item.querySelector("button");
    const content = item.querySelector(".accordion-content");
    const line = item.querySelector(".item-line");
    const title = item.querySelector(".accordion-title");
    content.style.maxHeight = content.scrollHeight + "px";

    // Set initial state for the first accordion
    if (index === 0) {
      content.style.maxHeight = "fit-content";
      if (line) line.style.opacity = "1";
      if (title) {
        title.classList.add("font-bold");
        title.classList.remove("font-normal", "font-regular");
      }
      
      const firstTabMobileDropdownIcon = item.querySelector(".tab-mobile-dropdown-icon");
      if (firstTabMobileDropdownIcon) firstTabMobileDropdownIcon.style.transform = "rotate(180deg)";
    } else {
      content.style.maxHeight = "0px";
      if (line) line.style.opacity = "0";
      if (title) {
        title.classList.add("font-regular");
        title.classList.remove("font-bold", "font-normal");
      }
    }

    button.addEventListener("click", function () {
      if (currentAccordionIndex === index) return;

      accordionItems.forEach(function (otherItem, otherIndex) {
        const otherButton = otherItem.querySelector("button");
        const otherContent = otherItem.querySelector(".accordion-content");
        const otherTitle = otherItem.querySelector(".accordion-title");
        const otherIndicator = otherItem.querySelector(".dot-outer");
        const otherDot = otherItem.querySelector(".dot-inner");
        const otherLine = otherItem.querySelector(".item-line");
        const tabMobileDropdownIcon = otherItem.querySelector('.tab-mobile-dropdown-icon');
        otherIndicator.classList.remove('active-item');

        // Cierre suave
        otherContent.style.maxHeight = "0px";

        if (otherTitle) {
          otherTitle.classList.add("font-regular");
          otherTitle.classList.remove("font-bold");
        }

        if (otherIndicator) otherIndicator.style.backgroundColor = "transparent";
        if (otherDot) otherDot.style.backgroundColor = "#003b87";
        if (otherLine) otherLine.style.opacity = "0";

        if (tabMobileDropdownIcon) tabMobileDropdownIcon.style.transform = "rotate(0deg)";

        // Ocultar imagen correspondiente
        if (accordionImages[otherIndex]) {
          accordionImages[otherIndex].classList.add("hidden");
        }
      });

      // Apertura suave
      content.style.maxHeight = content.scrollHeight + "px";
      button.querySelector(".dot-outer").classList.add('active-item');

      const currentTitle = item.querySelector(".accordion-title");
      if (currentTitle) {
        currentTitle.classList.add("font-bold");
        currentTitle.classList.remove("font-regular");
      }

      const indicator = item.querySelector(".dot-outer");
      const dot = item.querySelector(".dot-inner");
      if (indicator) indicator.style.backgroundColor = "#fce8c2";
      if (dot) dot.style.backgroundColor = "#fdb731";
      if(index !== accordionItems.length - 1) {
        if (line) line.style.opacity = "1";
      }

      const actualTabMobileDropdownIcon = item.querySelector(".tab-mobile-dropdown-icon");
      if (actualTabMobileDropdownIcon) actualTabMobileDropdownIcon.style.transform = "rotate(180deg)";

      // Mostrar imagen correspondiente
      if (accordionImages[index]) {
        accordionImages[index].classList.remove("hidden");
      }

      currentAccordionIndex = index;
    });

  });
}

setupAccordions();

//Cta mobile logic
const stickyCTA = document.getElementById('sticky-cta-mobile');
const targetSection = document.getElementById('tabs-section'); 
const footerSection = document.getElementById('new-footer');
const schoolsNetworkSection = document.getElementById('section-schools-network');
const stickyCTAShow = document.getElementById('sticky-cta-mobile-show');

if (!stickyCTA || !targetSection || !footerSection) {
    console.error('Elementos no encontrados');
    return;
}

let hasEnteredViewport = false;
let isAnchored = false;
let isInSchoolsNetwork = false;

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};


// Observer para mostrar/ocultar el CTA cuando tabs-section está visible
const tabsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const sectionRect = targetSection.getBoundingClientRect();
        const isScrollingUp = sectionRect.top > 0;
        
        if (entry.isIntersecting) {
            hasEnteredViewport = true;
            if (!isAnchored && !isInSchoolsNetwork) {
                stickyCTA.classList.remove('translate-y-full');
                stickyCTA.classList.add('translate-y-0');
            }
        } else {
            if (isScrollingUp && hasEnteredViewport) {
                stickyCTA.classList.add('translate-y-full');
                stickyCTA.classList.remove('translate-y-0');
                hasEnteredViewport = false;
            }
        }
    });
}, observerOptions);

// Función para manejar el scroll y anclar el CTA
function handleCTAPosition() {
    if (!hasEnteredViewport) return;
    
    const footerRect = footerSection.getBoundingClientRect();
    const ctaHeight = stickyCTA.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calcula si el footer está entrando en el viewport
    const footerDistanceFromBottom = windowHeight - footerRect.top;
    
    if (footerRect.top <= windowHeight && footerRect.top > 0) {
        // El footer está visible - anclar el CTA
        isAnchored = true;
        // stickyCTA.style.position = 'fixed';
        // stickyCTA.style.bottom = Math.max(0, footerDistanceFromBottom) + 'px';
        stickyCTA.style.bottom = '0px';
        // stickyCTA.classList.remove('translate-y-full');
        // stickyCTA.classList.add('translate-y-0');
    } 
    else if (footerRect.top > windowHeight) {
        // El footer NO está visible - comportamiento fixed normal
        isAnchored = false;
        stickyCTA.style.position = 'fixed';
        // stickyCTA.style.bottom = '0px';
    } 
}

// Observer para el footer
const footerObserver = new IntersectionObserver((entries) => {
    handleCTAPosition();
}, {
    root: null,
    rootMargin: '0px',
    threshold: Array.from({length: 21}, (_, i) => i * 0.05) // Más precisión
});

// Observer para la sección schools-network
const schoolsNetworkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const schoolsRect = schoolsNetworkSection.getBoundingClientRect();
        const ctaHeight = stickyCTA.offsetHeight;
        
        // Detectar si el CTA está llegando al inicio de la sección
        const isCtaReachingSection = schoolsRect.top <= window.innerHeight && schoolsRect.top > 0;
        
        if (entry.isIntersecting) {
            // Cuando entramos a la sección schools-network
            isInSchoolsNetwork = true;
            
            // Ocultar el CTA fixed
            stickyCTA.classList.add('translate-y-full');
            stickyCTA.classList.remove('translate-y-0');
            
            // Mostrar el CTA de la sección schools-network
            if (stickyCTAShow) {
                stickyCTAShow.classList.remove('translate-y-full');
                stickyCTAShow.classList.add('translate-y-0');
            }
        } else {
            // Cuando salimos de la sección schools-network
            const schoolsNetworkRect = schoolsNetworkSection.getBoundingClientRect();
            const isAboveViewport = schoolsNetworkRect.bottom < 0;
            const isBelowViewport = schoolsNetworkRect.top > window.innerHeight;
            
            isInSchoolsNetwork = false;
            
            // Ocultar el CTA de la sección schools-network
            if (stickyCTAShow) {
                stickyCTAShow.classList.add('translate-y-full');
                stickyCTAShow.classList.remove('translate-y-0');
            }
            
            // Mostrar el CTA fixed cuando salimos hacia arriba (scroll up)
            if (isBelowViewport && hasEnteredViewport && !isAnchored) {
                stickyCTA.classList.remove('translate-y-full');
                stickyCTA.classList.add('translate-y-0');
            }
            
            // También mostrar cuando estamos por encima y hemos pasado tabs-section
            if (isAboveViewport && hasEnteredViewport && !isAnchored) {
                stickyCTA.classList.remove('translate-y-full');
                stickyCTA.classList.add('translate-y-0');
            }
        }
    });
}, {
    root: null,
    rootMargin: '-80px 0px 0px 0px', // Detecta cuando está llegando al final de la sección (80px desde arriba)
    threshold: [0, 0.1, 1]
});

// Escuchar scroll para actualizar posición en tiempo real
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleCTAPosition();
            ticking = false;
        });
        ticking = true;
    }
});

tabsObserver.observe(targetSection);
footerObserver.observe(footerSection);

// Observar la sección schools-network
if (schoolsNetworkSection) {
    schoolsNetworkObserver.observe(schoolsNetworkSection);
}