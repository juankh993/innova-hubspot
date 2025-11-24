document.querySelector(".header").style.display = "none";

const menuButton = document.getElementById('menu-button');
const lines = document.getElementById('lines');
const xIcon = document.getElementById('x-icon');
const nav = document.getElementById('header-nav');
const headerContact = document.getElementById('header-contact');
const headerMenuItems = document.getElementById('header-menu-items');
const navElement = document.querySelector('nav');

let navMenu = navElement.querySelector('ul');

// -----------------------
// MENU MOBILE
// -----------------------

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

// -----------------------
// DROPDOWNS
// -----------------------

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

const checkDropdownStatus = () => {
  const hasActiveDropdown = document.querySelector('#home-dropdown.home-dropdown-active') !== null;
  if (hasActiveDropdown) {
    headerContact.classList.add('header-contact-hidde');
  } else {
    headerContact.classList.remove('header-contact-hidde');
  }
};

// -----------------------
// MOBILE CLICK
// -----------------------

document.addEventListener('click', (e) => {
  if (!e || !e.target || typeof e.target.closest !== 'function') return;

  const dropdownLink = e.target.closest('.has-dropdown > a');
  if (dropdownLink && window.innerWidth < 768) {
    e.preventDefault();

    const dropdown = dropdownLink.closest('#home-dropdown');
    const isActive = dropdown.classList.contains('home-dropdown-active');

    document.querySelectorAll('#home-dropdown').forEach(d => {
      d.classList.remove('home-dropdown-active');
    });

    if (!isActive) {
      showDefaultImage();
      dropdown.classList.add('home-dropdown-active');
    }

    checkDropdownStatus();
  }
});

// -----------------------
// DESKTOP MOUSEENTER
// -----------------------

document.addEventListener('mouseenter', (e) => {
  if (window.innerWidth >= 768 && e?.target?.closest) {
    const dropdown = e.target.closest('#home-dropdown');

    if (dropdown) {
      document.querySelectorAll('#home-dropdown').forEach(item => {
        if (item !== dropdown) {
          item.classList.remove('home-dropdown-active');
        }
      });

      showDefaultImage();
      dropdown.classList.add('home-dropdown-active');
      checkDropdownStatus();
    }
  }
}, true);

// -----------------------
// DESKTOP MOUSELEAVE
// -----------------------

document.addEventListener('mouseleave', (e) => {
  if (window.innerWidth >= 768 && e?.target?.closest) {
    const dropdown = e.target.closest('#home-dropdown');

    if (dropdown) {
      setTimeout(() => {
        const isStillHovering =
          dropdown.matches(':hover') ||
          dropdown.querySelector(':hover');

        if (!isStillHovering) {
          dropdown.classList.remove('home-dropdown-active');
          checkDropdownStatus();
          showDefaultImage();
        }
      }, 100);
    }
  }
}, true);

// -----------------------
// ITEM HOVER IMAGE
// -----------------------

document.addEventListener('mouseenter', (e) => {
  const hoverItem = e?.target?.closest?.('li.hover-item');
  if (hoverItem?.dataset?.school) {
    showImage(hoverItem.dataset.school);
  }
}, true);

// -----------------------
// RESTORE IMAGE LEAVE
// -----------------------

document.querySelectorAll('#home-dropdown ul').forEach(list => {
  list.addEventListener('mouseleave', () => {
    showDefaultImage();
  });
});

// -----------------------
// MOVE UL BETWEEN MOBILE / DESKTOP
// -----------------------

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

// -----------------------
// HEADER AUTO-HIDE SCROLL
// -----------------------

const menu = document.querySelector('#inn-header');
const sentinel = document.querySelector('#scroll-sentinel');
const ctaRegisterNavbar = document.querySelector('#cta-register-navbar');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  const activeDropdown = document.querySelector('#home-dropdown.home-dropdown-active');
  if (activeDropdown) {
    activeDropdown.classList.remove('home-dropdown-active');
    checkDropdownStatus();
    showDefaultImage();
  }

  if (currentScroll > lastScrollY) {
    menu.classList.add('inn-hidden');
  } else {
    menu.classList.remove('inn-hidden');
  }

  lastScrollY = currentScroll;
}, { passive: true });

const observer = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      menu.classList.add('hide');
    } else {
      menu.classList.remove('hide');
    }
  },
  { threshold: 0 }
);

observer.observe(sentinel);

// -----------------------
// CTA: RESTAURAR SCROLL + CERRAR MENU
// -----------------------

if (ctaRegisterNavbar) {
  ctaRegisterNavbar.addEventListener('click', () => {

    document.body.style.overflow = 'auto';
    document.body.classList.remove('overflow-hidden');

    lines.classList.remove('hidden');   // mostrar líneas
    xIcon.classList.add('hidden');      // ocultar X
    nav.classList.add('hidden');        // ocultar menú

    headerMenuItems.classList.remove('md:hidden');

    if (navMenu && !headerMenuItems.contains(navMenu)) {
      headerMenuItems.appendChild(navMenu);
    }
  });
}
