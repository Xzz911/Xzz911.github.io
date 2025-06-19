// glow.js - 粒子荧光点效果
(function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let W = window.innerWidth;
    let H = window.innerHeight;
  
    canvas.width = W;
    canvas.height = H;
    canvas.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      pointer-events: none;
      z-index: 999;
    `;
    document.body.appendChild(canvas);
  
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5,
      });
    }
  
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(0,255,255,0.8)";
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
  
        // 边界反弹
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      requestAnimationFrame(draw);
    }
  
    draw();
  })();
  