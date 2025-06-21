// 鼠标粒子尾随特效（淡色圆点拖尾）
document.addEventListener("mousemove", function (e) {
    let dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.style.left = e.pageX + "px";
    dot.style.top = e.pageY + "px";
    document.body.appendChild(dot);

    setTimeout(() => dot.remove(), 1000);
});

const style = document.createElement("style");
style.innerHTML = `
.cursor-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    animation: fadeDot 1s ease-out forwards;
}
@keyframes fadeDot {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
}`;
document.head.appendChild(style);
