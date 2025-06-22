// 鼠标粒子尾随特效（淡色圆点拖尾）
document.addEventListener("mousemove", function (e) {
    let dot = document.createElement("div");
    dot.className = "cursor-dot";

    const x = e.clientX;
    const y = e.clientY;

    dot.style.left = x + "px";
    dot.style.top = y + "px";

    // 固定定位，避免滚动错位
    dot.style.position = "fixed";

    document.documentElement.appendChild(dot);

    setTimeout(() => dot.remove(), 1000);
});

const style = document.createElement("style");
style.innerHTML = `
.cursor-dot {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -100%);
    z-index: 999999;
    animation: fadeDot 1s ease-out forwards;
    position: fixed; /* 保证和JS中一致 */
}
@keyframes fadeDot {
    0% { transform: scale(1) translate(-50%, -100%); opacity: 1; }
    100% { transform: scale(2) translate(-50%, -100%); opacity: 0; }
}`;
document.head.appendChild(style);
