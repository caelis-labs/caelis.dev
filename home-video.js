(() => {
  'use strict';
  const video = document.getElementById('home-demo-video');
  if (!video) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;

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
