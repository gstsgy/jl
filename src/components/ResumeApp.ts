import { APP_CONFIG } from '../config/constants';
import { printResume } from '../utils/print-utils';
import { renderHeader, renderLeftColumn, renderRightColumn } from '../utils/render-utils';
import { leftColumnData, rightColumnData } from '../data/resume-data';

/**
 * 简历应用主类
 */
export class ResumeApp {
    private resumePages: HTMLElement;
    private printBtn: HTMLElement;
    private controls: HTMLElement;
    private isTypingComplete = false;
    private pageElements: HTMLElement[] = [];
    private pageContents: string[] = [];

    constructor() {
        const resumePagesEl = document.getElementById(APP_CONFIG.SELECTORS.RESUME_PAGES);
        const printBtnEl = document.getElementById(APP_CONFIG.SELECTORS.PRINT_BTN);
        const controlsEl = document.getElementById(APP_CONFIG.SELECTORS.CONTROLS);

        if (!resumePagesEl || !printBtnEl || !controlsEl) {
            throw new Error('Required DOM elements not found');
        }

        this.resumePages = resumePagesEl;
        this.printBtn = printBtnEl;
        this.controls = controlsEl;

        this.initApp();
    }

    /**
     * 初始化应用
     */
    private initApp(): void {
        // 开始逐步构建界面
        this.buildInterface();
        this.setupEventListeners();
    }

    /**
     * 逐步构建界面
     */
    private buildInterface(): void {
        this.buildPages();
        this.resumePages.innerHTML = '';
        this.pageElements.forEach(page => {
            this.resumePages.appendChild(page);
        });
        this.resumePages.style.display = 'flex';
        this.resumePages.style.flexDirection = 'column';
        this.resumePages.style.gap = '20px';

        this.pageContents = this.pageElements.map(page => page.outerHTML);
        this.isTypingComplete = true;
        this.showControls();

    }

    /**
     * 根据实际高度构建页面
     */
    private buildPages(): void {
        this.pageElements = [];

        const staging = document.createElement('div');
        staging.style.position = 'absolute';
        staging.style.visibility = 'hidden';
        staging.style.pointerEvents = 'none';
        staging.style.width = `${APP_CONFIG.PAGE.WIDTH}px`;
        staging.style.top = '0';
        staging.style.left = '0';
        document.body.appendChild(staging);

        const rightSections = this.getRightSections();
        let pageIndex = 1;
        let currentPage = this.createPage(pageIndex, true);
        staging.appendChild(currentPage);

        const leftColumnEl = this.htmlToElement(renderLeftColumn(leftColumnData));
        const contentEl = currentPage.querySelector('.resume-content') as HTMLElement;
        const rightContainer = contentEl.querySelector('.resume-right-column') as HTMLElement;
        contentEl.insertBefore(leftColumnEl, rightContainer);
        rightSections.forEach(section => {
            rightContainer.appendChild(section);
            // if (currentPage.scrollHeight > APP_CONFIG.PAGE.HEIGHT) {
            //     rightContainer.removeChild(section);
            //     this.pageElements.push(currentPage);
            //     pageIndex++;
            //     currentPage = this.createPage(pageIndex, false);
            //     staging.appendChild(currentPage);
            //     const nextRight = currentPage.querySelector('.resume-right-column') as HTMLElement;
            //     nextRight.appendChild(section);
            // }
        });

        this.pageElements.push(currentPage);
        document.body.removeChild(staging);

        this.pageElements.forEach(page => {
            page.classList.add('resume-page-visible');
        });
    }

    /**
     * 显示控制按钮
     */
    private showControls(): void {
        this.controls.style.display = 'flex';
        setTimeout(() => {
            this.controls.classList.add('controls-visible');
        }, 100);
    }

    /**
     * 设置事件监听器
     */
    private setupEventListeners(): void {
        this.printBtn.addEventListener('click', () => this.handlePrint());
    }

    /**
     * 处理打印
     */
    private handlePrint(): void {
        // 先确保所有内容都显示
        if (!this.isTypingComplete) {
            this.isTypingComplete = true;
            this.showControls();
        }

        setTimeout(() => {
            const allContent = this.pageElements.map(page => page.outerHTML).join('');
            printResume(allContent, '', '胡军军的简历');
        }, APP_CONFIG.PAGE.PRINT_DELAY);
    }

    /**
     * 创建页面模板
     */
    private createPage(pageNumber: number, includeLeft: boolean): HTMLElement {
        const pageEl = document.createElement('div');
        pageEl.className = 'resume-page';

        const indicator = this.htmlToElement(`<div class="page-indicator">第${pageNumber}页</div>`);
        pageEl.appendChild(indicator);

        if (includeLeft) {
            pageEl.appendChild(this.htmlToElement(renderHeader()));
        }

        const content = document.createElement('div');
        content.className = includeLeft ? 'resume-content' : 'resume-content single-column';
        pageEl.appendChild(content);

        const rightColumn = document.createElement('div');
        rightColumn.className = includeLeft ? 'resume-right-column' : 'resume-right-column single';
        content.appendChild(rightColumn);

        return pageEl;
    }

    /**
     * 获取右侧所有 section 元素
     */
    private getRightSections(): HTMLElement[] {
        const rightHtml = renderRightColumn(rightColumnData);
        const wrapper = this.htmlToElement(rightHtml);
        if (!wrapper) return [];
        // @ts-ignore
        return Array.from(wrapper.children).map(child => child.cloneNode(true) as HTMLElement);
    }

    /**
     * 将 HTML 字符串转换为元素
     */
    private htmlToElement(html: string): HTMLElement {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild as HTMLElement;
    }

}
