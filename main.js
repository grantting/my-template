// main.js

// 动态加载 Vue
const vueScript = document.createElement('script');
vueScript.src = 'https://unpkg.com/vue@next';
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
        const { createApp } = Vue;

        // 创建 Vue 应用实例
        const app = createApp({
            data() {
                return {
                    message: 'Hello, TDesign!'
                };
            },
            template: `
        <div>
          <h1>{{ message }}</h1>
          <t-button variant="base" theme="primary">这是一个 TDesign 按钮</t-button>
        </div>
      `
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