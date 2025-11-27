import { LeftColumnData, RightColumnData, EducationItem, WorkExperienceItem, skillItem, jobPre } from '../types';
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
                
                <img src="${headerData.avatar}" alt="图片描述">
            </div>
        </div>
    `;
}

/**
 * 渲染左侧栏
 */
export function renderLeftColumn(data: LeftColumnData, page: number): string {
    if(page === 1){
        return `
            <div class="resume-left-column">
                ${renderBasicInfo(data.basicInfo)}
                ${renderSkills(data.skills)}
               
            </div>
        `;
    }else{
        return `
        <div class="resume-left-column">
            ${renderSkills2(data.skills)}
            ${renderSelfEvaluation(data.selfEvaluation)}
        </div>
    `;
    }
   
}

/**
 * 渲染基本信息
 */
function renderBasicInfo(infoItems: LeftColumnData['basicInfo']): string {
    const itemsHtml = infoItems.map(item => `
        <div class="info-item">
            <i class="fas ${item.icon}"></i>
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
function renderSkills(skills: skillItem[]): string {
    const skillsHtml = skills.filter(skill => skill.page === 1).map(skill => `<li>${skill.info}</li>`).join('');

    return `
        <div class="section-card">
            <h3><i class="fas fa-code"></i> 主要技能</h3>
            <ul class="skills-list">
                ${skillsHtml}
            </ul>
        </div>
    `;
}
function renderSkills2(skills: skillItem[]): string {
    const skillsHtml = skills.filter(skill => skill.page === 2).map(skill => `<li>${skill.info}</li>`).join('');

    return `
        <div class="section-card">
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
            ${renderJobPre(data.jobPre)}
            ${renderEducation(data.education)}
            ${renderWorkExperience(data.workExperience)}
        </div>
    `;
}
/**
 * 渲染右侧栏
 */
export function renderRightColumn2(data: RightColumnData): string {
    return `
        <div class="resume-right-column">
            ${renderProjects(data.projects)}
        </div>
    `;
}

/**
 * 渲染教育背景
 */
function renderJobPre(jobPre: jobPre): string {

    return `
        <div class="section-card">
            <h3 class="section-title"><i class="fas fa-briefcase"></i> 求职意向</h3>
            <div class="jobPre-card">
           <div class="jobPre-item"> <i class="fas fa-laptop-code"></i> ${jobPre.title}</div>
           <div class="jobPre-item"><i class="fas fa-building"></i> ${jobPre.city}</div>
           <div class="jobPre-item"><i class="fas fa-comment-dollar"></i> ${jobPre.salary}</div>
           <div class="jobPre-item"> <i class="fas fa-running"></i> ${jobPre.time}</div>
        </div>
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
            <div class="education-title">
            <div class="education-title-left">
             <div class="education-period">${edu.period}</div>
           
            <div class="education-major">${edu.major}</div>
            </div>
            <div class="education-title-right">
             <div class="education-school">${edu.school}</div>
            </div>
            </div>
           
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
        return `
            <div class="work-item">
                <div class="work-header">
                    <div class="work-period">
                        <i class="fas fa-briefcase"></i>
                        ${work.period}
                        <div class="work-position">${work.position}</div>
                    </div>
                    <span class="work-company">${work.company}</span>
                </div>
                
                
                <div class="work-description">
                    ${work.description}
                </div>
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
function renderProjects(projects: WorkExperienceItem[]): string {
    if (projects.length === 0) return '';

    const workHtml = projects.map(work => {
        return `
            <div class="work-item">
                <div class="work-header">
                    <div class="work-period">
                        <i class="fas fa-briefcase"></i>
                        ${work.period}
                        <div class="work-position">${work.position}</div>
                    </div>
                    <span class="work-company">${work.company}</span>
                </div>
                
                
                <div class="work-description">
                    ${work.description}
                </div>
            </div>
        `;
    }).join('');


    return `
        <div class="section-card">
            <h3 class="section-title"><i class="fas fa-laptop-code"></i> 项目经验</h3>
            ${workHtml}
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

