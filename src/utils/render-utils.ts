import { LeftColumnData, RightColumnData, EducationItem, WorkExperienceItem, ProjectItem } from '../types';
import { headerData } from '../data/resume-data';

/**
 * 渲染Header
 */
export function renderHeader(): string {
    return `
        <div class="resume-header">
            <div class="resume-header-content">
                <h1>${headerData.name}</h1>
                <p class="motto">${headerData.motto}</p>
            </div>
            <div class="avatar-placeholder">
                <i class="fas fa-user"></i>
            </div>
        </div>
    `;
}

/**
 * 渲染左侧栏
 */
export function renderLeftColumn(data: LeftColumnData): string {
    return `
        <div class="resume-left-column">
            ${renderBasicInfo(data.basicInfo)}
            ${renderSkills(data.skills)}
            ${renderSelfEvaluation(data.selfEvaluation)}
        </div>
    `;
}

/**
 * 渲染基本信息
 */
function renderBasicInfo(infoItems: LeftColumnData['basicInfo']): string {
    const itemsHtml = infoItems.map(item => `
        <div class="info-item">
            <i class="fas ${item.icon}"></i>
            <span class="info-item-label">${item.label}:</span>
            <span class="info-item-value">${item.value}</span>
        </div>
    `).join('');

    return `
        <div class="section-card">
            <h3><i class="fas fa-user-circle"></i> 基本信息</h3>
            ${itemsHtml}
        </div>
    `;
}

/**
 * 渲染技能列表
 */
function renderSkills(skills: string[]): string {
    const skillsHtml = skills.map(skill => `<li>${skill}</li>`).join('');

    return `
        <div class="section-card">
            <h3><i class="fas fa-code"></i> 主要技能</h3>
            <ul class="skills-list">
                ${skillsHtml}
            </ul>
        </div>
    `;
}

/**
 * 渲染自我评价
 */
function renderSelfEvaluation(text: string): string {
    return `
        <div class="section-card">
            <h3><i class="fas fa-comment-dots"></i> 自我评价</h3>
            <div class="self-evaluation">${text}</div>
        </div>
    `;
}

/**
 * 渲染右侧栏
 */
export function renderRightColumn(data: RightColumnData): string {
    return `
        <div class="resume-right-column">
            ${renderEducation(data.education)}
            ${renderWorkExperience(data.workExperience)}
            ${renderProjects(data.projects)}
        </div>
    `;
}

/**
 * 渲染教育背景
 */
function renderEducation(education: EducationItem[]): string {
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
 * 渲染工作经历
 */
function renderWorkExperience(workExp: WorkExperienceItem[]): string {
    if (workExp.length === 0) return '';

    const workHtml = workExp.map(work => {
        const descHtml = work.description.map(desc => `<li>${desc}</li>`).join('');
        return `
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
    }).join('');

    return `
        <div class="section-card">
            <h3 class="section-title"><i class="fas fa-building"></i> 工作经验</h3>
            ${workHtml}
        </div>
    `;
}

/**
 * 渲染项目经验
 */
function renderProjects(projects: ProjectItem[]): string {
    if (projects.length === 0) return '';

    const projectsHtml = projects.map(project => {
        const descHtml = project.description.map(desc => `<li>${desc}</li>`).join('');
        return `
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
    }).join('');

    return `
        <div class="section-card">
            <h3 class="section-title"><i class="fas fa-laptop-code"></i> 项目经验</h3>
            ${projectsHtml}
        </div>
    `;
}

/**
 * 渲染完整页面
 */
export function renderPage(header: string, leftColumn: string, rightColumn: string, pageNumber: number): string {
    return `
        <div class="page-indicator">第${pageNumber}页</div>
        ${header}
        <div class="resume-content">
            ${leftColumn}
            ${rightColumn}
        </div>
    `;
}

