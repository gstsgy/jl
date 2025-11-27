/**
 * 简历项类型
 */
export interface ResumeItem {
    type: 'title' | 'text' | 'list' | 'header' | 'section' | 'info-grid' | 'work-item' | 'project-item' | 'info-item';
    content: string | string[];
    pauseAfter?: number;
    style?: Record<string, string>;
    subtitle?: string; // 用于工作经历、项目经验等的副标题
    items?: string[]; // 用于工作描述、项目描述等
    icon?: string; // 图标类名
}

/**
 * 左侧栏数据
 */
export interface LeftColumnData {
    basicInfo: InfoItem[];
    skills: skillItem[];
    selfEvaluation: string;
}
export interface skillItem{
    info:string;
    page:number;
}

/**
 * 信息项
 */
export interface InfoItem {
    icon: string;
    label: string;
    value: string;
}

/**
 * 右侧栏数据
 */
export interface RightColumnData {
    jobPre:jobPre;
    education: EducationItem[];
    workExperience: WorkExperienceItem[];
    projects: WorkExperienceItem[];
}

export interface jobPre{
    title:string;
    city:string;
    salary:string;
    time:string;
}

/**
 * 教育背景项
 */
export interface EducationItem {
    period: string;
    school: string;
    major: string;
    description: string;
}

/**
 * 工作经历项
 */
export interface WorkExperienceItem {
    // page: number;
    period: string;
    position: string;
    company: string;
    description: string;
}

// /**
//  * 项目经验项
//  */
// export interface ProjectItem {
//     period: string;
//     name: string;
//     role: string;
//     description: string[];
// }

/**
 * 打字机配置选项
 */
export interface TypewriterConfig {
    delay: number;
    cursor: string;
}

/**
 * 页面布局类型
 */
export type PageLayout = 'single' | 'two';
