/**
 * 应用配置常量
 */
export const APP_CONFIG = {
    TYPEWRITER: {
        DELAY: 30,
        CURSOR: '▌',
    },
    PAGE: {
        SWITCH_DELAY: 1000,
        PRINT_DELAY: 100,
        PRINT_WINDOW_DELAY: 200,
        PAGE_DRAW_DELAY: 800,
        CONTENT_START_DELAY: 500,
        HEIGHT: 1123,
        WIDTH: 794,
    },
    SELECTORS: {
        PAGE1: 'page1',
        PAGE2: 'page2',
        PRINT_BTN: 'print-btn',
        SKIP_BTN: 'skip-btn',
        RESUME_PAGES: 'resume-pages',
        CONTROLS: 'controls',
    },
} as const;

/**
 * A4 纸张尺寸（像素，96 DPI）
 */
export const A4_SIZE = {
    WIDTH: 794,
    HEIGHT: 1123,
} as const;

