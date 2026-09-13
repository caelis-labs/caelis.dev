(() => {
  'use strict';
  const video = document.getElementById('home-demo-video');
  if (!video) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const content = video.closest('.video-content');
  let visible = false;

  function centerVideo(behavior) {
    content.scrollIntoView({ block: 'center', inline: 'nearest', behavior });
  }

  document.querySelectorAll('a[href="#demo-video"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (location.hash !== '#demo-video') history.pushState(null, '', '#demo-video');
      centerVideo(motion.matches ? 'instant' : 'smooth');
      video.focus({ preventScroll: true });
    });
  });

  function alignHash() {
    if (location.hash === '#demo-video') centerVideo('instant');
  }
  window.addEventListener('pageshow', () => requestAnimationFrame(alignHash));
  window.addEventListener('hashchange', alignHash);

  // This presentation has no playback controls; reduced motion keeps it still.
  function sync() {
    if (!visible || document.hidden || motion.matches) {
      video.pause();
    } else if (video.paused) {
      video.play().catch(() => {});
    }
  }
  video.pause();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].intersectionRatio >= 0.25;
      sync();
    }, { threshold: 0.25 }).observe(video);
  } else {
    visible = true;
    sync();
  }
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
})();
