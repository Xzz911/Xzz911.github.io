jQuery(function($) {
    var a_idx = 0;

    $("body").on("click", function(e) {
        var a = [
            "富强", "民主", "文明", "和谐",
            "自由", "平等", "公正", "法治",
            "爱国", "敬业", "诚信", "友善"
        ];

        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;

        // 使用 pageX / pageY 直接定位整个页面坐标
        var x = e.pageX;
        var y = e.pageY;

        $i.css({
            "position": "fixed", // ✅ 修正：使用 fixed 保证全局坐标参考
            "top": (e.clientY - 20) + "px", // ✅ 使用 clientY 保证不随滚动变化
            "left": (e.clientX) + "px",
            "font-weight": "bold",
            "color": "rgb(" + Math.floor(Math.random() * 256) + "," + 
                             Math.floor(Math.random() * 256) + "," + 
                             Math.floor(Math.random() * 256) + ")",
            "z-index": 9999,
            "user-select": "none",
            "pointer-events": "none"
        });

        $("body").append($i);

        $i.animate({
            "top": (e.clientY - 180) + "px",
            "opacity": 0
        }, 3000, function() {
            $i.remove();
        });
    });
});
