(() => {
  'use strict';
  const video = document.getElementById('home-demo-video');
  if (!video) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let pausedByViewer = false;
  let automaticallyPaused = true;

  // Native controls remain available if autoplay is blocked or motion is reduced.
  function sync() {
    if (!visible || document.hidden || motion.matches || pausedByViewer) {
      if (!video.paused) {
        automaticallyPaused = true;
        video.pause();
      }
    } else if (video.paused) {
      automaticallyPaused = false;
      video.play().catch(() => {});
    }
  }
  video.addEventListener('pause', () => {
    if (!automaticallyPaused && visible && !document.hidden) pausedByViewer = true;
  });
  video.addEventListener('play', () => {
    pausedByViewer = false;
    automaticallyPaused = false;
  });
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
