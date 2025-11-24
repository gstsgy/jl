import { ResumeApp } from './components/ResumeApp';

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ResumeApp();
    } catch (error) {
        console.error('Failed to initialize ResumeApp:', error);
    }
});
