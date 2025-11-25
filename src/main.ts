import { ResumeApp } from './components/ResumeApp';
import MatrixRain from "./components/bg";
// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ResumeApp();
        new MatrixRain();
    } catch (error) {
        console.error('Failed to initialize ResumeApp:', error);
    }
});
