// Adapted from the original Caelis celestial canvas.
  const initHeroCelestialCanvas = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const heroSection = document.getElementById('top');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrameId = null;
    let isVisible = false;

    // Mouse flow direction tracker (-1.0 to 1.0)
    const mouseFlow = {
      normX: 0,
      normY: 0,
      smoothNormX: 0,
      smoothNormY: 0,
      isActive: false,
    };

    const onPointerMove = (clientX, clientY) => {
      // Normalizing mouse across the screen to compute the global drift bias (-1 to 1)
      mouseFlow.normX = (clientX / window.innerWidth - 0.5) * 2;
      mouseFlow.normY = (clientY / window.innerHeight - 0.5) * 2;
      mouseFlow.isActive = true;
    };

    window.addEventListener('mousemove', (e) => {
      onPointerMove(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouseFlow.normX = 0;
      mouseFlow.normY = 0;
      mouseFlow.isActive = false;
    });

    // ------------------------------------------------------------------------
    // ☀️ LIGHT THEME: DAYLIGHT CONSTELLATION FRAGMENTS
    // ------------------------------------------------------------------------
    class DaylightConstellationField {
      constructor() {
        this.clusters = [];
        this.specks = [];
        this.create();
      }

      create() {
        const compact = width < 600;
        const tablet = width >= 600 && width < 1024;
        const zones = compact
          ? [
              [0.1, 0.12], [0.7, 0.08], [0.94, 0.29], [0.06, 0.48],
              [0.9, 0.7], [0.18, 0.84], [0.61, 0.92],
            ]
          : [
              [0.05, 0.14], [0.25, 0.07], [0.61, 0.17], [0.81, 0.06], [0.95, 0.26],
              [0.1, 0.4], [0.97, 0.53], [0.03, 0.75], [0.2, 0.92],
              [0.48, 0.84], [0.73, 0.95], [0.91, 0.78],
            ];
        const clusterCount = compact ? zones.length : tablet ? 9 : zones.length;
        const baseSpread = compact ? Math.min(56, width * 0.15) : tablet ? 70 : 84;

        for (let clusterIndex = 0; clusterIndex < clusterCount; clusterIndex += 1) {
          const [zoneX, zoneY] = zones[clusterIndex % zones.length];
          const spread = baseSpread * (0.82 + Math.random() * 0.38);
          const nodeCount = 4 + Math.floor(Math.random() * 3);
          const mirrorX = Math.random() > 0.5 ? -1 : 1;
          const mirrorY = mirrorX === 1 ? -1 : (Math.random() > 0.5 ? -1 : 1);
          const flipRotation = (Math.random() > 0.5 ? 1 : -1) * (0.45 + Math.random() * 0.55);
          const cluster = {
            x: Math.max(0.03, Math.min(0.97, zoneX + (Math.random() - 0.5) * 0.06)) * width,
            y: Math.max(0.04, Math.min(0.96, zoneY + (Math.random() - 0.5) * 0.05)) * height,
            phase: Math.random() * Math.PI * 2,
            driftSpeed: 0.16 + Math.random() * 0.08,
            driftRadiusX: 9 + Math.random() * 9,
            driftRadiusY: 7 + Math.random() * 7,
            morphSpeed: 0.22 + Math.random() * 0.16,
            swimSpeed: 0.42 + Math.random() * 0.23,
            turnSpeed: 0.13 + Math.random() * 0.09,
            turnRange: 0.12 + Math.random() * 0.14,
            parallax: 4 + Math.random() * 7,
            nodes: [],
            edges: [],
          };

          for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex += 1) {
            const angle = Math.random() * Math.PI * 2;
            const distance = nodeIndex === 0 ? spread * 0.05 : spread * (0.38 + Math.random() * 0.7);
            const ax = Math.cos(angle) * distance;
            const ay = Math.sin(angle) * distance * 0.72;
            const mirroredX = ax * mirrorX;
            const mirroredY = ay * mirrorY;
            const bx = (mirroredX * Math.cos(flipRotation) - mirroredY * Math.sin(flipRotation))
              + (Math.random() - 0.5) * spread * 0.28;
            const by = (mirroredX * Math.sin(flipRotation) + mirroredY * Math.cos(flipRotation))
              + (Math.random() - 0.5) * spread * 0.22;
            cluster.nodes.push({
              ax,
              ay,
              bx,
              by,
              radius: nodeIndex === 0 ? 2 + Math.random() : 0.9 + Math.random() * 0.9,
              baseAlpha: nodeIndex === 0 ? 0.75 + Math.random() * 0.2 : 0.45 + Math.random() * 0.24,
              phase: Math.random() * Math.PI * 2,
              twinkleSpeed: 0.35 + Math.random() * 0.5,
              flexRadius: nodeIndex === 0 ? 1.5 + Math.random() : 2.5 + Math.random() * 3.5,
              flexSpeed: 0.24 + Math.random() * 0.22,
              isAnchor: nodeIndex === 0,
              drawX: 0,
              drawY: 0,
            });
            if (nodeIndex > 0) {
              cluster.edges.push([nodeIndex, Math.floor(Math.random() * nodeIndex)]);
            }
          }

          if (nodeCount > 4) {
            cluster.edges.push([nodeCount - 1, 1 + Math.floor(Math.random() * (nodeCount - 2))]);
          }

          this.clusters.push(cluster);
        }

        const speckCount = compact ? 12 : tablet ? 18 : 26;
        while (this.specks.length < speckCount) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const insideQuietCenter = x > width * 0.25 && x < width * 0.75 && y > height * 0.27 && y < height * 0.73;
          if (insideQuietCenter) continue;
          this.specks.push({
            x,
            y,
            radius: 0.45 + Math.random() * 0.6,
            alpha: 0.22 + Math.random() * 0.24,
            phase: Math.random() * Math.PI * 2,
            driftRadius: 0.8 + Math.random() * 1.8,
            driftSpeed: 0.08 + Math.random() * 0.1,
          });
        }
      }

      updateAndDraw(ctx, time) {
        ctx.save();
        ctx.lineCap = 'round';

        for (const cluster of this.clusters) {
          const driftX = Math.sin(time * cluster.driftSpeed + cluster.phase) * cluster.driftRadiusX
            + Math.sin(time * cluster.driftSpeed * 0.37 + cluster.phase * 1.7) * cluster.driftRadiusX * 0.28
            + mouseFlow.smoothNormX * cluster.parallax;
          const driftY = Math.cos(time * cluster.driftSpeed * 0.73 + cluster.phase) * cluster.driftRadiusY
            + Math.sin(time * cluster.swimSpeed + cluster.phase) * cluster.driftRadiusY * 0.26
            + mouseFlow.smoothNormY * cluster.parallax * 0.65;
          const morphWave = (1 - Math.cos(time * cluster.morphSpeed + cluster.phase)) * 0.5;
          const morph = morphWave * morphWave * (3 - 2 * morphWave);
          const swim = Math.sin(time * cluster.swimSpeed + cluster.phase * 0.71);
          const scaleX = 1 - swim * 0.08;
          const scaleY = 1 + swim * 0.11;
          const rotation = Math.sin(time * cluster.turnSpeed + cluster.phase) * cluster.turnRange;
          const cosRotation = Math.cos(rotation);
          const sinRotation = Math.sin(rotation);

          for (const node of cluster.nodes) {
            const flex = time * node.flexSpeed + node.phase;
            const localX = (node.ax + (node.bx - node.ax) * morph) * scaleX
              + Math.cos(flex) * node.flexRadius;
            const localY = (node.ay + (node.by - node.ay) * morph) * scaleY
              + Math.sin(flex * 0.83) * node.flexRadius * 0.7;
            node.drawX = cluster.x + driftX + localX * cosRotation - localY * sinRotation;
            node.drawY = cluster.y + driftY + localX * sinRotation + localY * cosRotation;
          }

          for (const [fromIndex, toIndex] of cluster.edges) {
            const from = cluster.nodes[fromIndex];
            const to = cluster.nodes[toIndex];
            const breath = 0.78 + Math.sin(time * 0.3 + from.phase) * 0.16 + swim * 0.05;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * breath})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(from.drawX, from.drawY);
            ctx.lineTo(to.drawX, to.drawY);
            ctx.stroke();
          }

          for (const node of cluster.nodes) {
            const breath = 0.84 + Math.sin(time * node.twinkleSpeed + node.phase) * 0.16;
            const alpha = node.baseAlpha * breath;
            const breathingRadius = node.radius * (node.isAnchor ? 0.96 + breath * 0.08 + swim * 0.025 : 1);
            ctx.save();
            if (node.isAnchor) {
              ctx.shadowColor = 'rgba(37, 99, 235, 0.42)';
              ctx.shadowBlur = 11;
            }
            ctx.beginPath();
            ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.arc(node.drawX, node.drawY, breathingRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        for (const speck of this.specks) {
          const alpha = speck.alpha * (0.85 + Math.sin(time * 0.28 + speck.phase) * 0.15);
          const drift = time * speck.driftSpeed + speck.phase;
          ctx.beginPath();
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.arc(
            speck.x + Math.cos(drift) * speck.driftRadius + mouseFlow.smoothNormX * 3,
            speck.y + Math.sin(drift * 0.82) * speck.driftRadius * 0.65 + mouseFlow.smoothNormY * 2,
            speck.radius,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // ------------------------------------------------------------------------
    // 🌙 DARK THEME: PURE SERENE SLOW METEORS & STARFIELD ONLY
    // ------------------------------------------------------------------------
    class SereneMeteor {
      constructor(isInit = false) {
        this.reset(isInit);
      }

      reset(isInit = false) {
        this.x = Math.random() * (width + 300) - 150;
        this.y = isInit ? Math.random() * height : -Math.random() * 120 - 40;

        this.baseAngle = Math.PI * 0.28 + (Math.random() - 0.5) * 0.12;

        // Slow, elegant cosmic velocity (~1.0 to 1.8 px/frame)
        this.speed = 1.0 + Math.random() * 0.9;
        this.tailLength = 65 + Math.random() * 75;
        this.thickness = 1.3 + Math.random() * 1.2;

        const colors = [
          { r: 56, g: 189, b: 248 },  // Cyan
          { r: 129, g: 140, b: 248 }, // Indigo
          { r: 192, g: 132, b: 252 }, // Nebula Purple
          { r: 251, g: 191, b: 36 },  // Gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0.35 + Math.random() * 0.45;
      }

      update(delta = 1) {
        // Global mouse direction slight bias
        const vx = Math.cos(this.baseAngle) * this.speed + mouseFlow.smoothNormX * 0.3;
        const vy = Math.sin(this.baseAngle) * this.speed + mouseFlow.smoothNormY * 0.2;

        this.x += vx * delta;
        this.y += vy * delta;
        this.currentAngle = Math.atan2(vy, vx);

        if (this.y > height + 100 || this.x < -200 || this.x > width + 200) {
          this.reset(false);
        }
      }

      draw(ctx) {
        const headX = this.x;
        const headY = this.y;
        const tailX = headX - Math.cos(this.currentAngle) * this.tailLength;
        const tailY = headY - Math.sin(this.currentAngle) * this.tailLength;

        const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        grad.addColorStop(0.2, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.8})`);
        grad.addColorStop(0.7, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.18})`);
        grad.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.arc(headX, headY, this.thickness * 0.85, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    class StarField {
      constructor(count) {
        this.stars = [];
        for (let i = 0; i < count; i++) {
          this.stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.8 + Math.random() * 1.4,
            baseAlpha: 0.18 + Math.random() * 0.6,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.7 + Math.random() * 1.5,
          });
        }
      }

      updateAndDraw(ctx, time) {
        for (const s of this.stars) {
          const breath = Math.sin(time * s.twinkleSpeed + s.phase);
          const alpha = Math.max(0.08, Math.min(0.85, s.baseAlpha * (0.75 + 0.35 * breath)));

          const px = (s.x + mouseFlow.smoothNormX * 18 + width) % width;
          const py = (s.y + mouseFlow.smoothNormY * 12 + height) % height;

          ctx.beginPath();
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = alpha;
          ctx.arc(px, py, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }
    }

    // Instances
    let constellationField = null;
    let meteors = [];
    let starField = null;

    const resize = () => {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Initialize irregular flexible constellations outside the quiet center.
      constellationField = new DaylightConstellationField();

      // Initialize Dark Theme Meteors & Starfield
      meteors = [];
      const meteorCount = width < 600 ? 5 : 8;
      for (let i = 0; i < meteorCount; i++) {
        meteors.push(new SereneMeteor(true));
      }
      starField = new StarField(width < 600 ? 40 : 75);
    };

    resize();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isHeroIntersecting = true;

    // Animation Loop
    let startTime = performance.now();
    let lastFrame = startTime;

    const render = (now) => {
      if (!isVisible) return;

      const time = (now - startTime) * 0.001;
      const delta = Math.min((now - lastFrame) / 16.667, 2);
      lastFrame = now;

      // Smooth mouse flow interpolation
      mouseFlow.smoothNormX += (mouseFlow.normX - mouseFlow.smoothNormX) * 0.04;
      mouseFlow.smoothNormY += (mouseFlow.normY - mouseFlow.smoothNormY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const isDark = (document.documentElement.dataset.theme === 'dark');

      if (isDark) {
        // 🌙 Dark Theme: ONLY Serene Meteors & Subtle Starfield
        if (starField) starField.updateAndDraw(ctx, time);
        for (let i = 0; i < meteors.length; i++) {
          meteors[i].update(delta);
          meteors[i].draw(ctx);
        }
      } else {
        // ☀️ Light Theme: Flexible constellation fragments with gentle parallax.
        if (constellationField) constellationField.updateAndDraw(ctx, time);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      if ((document.documentElement.dataset.theme === 'dark')) {
        if (starField) starField.updateAndDraw(ctx, 1.0);
      } else if (constellationField) {
        constellationField.updateAndDraw(ctx, 1.0);
      }
    };

    const startAnimation = () => {
      if (document.hidden) return;
      if (motionQuery.matches) {
        drawStaticFrame();
        return;
      }
      if (!animationFrameId) {
        isVisible = true;
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      isVisible = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleResize = () => {
      resize();
      if (motionQuery.matches) drawStaticFrame();
    };

    const handleMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        stopAnimation();
        drawStaticFrame();
      } else if (isHeroIntersecting) {
        startAnimation();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('caelis:themechange', () => {
      if (motionQuery.matches) drawStaticFrame();
    });

    motionQuery.addEventListener('change', handleMotionPreferenceChange);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAnimation();
      else if (isHeroIntersecting) startAnimation();
    });
    startAnimation();

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isHeroIntersecting = entry.isIntersecting;
          if (isHeroIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      }, { threshold: 0.05 });

      observer.observe(heroSection);
    }
  };

  initHeroCelestialCanvas();
