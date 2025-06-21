(function() {
    const words = [
      "富强","民主","文明","和谐",
      "自由","平等","公正","法治",
      "爱国","敬业","诚信","友善"
    ];
    let idx = 0;
  
    document.addEventListener("click", function(e) {
      const span = document.createElement("span");
      span.textContent = words[idx];
      idx = (idx + 1) % words.length;
  
      const x = e.clientX;
      const y = e.clientY;
  
      // 关键：使用 fixed + transform 核心定位
      span.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -100%);
        font-size: 16px;
        font-weight: bold;
        color: rgb(${~~(255*Math.random())},${~~(255*Math.random())},${~~(255*Math.random())});
        z-index: 999999;
        user-select: none;
        pointer-events: none;
        opacity: 1;
        transition: transform 2s ease-out, opacity 2s ease-out;
      `;
      document.documentElement.appendChild(span);
  
      // 延迟触发样式变化以启动过渡动画
      requestAnimationFrame(() => {
        span.style.transform = 'translate(-50%, -200px) scale(1.2)';
        span.style.opacity = '0';
      });
  
      setTimeout(() => span.remove(), 2000);
    }, true);
  })();
  