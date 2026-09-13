(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const canvas = byId('terminal'), ctx = canvas.getContext('2d');
  const play = byId('play'), seek = byId('seek'), time = byId('time');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = ['Start', 'Connect', 'Providers', 'Agents', 'Delegate', 'Breeze', 'Orbit', 'Steer', 'Result'];
  let movie, cells, position = 0, pointer = 0, running = false, last = 0, raf = 0, chapter = '';
  const cw = 12, ch = 24;
  const stamp = ms => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
  function clear() {
    cells = Array.from({ length: movie.rows }, () => Array.from({ length: movie.cols }, () => [' ', 0]));
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  function patch(item) {
    if (item.reset) clear();
    for (const [row, col, text, style] of item.patches) {
      const [fg, bg, bold] = movie.styles[style];
      const chars = Array.from(text);
      ctx.fillStyle = bg;
      ctx.fillRect(col * cw, row * ch, chars.length * cw, ch);
      ctx.font = `${bold ? 'bold ' : ''}21px Consolas, "Liberation Mono", monospace`;
      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = fg;
      chars.forEach((char, n) => { ctx.fillText(char, (col + n) * cw, row * ch + 19); cells[row][col + n] = [char, style]; });
    }
    if (item.scene) setChapter(item.scene);
  }
  function setChapter(id) {
    if (chapter !== id) {
      chapter = id;
      const current = movie.chapters.find(c => c.id === chapter);
      byId('chapter-title').textContent = current.title;
      byId('chapter-note').textContent = current.note;
      for (const button of byId('chapters').children) button.setAttribute('aria-current', String(button.dataset.scene === chapter));
    }
  }
  function textView() {
    if (cells && byId('transcript').open) byId('terminal-text').textContent = cells.map(row => row.map(c => c[0]).join('').trimEnd()).join('\n');
  }
  function update() { seek.value = position / 1000; time.value = `${stamp(position)} / ${stamp(movie.duration)}`; textView(); }
  function stop() { running = false; cancelAnimationFrame(raf); play.textContent = 'Play'; play.setAttribute('aria-pressed', 'false'); textView(); }
  function go(ms) {
    position = Math.max(0, Math.min(movie.duration, ms));
    pointer = 0;
    for (let i = 0; i < movie.events.length && movie.events[i].at <= position; i++) if (movie.events[i].reset) pointer = i;
    clear(); chapter = '';
    while (pointer < movie.events.length && movie.events[pointer].at <= position) patch(movie.events[pointer++]);
    setChapter(movie.chapters.findLast(c => c.at <= position).id);
    update();
  }
  function tick(now) {
    if (!running) return;
    position = Math.min(movie.duration, position + (now - last) * Number(byId('speed').value)); last = now;
    while (pointer < movie.events.length && movie.events[pointer].at <= position) patch(movie.events[pointer++]);
    update();
    if (position >= movie.duration) stop(); else raf = requestAnimationFrame(tick);
  }
  function start() {
    if (!movie) return;
    if (position >= movie.duration) go(0);
    running = true; last = performance.now(); play.textContent = 'Pause'; play.setAttribute('aria-pressed', 'true');
    cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
  }
  function choose(index) {
    stop();
    go(movie.chapters[index][reduced ? 'hold' : 'at']);
    if (!reduced) start();
  }
  play.onclick = () => running ? stop() : start();
  byId('restart').onclick = () => { stop(); go(0); };
  seek.oninput = () => { stop(); go(Number(seek.value) * 1000); };
  byId('transcript').ontoggle = textView;
  byId('commands').onsubmit = e => {
    e.preventDefault(); if (!movie) return;
    const input = byId('command').value.trim().toLowerCase();
    const routes = { '/connect': 1, '/subagent': 3, '/demo': 4, '/review': 8, '/new': 0, '/help': 0 };
    if (Object.hasOwn(routes, input)) { choose(routes[input]); byId('command-status').textContent = `${reduced ? 'Showing' : 'Playing'} ${labels[routes[input]]}.`; }
    else byId('command-status').textContent = 'Try /connect, /subagent, /demo, /review, or /new.';
  };
  canvas.onkeydown = e => {
    if (!movie) return;
    if (e.key === ' ') { e.preventDefault(); running ? stop() : start(); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); stop(); go(position + (e.key === 'ArrowRight' ? 5000 : -5000)); }
  };
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  fetch('recordings/timeline.json').then(r => { if (!r.ok) throw new Error('Could not load the recording.'); return r.json(); }).then(data => {
    movie = data; canvas.width = movie.cols * cw; canvas.height = movie.rows * ch;
    movie.chapters.forEach((c, i) => {
      const button = document.createElement('button'); button.textContent = `${String(i + 1).padStart(2, '0')} ${labels[i]}`;
      button.dataset.scene = c.id; button.onclick = () => choose(i); byId('chapters').append(button);
    });
    byId('loading').hidden = true; play.disabled = seek.disabled = byId('restart').disabled = false;
    seek.max = movie.duration / 1000; go(0);
  }).catch(error => { byId('loading').textContent = `${error.message} Refresh to retry.`; });
})();
