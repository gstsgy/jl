import Typewriter from 'typewriter-effect/dist/core';
import { resumeData } from './resume-data';


// 简历数据 - 第一页
const page1Data = [
    {
        type: 'title',
        content: '张三 | 全栈工程师',
        style: {
            color: '#2c3e50',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '5年以上开发经验 | 技术博客作者 | 开源贡献者',
        style: {
            fontStyle: 'italic',
            marginBottom: '30px'
        }
    },
    {
        type: 'title',
        content: '专业技能',
        pauseAfter: 300
    },
    {
        type: 'list',
        content: [
            '前端技术: Angualr, Vue, TypeScript, Vite, HTML5/CSS3',
            '后端技术: Java, Python, c#, RESTful API设计',
            '数据库: Mysql, Oracle, sqlserver, 数据库优化',
            'DevOps: Docker, jenkins, 阿里/腾讯云服务, CI/CD流水线',
            '其他: Git版本控制, 敏捷开发, 单元测试/集成测试'
        ],
        style: {
            marginLeft: '20px'
        }
    },
    {
        type: 'title',
        content: '工作经历',
        pauseAfter: 300
    },
    {
        type: 'text',
        content: '<strong>ABC科技有限公司 | 高级软件工程师 (2020-至今)</strong>',
        style: {
            marginTop: '15px'
        }
    },
    {
        type: 'list',
        content: [
            '领导并参与公司核心产品的重构工作，采用微前端架构，使系统性能提升40%',
            '设计并实现前后端分离架构，提高团队开发效率约35%',
            '引入自动化测试流程，减少30%的回归缺陷，提高代码质量',
            '指导3名初级工程师，提升团队整体技术水平'
        ],
        style: {
            marginLeft: '20px'
        }
    }
];

// 简历数据 - 第二页
const page2Data = [
    {
        type: 'text',
        content: '<strong>XYZ初创公司 | 全栈开发工程师 (2018-2020)</strong>',
        style: {
            marginTop: '15px'
        }
    },
    {
        type: 'list',
        content: [
            '从零开始搭建公司产品技术架构，选择合适的技术栈',
            '实现CI/CD自动化部署流程，使部署效率提升60%',
            '设计并开发核心业务模块，确保系统稳定性和可扩展性',
            '负责技术选型和团队技能培训'
        ],
        style: {
            marginLeft: '20px'
        }
    },
    {
        type: 'title',
        content: '教育背景',
        pauseAfter: 300
    },
    {
        type: 'text',
        content: '<strong>清华大学 | 计算机科学与技术 硕士 (2016-2018)</strong>',
        style: {
            marginTop: '10px'
        }
    },
    {
        type: 'list',
        content: [
            'GPA: 3.8/4.0',
            '研究方向: 分布式系统与云计算',
            '毕业论文: 《基于微服务架构的高性能分布式系统设计》'
        ],
        style: {
            marginLeft: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>北京大学 | 软件工程 学士 (2012-2016)</strong>',
        style: {
            marginTop: '15px'
        }
    },
    {
        type: 'title',
        content: '项目经验',
        pauseAfter: 300
    },
    {
        type: 'text',
        content: '<strong>电商平台重构项目 (2021)</strong>',
        style: {
            marginTop: '10px'
        }
    },
    {
        type: 'list',
        content: [
            '采用React+TypeScript重构前端，性能提升45%',
            '实现微前端架构，解耦各业务模块',
            '优化后端API响应时间，平均减少200ms延迟'
        ],
        style: {
            marginLeft: '20px'
        }
    }
];

// 获取DOM元素
const page1 = document.getElementById('page1')!;
const page2 = document.getElementById('page2')!;
const skipBtn = document.getElementById('skip-btn')!;
const printBtn = document.getElementById('print-btn')!;

let typewriter1: Typewriter;
let typewriter2: Typewriter;
let isTypingComplete = false;

// 初始化应用
function initApp() {
    renderResume();
    setupEventListeners();
}

// 渲染简历
function renderResume() {
    // 清空内容
    page1.innerHTML = '<div class="page-indicator">第1页</div>';
    page2.innerHTML = '<div class="page-indicator">第2页</div>';
    
    // 第一页打字机效果
    typewriter1 = new Typewriter(page1, {
        delay: 30,
        cursor: '▌',
        autoStart: true,
        wrapperClassName: 'typewriter-wrapper',
        cursorClassName: 'typewriter-cursor'
    });
    
    // 第二页打字机效果
    typewriter2 = new Typewriter(page2, {
        delay: 30,
        cursor: '▌',
        autoStart: false,
        wrapperClassName: 'typewriter-wrapper',
        cursorClassName: 'typewriter-cursor'
    });
    
    // 添加第一页内容
    page1Data.forEach(item => {
        addResumeItem(typewriter1, item);
    });
    
    // 第一页完成后开始第二页
    typewriter1.callFunction(() => {
        typewriter2.start();
    }).start();
    
    // 添加第二页内容
    page2Data.forEach(item => {
        addResumeItem(typewriter2, item);
    });
    
    // 全部完成回调
    typewriter2.callFunction(() => {
        isTypingComplete = true;
    });
}

// 添加简历项
function addResumeItem(tw: Typewriter, item: any) {
    const styleStr = item.style ? cssStyleToString(item.style) : '';
    
    switch (item.type) {
        case 'title':
            tw.typeString(`<h2 style="${styleStr}">${item.content}</h2>`);
            break;
        case 'text':
            tw.typeString(`<p style="${styleStr}">${item.content}</p>`);
            break;
        case 'list':
            tw.typeString(`<ul style="${styleStr}">`);
            item.content.forEach((li: string) => {
                tw.typeString(`<li>${li}</li>`);
            });
            tw.typeString('</ul>');
            break;
    }
    
    if (item.pauseAfter) {
        tw.pauseFor(item.pauseAfter);
    }
}

// CSS样式对象转字符串
function cssStyleToString(style: any): string {
    return Object.entries(style)
        .map(([key, value]) => `${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${value};`)
        .join(' ');
}

// 设置事件监听
function setupEventListeners() {
    skipBtn.addEventListener('click', () => {
        if (!isTypingComplete) {
            if (typewriter1) {
                typewriter1.stop();
                const cursor1 = page1.querySelector('.typewriter-cursor');
                if (cursor1) cursor1.remove();
            }
            if (typewriter2) {
                typewriter2.stop();
                const cursor2 = page2.querySelector('.typewriter-cursor');
                if (cursor2) cursor2.remove();
                typewriter2.start(); // 确保第二页内容显示
            }
            isTypingComplete = true;
        }
    });
    
    // 在setupEventListeners函数中修改打印按钮事件
printBtn.addEventListener('click', () => {
    // 先确保所有内容都显示
    if (!isTypingComplete) {
        if (typewriter1) typewriter1.stop();
        if (typewriter2) {
            typewriter2.stop();
            typewriter2.start();
        }
        document.querySelectorAll('.typewriter-cursor').forEach(el => el.remove());
        isTypingComplete = true;
    }
    
    // 添加打印前延迟确保DOM更新
    setTimeout(() => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>张三的简历</title>
                    <style>
                        body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
                        .resume-page {
                            width: 210mm;
                            height: 297mm;
                            padding: 15mm;
                            page-break-after: always;
                        }
                        .resume-page:last-child { page-break-after: auto; }
                        h1, h2 { color: #2c3e50; }
                        h1 { border-bottom: 2px solid #3498db; }
                        h2 { border-bottom: 1px solid #eee; }
                        ul { margin-left: 30px; }
                    </style>
                </head>
                <body>
                    ${page1.innerHTML.replace(/class="typewriter-cursor"/g, '')}
                    ${page2.innerHTML.replace(/class="typewriter-cursor"/g, '')}
                </body>
                </html>
            `);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 200);
        } else {
            window.print();
        }
    }, 100);
});
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp);