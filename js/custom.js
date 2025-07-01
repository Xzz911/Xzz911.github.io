document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;
    const saved = localStorage.getItem("theme");
  
    // ✅ 默认使用暗黑模式
    const defaultTheme = "dark";
  
    if (saved) {
      html.setAttribute("data-theme", saved);
    } else {
      html.setAttribute("data-theme", defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }
  
    // ✅ 如果你有“切换按钮”，也支持点击切换
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });
    }
  });

  document.querySelectorAll('pre code').forEach((block) => {
    const pre = block.parentElement;
    if (!block.className.includes('language-')) {
      block.classList.add('language-none');
    }
    pre.classList.add('line-numbers');
  });
  
  