const setCustomCursor = () => {
  const container = document.querySelector('.video-overlay');
  const cursor = document.getElementById('video-cursor');
  if (!cursor || !container) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    const xTo = gsap.quickSetter(cursor, 'x', 'px');
    const yTo = gsap.quickSetter(cursor, 'y', 'px');

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
};

setCustomCursor()
