document.querySelectorAll('.loop').forEach(el => {
    // 捕获阶段先阻止所有事件，避免冒泡到主题绑定的弹图事件
    el.addEventListener('click', function(e) {
      e.stopImmediatePropagation(); // 阻止后续同元素的其他事件监听器执行
      e.preventDefault();            // 阻止默认行为
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 置顶
    }, true); // 注意第三个参数true，表示在捕获阶段监听
  });
  