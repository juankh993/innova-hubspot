document.querySelector(".header").style.display = "none";
const menuButton = document.getElementById('menu-button');
const lines = document.getElementById('lines');
const xIcon = document.getElementById('x-icon');
const nav = document.getElementById('header-nav');
const headerContact = document.getElementById('header-contact');
const headerMenuItems = document.getElementById('header-menu-items');
const navElement = document.querySelector('nav');
 
let navMenu = navElement.querySelector('ul');
 
menuButton.addEventListener('click', () => {
  if (lines.classList.contains('hidden')) {
    lines.classList.remove('hidden');
    xIcon.classList.add('hidden');
    nav.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    headerMenuItems.classList.add('md:hidden');
 
    if (navMenu && !navElement.contains(navMenu)) {
      navElement.appendChild(navMenu);
    }
  } else {
    lines.classList.add('hidden');
    xIcon.classList.remove('hidden');
    nav.classList.add('hidden');
    document.body.style.overflow = 'auto';
    headerMenuItems.classList.remove('md:hidden');
 
 
    if (navMenu && !headerMenuItems.contains(navMenu)) {
      headerMenuItems.appendChild(navMenu);
    }
  }
});
 
const checkDropdownStatus = () => {
  const hasActiveDropdown = document.querySelector('#home-dropdown.home-dropdown-active') !== null;
 
  if (hasActiveDropdown) {
    headerContact.classList.add('header-contact-hidde');
  } else {
    headerContact.classList.remove('header-contact-hidde');
  }
};
 
 
// Para mobile - manejar clicks en dropdowns
document.addEventListener('click', (e) => {
  const dropdownLink = e.target.closest('.has-dropdown > a');
  
  if (dropdownLink && window.innerWidth < 768) {
    e.preventDefault();
    const dropdown = dropdownLink.closest('#home-dropdown');
    
    if (dropdown) {
      const isActive = dropdown.classList.contains('home-dropdown-active');
      
      // Cerrar todos los dropdowns
      document.querySelectorAll('#home-dropdown').forEach(item => {
        item.classList.remove('home-dropdown-active');
      });
      
      // Toggle el dropdown actual
      if (!isActive) {
        dropdown.classList.add('home-dropdown-active');
      }
      
      checkDropdownStatus();
    }
  }
});

// Para mouseenter - abrir dropdown (desktop)
document.addEventListener('mouseenter', (e) => {
  if (window.innerWidth >= 768) {
    const dropdown = e.target.closest('#home-dropdown');
   
    if (dropdown) {
      document.querySelectorAll('#home-dropdown').forEach(item => {
        if (item !== dropdown) {
          item.classList.remove('home-dropdown-active');
        }
      });
   
      dropdown.classList.add('home-dropdown-active');
      checkDropdownStatus();
    }
  }
}, true);
 
// Para mouseleave - cerrar dropdown con delay (desktop)
document.addEventListener('mouseleave', (e) => {
  if (window.innerWidth >= 768) {
    const dropdown = e.target.closest('#home-dropdown');
   
    if (dropdown) {
      // Pequeño delay para permitir movimiento del mouse
      setTimeout(() => {
        const isStillHovering = dropdown.matches(':hover') ||
          dropdown.querySelector(':hover');
   
        if (!isStillHovering) {
          dropdown.classList.remove('home-dropdown-active');
          checkDropdownStatus();
        }
      }, 100);
    }
  }
}, true);
 
const dropdownImages = document.querySelectorAll('#home-dropdown-image img');
 
const showImage = (schoolName) => {
  dropdownImages.forEach(img => {
    if (img.dataset.school === schoolName) {
      img.classList.remove('hidden');
    } else {
      img.classList.add('hidden');
    }
  });
};
 
const showDefaultImage = () => {
  dropdownImages.forEach(img => {
    if (img.classList.contains('default-image')) {
      img.classList.remove('hidden');
    } else {
      img.classList.add('hidden');
    }
  });
};
 
document.addEventListener('mouseenter', (e) => {
  if (e.target && e.target.closest) {
    const hoverItem = e.target.closest('li.hover-item');
    if (hoverItem && hoverItem.dataset.school) {
      const schoolName = hoverItem.dataset.school;
      showImage(schoolName);
    }
  }
}, true);
 
const dropdownList = document.querySelector('#home-dropdown ul');
if (dropdownList) {
  dropdownList.addEventListener('mouseleave', () => {
    showDefaultImage();
  });
}
 
 
if (window.innerWidth >= 768 && navMenu) {
  headerMenuItems.appendChild(navMenu);
}
 
 
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    if (navMenu && !headerMenuItems.contains(navMenu)) {
      headerMenuItems.appendChild(navMenu);
    }
  } else {
    if (navMenu && !navElement.contains(navMenu)) {
      navElement.appendChild(navMenu);
    }
  }
});
 
const menu = document.querySelector('#inn-header');
const sentinel = document.querySelector('#scroll-sentinel');
 
let lastScrollY = window.scrollY;
let isScrollingDown = false;
 
// Detecta dirección del scroll (arriba/abajo)
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const activeDropdown = document.querySelector('#home-dropdown.home-dropdown-active');
  if (activeDropdown) {
    activeDropdown.classList.remove('home-dropdown-active');
    checkDropdownStatus();
  }
  if (currentScroll > lastScrollY) {
    menu.classList.add('inn-hidden');
  } else {
    menu.classList.remove('inn-hidden');
  }
  lastScrollY = currentScroll;
}, { passive: true });
 
// Observa si el sentinel está visible o no
const observer = new IntersectionObserver(
  ([entry]) => {
    if (isScrollingDown && !entry.isIntersecting) {
      // Bajando → ocultar menú
      menu.classList.add('hide');
    } else {
      // Subiendo → mostrar menú
      menu.classList.remove('hide');
    }
  },
  { threshold: 0 }
);
 
observer.observe(sentinel);