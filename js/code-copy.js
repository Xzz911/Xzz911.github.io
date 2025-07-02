document.addEventListener("DOMContentLoaded", function () { 
    document.querySelectorAll("figure.highlight").forEach(function (block) { 
      if (block.querySelector(".custom-code-toolbar")) return;
  
      let lang = block.querySelector("code")?.className?.match(/language-(\w+)/)?.[1];
      if (!lang) {
        const figureClasses = block.className.split(/\s+/);
        lang = figureClasses.find(c => c !== "highlight") || "code";
      }
      lang = lang.toLowerCase();
  
      const toolbar = document.createElement("div");
      toolbar.className = "custom-code-toolbar";
  
      // 左侧圆点
      const dots = document.createElement("div");
      dots.className = "custom-code-dots";
      dots.innerHTML = `
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      `;
  
      // 居中语言名
      const langLabel = document.createElement("span");
      langLabel.className = "code-lang-label";
      langLabel.innerText = lang;
  
      // 右侧按钮：复制 + 收缩
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.title = "点击复制代码";
      copyBtn.innerHTML = `<i class="fas fa-copy"></i>`;
  
      copyBtn.addEventListener("click", () => {
        const code = block.querySelector("pre");
        if (!code) return;
        navigator.clipboard.writeText(code.innerText).then(() => {
          copyBtn.innerHTML = `<i class="fas fa-check"></i>`;
          copyBtn.title = "复制成功";
          setTimeout(() => {
            copyBtn.innerHTML = `<i class="fas fa-copy"></i>`;
            copyBtn.title = "点击复制代码";
          }, 1500);
        }).catch(() => {
          copyBtn.innerHTML = `<i class="fas fa-times"></i>`;
          copyBtn.title = "复制失败";
          setTimeout(() => {
            copyBtn.innerHTML = `<i class="fas fa-copy"></i>`;
            copyBtn.title = "点击复制代码";
          }, 1500);
        });
      });
  
      const collapseBtn = document.createElement("button");
      collapseBtn.className = "collapse-btn";
      collapseBtn.title = "收起代码";
      collapseBtn.innerHTML = `<i class="fas fa-angle-up"></i>`;
  
      collapseBtn.addEventListener("click", () => {
        const pre = block.querySelector("pre");
        if (!pre) return;
        if (pre.style.display === "none") {
          pre.style.display = "";
          collapseBtn.innerHTML = `<i class="fas fa-angle-up"></i>`;
          collapseBtn.title = "收起代码";
        } else {
          pre.style.display = "none";
          collapseBtn.innerHTML = `<i class="fas fa-angle-down"></i>`;
          collapseBtn.title = "展开代码";
        }
      });
  
      // 组装工具栏三部分
      toolbar.appendChild(dots);
      toolbar.appendChild(langLabel);
      const rightGroup = document.createElement("div");
      rightGroup.className = "right-group";
      rightGroup.appendChild(copyBtn);
      rightGroup.appendChild(collapseBtn);
      toolbar.appendChild(rightGroup);
  
      block.insertBefore(toolbar, block.firstChild);
    });
  });
  