import { ResumeApp } from './components/ResumeApp';
import MatrixRain from './components/bg';
import { APP_CONFIG } from './config/constants';

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ResumeApp({
            enableTypewriter: APP_CONFIG.TYPEWRITER.ENABLED
        });
        new MatrixRain();
    } catch (error) {
        console.error('Failed to initialize ResumeApp:', error);
    }
});
