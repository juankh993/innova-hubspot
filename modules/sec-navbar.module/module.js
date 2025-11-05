
  const sectionIds = [
    "section-hero",
    "section-education",
    "section-value-props",
    "section-testimonials",
    "section-location"
  ];

  const navLinks = document.querySelectorAll("#fixed-blue-nav a.tab-link");

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px", // Detecta intersección en el centro del viewport
    threshold: 0
  };


  function highlightLink(sectionId) {
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === "#" + sectionId) {
        link.style.color = "#FDB731";
      } else {
        link.style.color = "";
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        highlightLink(entry.target.id);
      }
    });
  }, observerOptions);

  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

