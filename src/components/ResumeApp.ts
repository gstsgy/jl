import type Typewriter from 'typewriter-effect/dist/core';
import startTypewriter from '../core';
import { NodeM } from '../core/model';
import { APP_CONFIG } from '../config/constants';
import { printResume } from '../utils/print-utils';
import { renderHeader, renderLeftColumn, renderRightColumn, renderRightColumn2 } from '../utils/render-utils';
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
    private typewriterInstance: Typewriter | null = null;
    private typingHost: HTMLElement | null = null;

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
        this.controls.style.display = 'none';
        this.controls.classList.remove('controls-visible');
        this.buildPages();
        this.resumePages.style.display = 'flex';
        this.resumePages.style.flexDirection = 'column';
        this.resumePages.style.gap = '20px';

        this.pageContents = this.pageElements.map(page => page.outerHTML);
        this.isTypingComplete = false;
        this.startTypewriterEffect();
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
        let pageIndex = 1;
        const rightSections = this.getRightSections(pageIndex);
        
        let currentPage = this.createPage(pageIndex, true);
        staging.appendChild(currentPage);

        const leftColumnEl = this.htmlToElement(renderLeftColumn(leftColumnData, pageIndex));
        const contentEl = currentPage.querySelector('.resume-content') as HTMLElement;
        const rightContainer = contentEl.querySelector('.resume-right-column') as HTMLElement;
        contentEl.insertBefore(leftColumnEl, rightContainer);
        rightSections.forEach(section => {
            rightContainer.appendChild(section);
        });
        this.pageElements.push(currentPage);
        // 渲染第二页
        pageIndex++;
        const rightSections2 = this.getRightSections(pageIndex);
        currentPage = this.createPage(pageIndex, true);
        staging.appendChild(currentPage);
        const leftColumnEl2 = this.htmlToElement(renderLeftColumn(leftColumnData, pageIndex));
        const contentEl2 = currentPage.querySelector('.resume-content') as HTMLElement;
        const rightContainer2 = contentEl2.querySelector('.resume-right-column') as HTMLElement;
        contentEl2.insertBefore(leftColumnEl2, rightContainer2);
        rightSections2.forEach(section => {
            rightContainer2.appendChild(section);
        });
        // const rightColumnEl = this.htmlToElement(renderRightColumn(rightColumnData));
        // currentPage.querySelector('.resume-right-column')?.appendChild(leftColumnEl2);
        // currentPage.querySelector('.resume-right-column')?.appendChild(rightColumnEl);
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
        this.ensureTypingComplete();

        setTimeout(() => {
            const allContent = this.resumePages.innerHTML || this.pageContents.join('');
            printResume(allContent, '', '古月的简历');
        }, APP_CONFIG.PAGE.PRINT_DELAY);
    }

    /**
     * 启动打字机效果
     */
    private startTypewriterEffect(): void {
        if (this.pageContents.length === 0) {
            this.renderStaticPages();
            this.isTypingComplete = true;
            this.showControls();
            return;
        }

        this.typingHost = document.createElement('div');
        this.typingHost.className = 'typewriter-host';
        this.resumePages.innerHTML = '';
        this.resumePages.appendChild(this.typingHost);

        const nodes: NodeM[] = this.pageContents.map(content => ({
            value: content,
            stp: APP_CONFIG.PAGE.PAGE_DRAW_DELAY
        }));

        const lastIndex = nodes.length - 1;
        nodes[lastIndex] = {
            ...nodes[lastIndex],
            callFunction: () => this.handleTypewriterComplete()
        };

        this.typewriterInstance = startTypewriter(this.typingHost, nodes, {
            delay: APP_CONFIG.TYPEWRITER.DELAY,
            cursor: APP_CONFIG.TYPEWRITER.CURSOR
        });
    }

    /**
     * 清理打字机状态并渲染静态页面
     */
    private handleTypewriterComplete(): void {
        this.cleanupTypewriterArtifacts();
        this.renderStaticPages();
        this.isTypingComplete = true;
        this.showControls();
    }

    /**
     * 立即完成打字机效果
     */
    private ensureTypingComplete(): void {
        if (this.isTypingComplete) {
            return;
        }
        this.cleanupTypewriterArtifacts();
        this.renderStaticPages();
        this.isTypingComplete = true;
        this.showControls();
    }

    /**
     * 渲染预构建页面
     */
    private renderStaticPages(): void {
        this.resumePages.innerHTML = '';
        this.pageElements.forEach(page => {
            this.resumePages.appendChild(page);
        });
        this.pageContents = this.pageElements.map(page => page.outerHTML);
    }

    /**
     * 移除打字机插入的元素并停止动画
     */
    private cleanupTypewriterArtifacts(): void {
        if (this.typewriterInstance) {
            this.typewriterInstance.stop();
            this.typewriterInstance = null;
        }
        if (this.typingHost && this.typingHost.parentElement === this.resumePages) {
            this.resumePages.removeChild(this.typingHost);
        }
        this.typingHost = null;
    }

    /**
     * 创建页面模板
     */
    private createPage(pageNumber: number, includeLeft: boolean): HTMLElement {
        const pageEl = document.createElement('div');
        pageEl.className = 'resume-page';

        const indicator = this.htmlToElement(`<div class="page-indicator">第${pageNumber}页</div>`);
        pageEl.appendChild(indicator);

        if (pageNumber==1) {
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
    private getRightSections(page: number): HTMLElement[] {
        const rightHtml = page === 1 ? renderRightColumn(rightColumnData) : renderRightColumn2(rightColumnData);
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
