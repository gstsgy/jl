import { RightColumnData } from '../types';
import { renderHeader, renderLeftColumn, renderRightColumn, renderPage } from './render-utils';
import { leftColumnData, rightColumnData } from '../data/resume-data';

/**
 * 页面分割器 - 将内容动态分配到多个页面
 */
export class PageSplitter {
    private readonly pageHeight = 1123; // A4高度
    private readonly headerHeight = 240; // Header高度
    private readonly contentPadding = 60; // 内容区域上下padding
    private readonly availableHeight: number;

    constructor() {
        this.availableHeight = this.pageHeight - this.headerHeight - this.contentPadding;
    }

    /**
     * 分割内容到多个页面
     */
    splitIntoPages(): string[] {
        const pages: string[] = [];
        
        // 第一页：Header + 左侧栏 + 右侧栏开始部分
        const header = renderHeader();
        const leftColumn = renderLeftColumn(leftColumnData);
        
        // 分割右侧内容
        const rightPages = this.splitRightColumn(rightColumnData);
        
        // 第一页
        const firstRightContent = rightPages[0];
        pages.push(renderPage(header, leftColumn, firstRightContent, 1));
        
        // 后续页面（只有右侧内容，无Header和左侧栏）
        for (let i = 1; i < rightPages.length; i++) {
            const rightContent = rightPages[i];
            pages.push(`
                <div class="page-indicator">第${i + 1}页</div>
                <div class="resume-content" style="padding-top: 40px;">
                    <div class="resume-left-column"></div>
                    <div class="resume-right-column">
                        ${rightContent}
                    </div>
                </div>
            `);
        }
        
        return pages;
    }

    /**
     * 分割右侧栏内容
     */
    private splitRightColumn(data: RightColumnData): string[] {
        const pages: string[] = [];
        let currentPage = '';
        let currentHeight = 0;
        let hasEducationTitle = false;
        let hasWorkTitle = false;
        let hasProjectTitle = false;

        // 教育背景
        if (data.education.length > 0) {
            const educationHtml = this.renderEducation(data.education);
            const educationHeight = this.estimateHeight(educationHtml);
            
            if (currentHeight + educationHeight > this.availableHeight && currentPage) {
                pages.push(currentPage);
                currentPage = '';
                currentHeight = 0;
                hasEducationTitle = false;
            }
            
            if (!hasEducationTitle) {
                currentPage += educationHtml;
                currentHeight += educationHeight;
                hasEducationTitle = true;
            }
        }

        // 工作经历
        if (data.workExperience.length > 0) {
            // 添加标题（如果还没有）
            if (!hasWorkTitle) {
                const titleHtml = '<div class="section-card"><h3 class="section-title"><i class="fas fa-building"></i> 工作经验</h3></div>';
                const titleHeight = this.estimateHeight(titleHtml);
                
                if (currentHeight + titleHeight > this.availableHeight && currentPage) {
                    pages.push(currentPage);
                    currentPage = '';
                    currentHeight = 0;
                }
                currentPage += titleHtml;
                currentHeight += titleHeight;
                hasWorkTitle = true;
            }

            for (const work of data.workExperience) {
                const workHtml = this.renderWorkItem(work, false);
                const workHeight = this.estimateHeight(workHtml);
                
                if (currentHeight + workHeight > this.availableHeight && currentPage) {
                    pages.push(currentPage);
                    currentPage = '';
                    currentHeight = 0;
                }
                currentPage += workHtml;
                currentHeight += workHeight;
            }
        }

        // 项目经验
        if (data.projects.length > 0) {
            // 添加标题（如果还没有）
            if (!hasProjectTitle) {
                const titleHtml = '<div class="section-card"><h3 class="section-title"><i class="fas fa-laptop-code"></i> 项目经验</h3></div>';
                const titleHeight = this.estimateHeight(titleHtml);
                
                if (currentHeight + titleHeight > this.availableHeight && currentPage) {
                    pages.push(currentPage);
                    currentPage = '';
                    currentHeight = 0;
                }
                currentPage += titleHtml;
                currentHeight += titleHeight;
                hasProjectTitle = true;
            }

            for (const project of data.projects) {
                const projectHtml = this.renderProjectItem(project, false);
                const projectHeight = this.estimateHeight(projectHtml);
                
                if (currentHeight + projectHeight > this.availableHeight && currentPage) {
                    pages.push(currentPage);
                    currentPage = '';
                    currentHeight = 0;
                }
                currentPage += projectHtml;
                currentHeight += projectHeight;
            }
        }

        if (currentPage) {
            pages.push(currentPage);
        }

        // 如果没有内容，至少返回一个空页面
        if (pages.length === 0) {
            pages.push('');
        }

        return pages;
    }

    /**
     * 渲染教育背景
     */
    private renderEducation(education: RightColumnData['education']): string {
        if (education.length === 0) return '';

        const educationHtml = education.map(edu => `
            <div class="education-item">
                <div class="education-period">${edu.period}</div>
                <div class="education-school">${edu.school}</div>
                <div class="education-major">${edu.major}</div>
                <div class="education-description">${edu.description}</div>
            </div>
        `).join('');

        return `
            <div class="section-card">
                <h3 class="section-title"><i class="fas fa-graduation-cap"></i> 教育背景</h3>
                ${educationHtml}
            </div>
        `;
    }

    /**
     * 渲染工作项
     */
    private renderWorkItem(work: RightColumnData['workExperience'][0], withCard: boolean = true): string {
        const descHtml = work.description.map(desc => `<li>${desc}</li>`).join('');
        const content = `
            <div class="work-item">
                <div class="work-header">
                    <div class="work-position">
                        <i class="fas fa-briefcase"></i>
                        ${work.position}
                    </div>
                    <span class="work-period">${work.period}</span>
                </div>
                <div class="work-company">${work.company}</div>
                <ul class="work-description">
                    ${descHtml}
                </ul>
            </div>
        `;
        
        return withCard ? `<div class="section-card">${content}</div>` : content;
    }

    /**
     * 渲染项目项
     */
    private renderProjectItem(project: RightColumnData['projects'][0], withCard: boolean = true): string {
        const descHtml = project.description.map(desc => `<li>${desc}</li>`).join('');
        const content = `
            <div class="project-item">
                <div class="project-header">
                    <div class="project-name">
                        <i class="fas fa-project-diagram"></i>
                        ${project.name}
                    </div>
                    <span class="project-period">${project.period}</span>
                </div>
                <div class="project-role">${project.role}</div>
                <ul class="project-description">
                    ${descHtml}
                </ul>
            </div>
        `;
        
        return withCard ? `<div class="section-card">${content}</div>` : content;
    }

    /**
     * 估算内容高度（像素）
     */
    private estimateHeight(html: string): number {
        // 简单的估算：每行约20px，每个段落/列表项约30-40px
        const lines = html.split('\n').length;
        const listItems = (html.match(/<li>/g) || []).length;
        const sections = (html.match(/<div class="section-card">/g) || []).length;
        
        return lines * 5 + listItems * 25 + sections * 50;
    }
}

