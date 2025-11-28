import { APP_CONFIG } from '../config/constants';
import exportResume, {printResume} from '../utils/print-utils';
import { renderHeader, renderLeftColumn, renderRightColumn, renderRightColumn2 } from '../utils/render-utils';
import { leftColumnData, rightColumnData } from '../data/resume-data';

interface ResumeAppOptions {
    enableTypewriter?: boolean;
}

/**
 * 简历应用主类
 */
export class ResumeApp {
    private resumePages: HTMLElement;
    private printBtn: HTMLElement;
    private exportBtn: HTMLElement;
    private controls: HTMLElement;
    private isTypingComplete = false;
    private pageElements: HTMLElement[] = [];
    private pageContents: string[] = [];
    private typingHost: HTMLElement | null = null;
    private typingQueue: HTMLElement[] = [];
    private typingTimer: number | null = null;
    private readonly enableTypewriter: boolean;

    constructor(options: ResumeAppOptions = {}) {
        const resumePagesEl = document.getElementById(APP_CONFIG.SELECTORS.RESUME_PAGES);
        const printBtnEl = document.getElementById(APP_CONFIG.SELECTORS.PRINT_BTN);
        const exportBtn = document.getElementById(APP_CONFIG.SELECTORS.EXPORT_BTN);
        const controlsEl = document.getElementById(APP_CONFIG.SELECTORS.CONTROLS);

        if (!resumePagesEl || !printBtnEl || !controlsEl||!exportBtn) {
            throw new Error('Required DOM elements not found');
        }

        this.resumePages = resumePagesEl;
        this.printBtn = printBtnEl;
        this.exportBtn = exportBtn;
        this.controls = controlsEl;
        this.enableTypewriter = options.enableTypewriter ?? APP_CONFIG.TYPEWRITER.ENABLED;

        this.initApp();
    }

    /**
     * 初始化应用
     */
    private initApp(): void {
        this.showBootAnimation().then(() => {
            this.buildInterface();
            this.setupEventListeners();
        });
    }

    /**
     * 显示启动动画
     */
    private async showBootAnimation(): Promise<void> {
        return new Promise((resolve) => {
            // 创建启动遮罩层
            const bootScreen = document.createElement('div');
            bootScreen.className = 'boot-screen';
            bootScreen.innerHTML = `
                <div class="boot-terminal">
                    <div class="boot-header">Resume OS v1.0</div>
                    <div class="boot-output" id="bootOutput"></div>
                    <div class="boot-cursor">$ <span class="boot-command"></span><span class="cursor">|</span></div>
                </div>
            `;

            document.body.appendChild(bootScreen);

            const output = bootScreen.querySelector('#bootOutput') as HTMLElement;
            const command = bootScreen.querySelector('.boot-command') as HTMLElement;

            const bootSequence = [
                { text: 'Booting Resume System...', delay: 800 },
                { text: 'Loading personal data...', delay: 600 },
                { text: 'Initializing skills matrix...', delay: 500 },
                { text: 'Mounting experience modules...', delay: 400 },
                { text: 'Starting typewriter engine...', delay: 300 },
                { text: 'READY.', delay: 200 }
            ];

            this.animateBootSequence(bootSequence, output, command, resolve, bootScreen);
        });
    }

    /**
     * 执行启动序列动画
     */
    private animateBootSequence(
        sequence: Array<{ text: string; delay: number }>,
        output: HTMLElement,
        command: HTMLElement,
        resolve: () => void,
        bootScreen: HTMLElement
    ): void {
        let index = 0;

        const typeText = (text: string, element: HTMLElement, callback: () => void) => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text[i];
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(callback, 200);
                }
            }, 50);
        };

        const nextStep = () => {
            if (index < sequence.length) {
                const step = sequence[index];
                const line = document.createElement('div');
                output.appendChild(line);

                typeText(step.text, line, () => {
                    index++;
                    setTimeout(nextStep, step.delay);
                });
            } else {
                // 显示最后命令
                typeText('./start_resume.sh', command, () => {
                    setTimeout(() => {
                        bootScreen.classList.add('boot-complete');
                        setTimeout(() => {
                            document.body.removeChild(bootScreen);
                            resolve();
                        }, 500);
                    }, 800);
                });
            }
        };

        nextStep();
    }
    // /**
    //  * 初始化应用
    //  */
    // private initApp(): void {
    //     // 开始逐步构建界面
    //     this.buildInterface();
    //     this.setupEventListeners();
    // }

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
        this.exportBtn.addEventListener('click', () => this.exportPdf());

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

    private exportPdf(): void {
        this.ensureTypingComplete();
        setTimeout(() => {
            const allContent = this.resumePages.innerHTML || this.pageContents.join('');
            exportResume(allContent, '', '古月的简历');
        }, APP_CONFIG.PAGE.PRINT_DELAY);
    }

    /**
     * 启动打字机效果
     */
    private startTypewriterEffect(): void {
        if (!this.enableTypewriter || this.pageContents.length === 0) {
            this.renderStaticPages();
            this.isTypingComplete = true;
            this.showControls();
            return;
        }

        this.clearTypingTimer();
        this.typingQueue = [];
        this.typingHost = document.createElement('div');
        this.typingHost.className = 'typewriter-host';
        this.resumePages.innerHTML = '';
        this.resumePages.appendChild(this.typingHost);

        this.pageElements.forEach(page => {
            const clone = page.cloneNode(true) as HTMLElement;
            const targets = this.prepareTypingTargets(clone);
            this.typingQueue.push(...targets);
            this.typingHost?.appendChild(clone);
        });

        if (this.typingQueue.length === 0) {
            this.handleTypewriterComplete();
            return;
        }

        this.typingTimer = window.setInterval(
            () => this.revealNextBatch(),
            APP_CONFIG.TYPEWRITER.STEP_DELAY
        );
    }

    /**
     * 清理打字机状态并渲染静态页面
     */
    private handleTypewriterComplete(): void {
        this.clearTypingTimer();
        this.typingQueue = [];
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
        this.revealAllTypingTargets();
        this.clearTypingTimer();
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
        this.typingHost = null;
    }

    /**
     * 准备需要逐步显示的元素
     */
    private prepareTypingTargets(page: HTMLElement): HTMLElement[] {
        const selectors = [
            '.page-indicator',
            '.resume-header',
            '.resume-left-column > *',
            '.resume-right-column > *',
            '.section-card',
            '.info-item',
            '.skills-list li',
            '.education-item',
            '.work-item',
            '.project-item',
            '.work-description li',
            '.project-description li'
        ];

        const targetSet = new Set<HTMLElement>();
        selectors.forEach(selector => {
            page.querySelectorAll(selector).forEach(node => {
                targetSet.add(node as HTMLElement);
            });
        });

        const orderedTargets: HTMLElement[] = [];
        const allElements = page.querySelectorAll<HTMLElement>('*');
        allElements.forEach(element => {
            if (targetSet.has(element)) {
                element.classList.add('typing-hidden', 'typing-animated');
                orderedTargets.push(element);
            }
        });

        return orderedTargets;
    }

    /**
     * 逐批显示元素
     */
    private revealNextBatch(): void {
        const batchSize = APP_CONFIG.TYPEWRITER.BATCH_SIZE;
        for (let i = 0; i < batchSize; i++) {
            const target = this.typingQueue.shift();
            if (!target) {
                break;
            }
            target.classList.remove('typing-hidden');
        }

        if (this.typingQueue.length === 0) {
            this.handleTypewriterComplete();
        }
    }

    /**
     * 确保所有待显示元素立即可见
     */
    private revealAllTypingTargets(): void {
        if (!this.typingQueue.length) {
            return;
        }

        this.typingQueue.forEach(target => target.classList.remove('typing-hidden'));
        this.typingQueue = [];
    }

    /**
     * 清理计时器
     */
    private clearTypingTimer(): void {
        if (this.typingTimer !== null) {
            window.clearInterval(this.typingTimer);
            this.typingTimer = null;
        }
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
