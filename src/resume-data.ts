interface ResumeItem {
    type: 'title' | 'text' | 'list' | 'divider';
    content: string | string[];
    pauseAfter?: number;
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
}

interface ResumeSection {
    id: string;
    items: ResumeItem[];
}

export const resumeData: ResumeItem[] = [
    {
        type: 'title',
        content: '张三 | 高级全栈工程师',
        style: {
            color: '#2c3e50',
            marginBottom: '1.5rem'
        }
    },
    {
        type: 'text',
        content: '5年以上全栈开发经验 | 技术博客作者 | 开源贡献者',
        style: {
            fontStyle: 'italic',
            marginBottom: '2rem'
        }
    },
    {
        type: 'title',
        content: '技术栈',
        pauseAfter: 300
    },
    {
        type: 'list',
        content: [
            '前端: React, Vue, TypeScript, Webpack',
            '后端: Node.js, Python, Django',
            '数据库: MongoDB, PostgreSQL, Redis',
            'DevOps: Docker, Kubernetes, AWS'
        ],
        style: {
            marginLeft: '2rem'
        }
    },
    {
        type: 'title',
        content: '工作经历',
        pauseAfter: 300
    },
    {
        type: 'text',
        content: '<strong>ABC科技公司 | 高级软件工程师 (2020-至今)</strong>',
        style: {
            marginTop: '1rem'
        }
    },
    {
        type: 'list',
        content: [
            '领导团队重构核心产品，性能提升40%',
            '实现微前端架构，改善代码维护性',
            '引入自动化测试，减少30%的回归缺陷'
        ],
        style: {
            marginLeft: '2rem'
        }
    },
    {
        type: 'text',
        content: '<strong>XYZ初创公司 | 全栈开发 (2018-2020)</strong>',
        style: {
            marginTop: '1rem'
        }
    },
    {
        type: 'list',
        content: [
            '从零搭建产品技术架构',
            '实现CI/CD流水线，部署效率提升60%',
            '主导技术选型和团队技能培训'
        ],
        style: {
            marginLeft: '2rem'
        }
    },
    {
        type: 'title',
        content: '教育背景',
        pauseAfter: 300
    },
    {
        type: 'text',
        content: '<strong>清华大学</strong> - 计算机科学与技术 硕士 (2016-2018)'
    },
    {
        type: 'text',
        content: '<strong>北京大学</strong> - 软件工程 学士 (2012-2016)'
    }
];