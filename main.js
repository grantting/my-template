// main.js

// 动态加载 Vue
const vueScript = document.createElement('script');
vueScript.src = 'https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.prod.js'; // 使用具体的版本
document.head.appendChild(vueScript);

// 等待 Vue 加载完成
vueScript.onload = () => {
    // 动态加载 TDesign 的 JavaScript 文件
    const tdesignScript = document.createElement('script');
    tdesignScript.src = 'https://unpkg.com/tdesign-vue-next/dist/tdesign.min.js';
    document.head.appendChild(tdesignScript);

    // 等待 TDesign 加载完成
    tdesignScript.onload = () => {
        // Vue 和 TDesign 都已加载完成，可以创建 Vue 应用了
        const { createApp, ref } = Vue;

        // 创建 Vue 应用实例
        const app = createApp({
            setup() {
                // 定义响应式变量
                const 问题 = ref('这是一个示例问题');
                const Deck = ref('这是一个示例牌组');
                const Tags = ref(['标签1', '标签2', '标签3']);

                return {
                    问题,
                    Deck,
                    Tags
                };
            }
        });

        // 注册 TDesign 组件
        app.use(TDesign);

        // 挂载应用
        app.mount('#app');
    };

    // 处理 TDesign 加载失败的情况
    tdesignScript.onerror = (error) => {
        console.error('Failed to load TDesign:', error);
    };
};

// 处理 Vue 加载失败的情况
vueScript.onerror = (error) => {
    console.error('Failed to load Vue:', error);
};