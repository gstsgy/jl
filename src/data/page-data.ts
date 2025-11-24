import { ResumeItem } from '../types';

/**
 * 第一页简历数据 - 根据PDF格式优化
 */
export const page1Data: ResumeItem[] = [
    {
        type: 'header',
        content: '胡军军',
        subtitle: '用阳光乐观的心态去面对生活和工作，它们一样也会回报给你阳光',
        style: {
            textAlign: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '2px solid #3498db'
        }
    },
    {
        type: 'info-grid',
        content: [
            '29岁', '汉族', '175cm/70kg',
            '后端开发', '江苏无锡', '薪资面议',
            '随时到岗', '上海', '5年经验',
            '15309812410', '122759654@qq.com', 'github.com/gstsgy'
        ],
        style: {
            marginBottom: '25px'
        }
    },
    {
        type: 'title',
        content: '教育背景',
        pauseAfter: 300
    },
    {
        type: 'text',
        content: '<strong>2013.9-2017.7</strong>',
        style: {
            marginTop: '10px',
            marginBottom: '5px'
        }
    },
    {
        type: 'text',
        content: '<strong>沈阳理工大学</strong> | 物流管理专业',
        style: {
            marginBottom: '8px'
        }
    },
    {
        type: 'text',
        content: '主修课程：管理学，西方经济学，运筹学，高等数学，线性代数，概率论，数据库管理，微积分，在此期间自学C语言，数据结构以及Java等课程。',
        style: {
            marginBottom: '20px',
            lineHeight: '1.8'
        }
    },
    {
        type: 'title',
        content: '工作经验',
        pauseAfter: 300
    },
    {
        type: 'work-item',
        content: '软件研发主管',
        subtitle: '2020.3-2023.12',
        items: [
            '负责速锐自动化仓库WMS产品研发工作，包括WMS前后端（包括移动端）架构搭建，设计，技术选型，核心业务开发，核心算法开发等。',
            '负责公司服务器维护，包括服务器系统（linux）安装，服务器软件环境搭建，开发测试环境搭建。',
            '期间带领团队开发多个项目。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>上海速锐信息技术有限公司</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'work-item',
        content: '开发工程师',
        subtitle: '2019.4-2019.12',
        items: [
            '负责MES项目后端主开发，MES项目核心业务，接口，算法开发，负责项目实施方案的确定，PDA技术选型等。',
            'MES项目使用C#语言开发，C/S架构，C端包含WPF开发的windows桌面客户端，VUE架构开发浏览器端，和PDA端，服务端使用WCF技术开发。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>上海鼎格信息科技有限公司</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'work-item',
        content: '开发工程师',
        subtitle: '2018.3-2019.3',
        items: [
            '参与的项目主要公司门户网站开发，人员定位系统开发，gis项目以及其他一些小项目。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>大连高端仙岛技术有限公司</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'title',
        content: '主要技能',
        pauseAfter: 300
    },
    {
        type: 'list',
        content: [
            '熟练掌握java基础知识，理解面向对象编程。',
            '了解基本数据类型，以及掌握java中常见数据类型原理及用法。',
            '理解基本算法，能对常见问题给出较简洁的算法代码。',
            '熟悉java8 stream编程，能够通过阅读源码掌握java常见类原理与使用方法。',
            '熟悉javaee开发，掌握ssm及springboot开发，理解其简单实现原理。',
            '掌握spring bean的加载方法以及spring boot自动配置，能够使用spring boot开发出扩展良好，灵活的产品项目或者插件。',
            '掌握python语言，可使用python开发各种小工具（包括桌面端 pyqt5）',
            '掌握sklearn工具包使用，掌握pytorch使用以及计算机视觉算法',
            '完整学习过c语言，可使用c语言开发小工具。',
            '掌握linux系统，并且生活工作中使用linux系统（前期centos，后期转投debian）',
            '掌握javascript语言，可使用nodejs开发各种工具插件，可以使用vue开发前端项目',
            '支持并参与开源项目，在github上开源多个项目。'
        ],
        style: {
            marginLeft: '20px',
            lineHeight: '1.8'
        }
    }
];

/**
 * 第二页简历数据 - 根据PDF格式优化
 */
export const page2Data: ResumeItem[] = [
    {
        type: 'title',
        content: '项目经验',
        pauseAfter: 300
    },
    {
        type: 'project-item',
        content: 'WMS系统开发',
        subtitle: '2020.3-2023.12',
        items: [
            '负责WMS智能库的产品开发，期间产品从无到有，在诸多凌乱项目中整理一套相对合理的业务逻辑，对数据库表重新设计，减少冗余字段。',
            '期间架构做了三次升级，从最初的一个项目包含所有到后面分模块分组件开发，现产品已做成可插拔支持多种业务模式，可支持高度定值化开发。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>产品开发</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'project-item',
        content: 'MES平台',
        subtitle: '2019.3-2019.12',
        items: [
            'MES项目采用c#语言开发，Oracle数据库mybatis持久层，采用前后端分离的模式，前端使用vue和wpf开发，后端是一个wcf接口程序，负责后端业务接口开发，出入库流程，领料退料，计划检验等等，以及与sap接口对接，mes本地离线功能开发等等。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>主开发</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'project-item',
        content: '人员管理系统',
        subtitle: '2018.8-2019.3',
        items: [
            '该项目主要为煤矿公司人员管理开发的一个项目，该项目是一个前后端分离的人员管理系统，项目采用 SpringBoot+Vue 开发，项目加入常见的企业级应用所涉及到的技术点如Redis、RabbitMQ，shiro等，我主要负责后端业务接口开发。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>服务端开发</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'project-item',
        content: 'GIS平台',
        subtitle: '2018.4-2018.12',
        items: [
            'GIS项目分为三维和二维，三维使用unity开发，前期我主要参与一些脚本编写（c#语言），二维GIS使用h5开发，主要由我开发，GIS平台除了地图显示外还要融合人员定位和检测监控进来，二维GIS采用前后端分离模式，后端使用spring boot和Oracle数据库开发，主要为前端提供一些数据。前端采用canvas开发。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>前期参与后期主要负责</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'project-item',
        content: '个人项目',
        subtitle: '2017.7-至今',
        items: [
            '因为对编程本身的喜爱，因此除了在学习和工作之外会自己写一些项目，其中包括 plato交友软件（主要用websocket实现），根据数据库生成Java或c#实体对象（项目地址：https://github.com/gstsgy/db2entity），各种小游戏（2048.五子棋，俄罗斯方块，扫雷等），小工具（计算器，Java代码生成器，Excel测试数据生成器，数据库表转Java类工具，CAD转json文件 等），以及我的个人博客，12306抢票工程等等。'
        ],
        style: {
            marginTop: '15px',
            marginBottom: '20px'
        }
    },
    {
        type: 'text',
        content: '<strong>个人完成或者和别人合作完成</strong>',
        style: {
            marginTop: '-15px',
            marginBottom: '15px',
            color: '#2c3e50',
            fontSize: '14px'
        }
    },
    {
        type: 'title',
        content: '自我评价',
        pauseAfter: 300
    },
    {
        type: 'text',
        content: '相较于被动的安排式工作，更愿意主动的去工作，热爱编程，对知识充满渴望，愿意去学习，了解新的东西，并在工作中实践，应用。喜欢不断的钻研重构代码，对于某个业务，算法总要找出最优解。自我驱动能力强，支持开源事业期待自己能为开源贡献自己的一份力量，永远的热泪盈眶，永远积极向上，三观端正，热爱祖国。期待能与积极上进有奉献精神者共事。',
        style: {
            marginTop: '10px',
            lineHeight: '1.8',
            textAlign: 'justify'
        }
    }
];
