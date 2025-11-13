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
      if (index !== accordionItems.length - 1) {
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
const ctaSingUp = document.querySelector('.cta-sing-up');
const targetSection = document.querySelector('.show-cta'); 
const footerSection = document.getElementById('new-footer');

if (!stickyCTA || !targetSection || !footerSection) {
  console.error('Elementos no encontrados');
  return;
}

let hasEnteredViewport = false;
let isAnchored = false;
let isInCtaSingUp = false;


const tabsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const sectionRect = targetSection.getBoundingClientRect();

    const isScrollingUp = sectionRect.top > 0;

    if (entry.isIntersecting) {
      stickyCTA.style.display = "block";
      hasEnteredViewport = true;
    } else if (!isScrollingUp) {
        stickyCTA.style.display = "block";
      }
      else if (isScrollingUp && hasEnteredViewport) {
        stickyCTA.style.display = "none";

    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0
});


let hasHiddenCTA = false;
let lastScrollY = window.scrollY;

const ctaSingUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY;

    if (entry.isIntersecting) {
      hasHiddenCTA = true;
      stickyCTA.style.display = "none";
    } else if (hasHiddenCTA && isScrollingUp) {
      stickyCTA.style.display = "block";
    }

    lastScrollY = currentScrollY;
  });
}, {
  root: null,
  threshold: 0.1
});

if (targetSection) {
  tabsObserver.observe(targetSection);
}

if (ctaSingUp) {
  ctaSingUpObserver.observe(ctaSingUp);
}