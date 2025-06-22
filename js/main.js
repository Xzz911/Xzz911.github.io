// ✅ 修改你的 main.js 使绳子从页面顶端开始出现

const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],

            // 进度条高度
            ropeHeight: 0,
            // 绳子顶部位置，初始为 0
            ropeTop: 0,
            // 控制绳子显示
            ropeVisible: false,
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
        
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
        
            this.scrollTop = newScrollTop;
        
            // 计算文档滚动百分比（0~1）
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = newScrollTop / docHeight;
        
            // 绳子显示条件：滚动值 > 0
            this.ropeVisible = newScrollTop > 0;
        
            // 设置绳子高度（占 80% 高度）
            this.ropeHeight = Math.min(Math.max(scrolled * window.innerHeight * 0.8, 20), window.innerHeight * 0.8);
        
            // 设置绳子顶部位置为 0px，使其从页面顶端出现
            this.ropeTop = 0;
        
            // ✅ 更新百分比文字
            const percentDisplay = document.getElementById('rope-percent');
            if (percentDisplay) {
                const percent = (newScrollTop / docHeight) * 100;
                percentDisplay.innerText = percent.toFixed(1) + '%';
            }
        },
        
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
});

app.mount("#layout");
