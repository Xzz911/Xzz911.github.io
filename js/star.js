// star.js - 星星拖尾 + 下落动画 + 尾巴残影
(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
  
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);
  
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
  
    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  
    function Star(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = Math.random() * -1 - 1;
      this.gravity = 0.05 + Math.random() * 0.05;
      this.alpha = 1;
      this.size = Math.random() * 2 + 2;
      this.angle = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 2;
      this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`;
      this.trail = []; // 轨迹数组
    }
  
    Star.prototype.update = function () {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.rotationSpeed;
      this.alpha -= 0.015;
  
      // 更新轨迹，最多保留 8 个点
      this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
      if (this.trail.length > 8) this.trail.shift();
    };
  
    Star.prototype.draw = function () {
      // 绘制拖尾轨迹
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        const fade = t.alpha * (i / this.trail.length);
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.globalAlpha = fade;
        ctx.fillStyle = this.color;
        drawStar(0, 0, 5, this.size * (i / this.trail.length), (this.size / 2) * (i / this.trail.length));
        ctx.restore();
      }
  
      // 绘制主星
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      drawStar(0, 0, 5, this.size, this.size / 2);
      ctx.restore();
      ctx.globalAlpha = 1;
    };
  
    function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;
  
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
  
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.closePath();
      ctx.fill();
    }
  
    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.update();
        if (s.alpha <= 0 || s.y > h + 50) {
          stars.splice(i--, 1);
        } else {
          s.draw();
        }
      }
      requestAnimationFrame(animate);
    }
  
    animate();
  
    document.addEventListener('mousemove', function (e) {
      for (let i = 0; i < 3; i++) {
        stars.push(new Star(e.clientX, e.clientY));
      }
    });
  })();
  