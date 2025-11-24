(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();const a={PAGE:{PRINT_DELAY:100,HEIGHT:1123,WIDTH:794},SELECTORS:{PRINT_BTN:"print-btn",RESUME_PAGES:"resume-pages",CONTROLS:"controls"}},p=`
  <style>
    :root {
      --primary-color: #2563eb;
      --primary-dark: #1e40af;
      --secondary-color: #10b981;
      --text-primary: #1f2937;
      --text-secondary: #6b7280;
      --bg-primary: #ffffff;
      --bg-secondary: #f9fafb;
      --bg-accent: #f3f4f6;
      --border-color: #e5e7eb;
    }
    body { 
      margin: 0; 
      padding: 0; 
      font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif; 
      background: white;
    }
    .resume-page {
      width: 210mm;
      height: 297mm;
      padding: 0;
      page-break-after: always;
      background: white;
      box-sizing: border-box;
    }
    .resume-page:last-child { page-break-after: auto; }
    .resume-header {
      height: 240px;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .resume-header h1 {
      margin: 0 0 15px 0;
      font-size: 42px;
      font-weight: 700;
      color: white;
      border-bottom: none;
    }
    .resume-content {
      padding: 30px 40px;
      display: flex;
      gap: 30px;
      height: calc(100% - 240px);
      box-sizing: border-box;
    }
    .resume-left-column {
      width: calc(100% / 3.3);
    }
    .resume-right-column {
      width: calc(100% * 2.3 / 3.3);
    }
    .section-card {
      background: var(--bg-secondary);
      border-radius: 8px;
      padding: 20px;
      border-left: 4px solid var(--primary-color);
      margin-bottom: 20px;
    }
    .section-title {
      color: var(--text-primary);
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 10px;
      margin: 0 0 20px 0;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border-color);
    }
    .info-item:last-child {
      border-bottom: none;
    }
    .skills-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .skills-list li {
      padding: 8px 0;
      padding-left: 20px;
      position: relative;
    }
    .work-item, .project-item {
      margin-bottom: 20px;
      padding: 20px;
      background: var(--bg-accent);
      border-radius: 8px;
      border-left: 4px solid var(--primary-color);
    }
    .project-item {
      border-left-color: var(--secondary-color);
    }
    .work-description, .project-description {
      list-style: none;
      padding: 0;
      margin: 10px 0 0 20px;
    }
    .work-description li, .project-description li {
      padding: 6px 0;
      padding-left: 20px;
      position: relative;
    }
    .page-indicator {
      position: absolute;
      bottom: 20px;
      right: 20px;
      color: #9ca3af;
      font-size: 12px;
    }
  </style>
`;function m(s,t="",e="胡军军的简历"){const o=window.open("","_blank");if(o){const i=s.replace(/class="typewriter-cursor"/g,"");o.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${e}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            ${p}
          </head>
          <body>
            ${i}
          </body>
          </html>
        `),o.document.close(),setTimeout(()=>{o.print(),o.close()},200)}else window.print()}const u={basicInfo:[{icon:"fa-birthday-cake",label:"年龄",value:"29岁"},{icon:"fa-users",label:"民族",value:"汉族"},{icon:"fa-ruler-vertical",label:"身高体重",value:"175cm/70kg"},{icon:"fa-briefcase",label:"求职意向",value:"后端开发"},{icon:"fa-map-marker-alt",label:"地点",value:"江苏无锡"},{icon:"fa-dollar-sign",label:"薪资",value:"薪资面议"},{icon:"fa-calendar-check",label:"到岗时间",value:"随时到岗"},{icon:"fa-map-pin",label:"城市",value:"上海"},{icon:"fa-clock",label:"工作经验",value:"5年经验"},{icon:"fa-phone",label:"电话",value:"15309812410"},{icon:"fa-envelope",label:"邮箱",value:"122759654@qq.com"},{icon:"fa-github",label:"GitHub",value:"github.com/gstsgy"}],skills:["熟练掌握java基础知识，理解面向对象编程。","了解基本数据类型，以及掌握java中常见数据类型原理及用法。","理解基本算法，能对常见问题给出较简洁的算法代码。","熟悉java8 stream编程，能够通过阅读源码掌握java常见类原理与使用方法。","熟悉javaee开发，掌握ssm及springboot开发，理解其简单实现原理。","掌握spring bean的加载方法以及spring boot自动配置，能够使用spring boot开发出扩展良好，灵活的产品项目或者插件。","掌握python语言，可使用python开发各种小工具（包括桌面端 pyqt5）","掌握sklearn工具包使用，掌握pytorch使用以及计算机视觉算法","完整学习过c语言，可使用c语言开发小工具。","掌握linux系统，并且生活工作中使用linux系统（前期centos，后期转投debian）","掌握javascript语言，可使用nodejs开发各种工具插件，可以使用vue开发前端项目","支持并参与开源项目，在github上开源多个项目。"],selfEvaluation:"相较于被动的安排式工作，更愿意主动的去工作，热爱编程，对知识充满渴望，愿意去学习，了解新的东西，并在工作中实践，应用。喜欢不断的钻研重构代码，对于某个业务，算法总要找出最优解。自我驱动能力强，支持开源事业期待自己能为开源贡献自己的一份力量，永远的热泪盈眶，永远积极向上，三观端正，热爱祖国。期待能与积极上进有奉献精神者共事。"},h={education:[{period:"2013.9-2017.7",school:"沈阳理工大学",major:"物流管理专业",description:"主修课程：管理学，西方经济学，运筹学，高等数学，线性代数，概率论，数据库管理，微积分，在此期间自学C语言，数据结构以及Java等课程。"}],workExperience:[{period:"2020.3-2023.12",position:"软件研发主管",company:"上海速锐信息技术有限公司",description:["负责速锐自动化仓库WMS产品研发工作，包括WMS前后端（包括移动端）架构搭建，设计，技术选型，核心业务开发，核心算法开发等。","负责公司服务器维护，包括服务器系统（linux）安装，服务器软件环境搭建，开发测试环境搭建。","期间带领团队开发多个项目。"]},{period:"2019.4-2019.12",position:"开发工程师",company:"上海鼎格信息科技有限公司",description:["负责MES项目后端主开发，MES项目核心业务，接口，算法开发，负责项目实施方案的确定，PDA技术选型等。","MES项目使用C#语言开发，C/S架构，C端包含WPF开发的windows桌面客户端，VUE架构开发浏览器端，和PDA端，服务端使用WCF技术开发。"]},{period:"2018.3-2019.3",position:"开发工程师",company:"大连高端仙岛技术有限公司",description:["参与的项目主要公司门户网站开发，人员定位系统开发，gis项目以及其他一些小项目。"]}],projects:[{period:"2020.3-2023.12",name:"WMS系统开发",role:"产品开发",description:["负责WMS智能库的产品开发，期间产品从无到有，在诸多凌乱项目中整理一套相对合理的业务逻辑，对数据库表重新设计，减少冗余字段。","期间架构做了三次升级，从最初的一个项目包含所有到后面分模块分组件开发，现产品已做成可插拔支持多种业务模式，可支持高度定值化开发。"]},{period:"2019.3-2019.12",name:"MES平台",role:"主开发",description:["MES项目采用c#语言开发，Oracle数据库mybatis持久层，采用前后端分离的模式，前端使用vue和wpf开发，后端是一个wcf接口程序，负责后端业务接口开发，出入库流程，领料退料，计划检验等等，以及与sap接口对接，mes本地离线功能开发等等。"]},{period:"2018.8-2019.3",name:"人员管理系统",role:"服务端开发",description:["该项目主要为煤矿公司人员管理开发的一个项目，该项目是一个前后端分离的人员管理系统，项目采用 SpringBoot+Vue 开发，项目加入常见的企业级应用所涉及到的技术点如Redis、RabbitMQ，shiro等，我主要负责后端业务接口开发。"]},{period:"2018.4-2018.12",name:"GIS平台",role:"前期参与后期主要负责",description:["GIS项目分为三维和二维，三维使用unity开发，前期我主要参与一些脚本编写（c#语言），二维GIS使用h5开发，主要由我开发，GIS平台除了地图显示外还要融合人员定位和检测监控进来，二维GIS采用前后端分离模式，后端使用spring boot和Oracle数据库开发，主要为前端提供一些数据。前端采用canvas开发。"]},{period:"2017.7-至今",name:"个人项目",role:"个人完成或者和别人合作完成",description:["因为对编程本身的喜爱，因此除了在学习和工作之外会自己写一些项目，其中包括 plato交友软件（主要用websocket实现），根据数据库生成Java或c#实体对象（项目地址：https://github.com/gstsgy/db2entity），各种小游戏（2048.五子棋，俄罗斯方块，扫雷等），小工具（计算器，Java代码生成器，Excel测试数据生成器，数据库表转Java类工具，CAD转json文件 等），以及我的个人博客，12306抢票工程等等。"]}]},d={name:"胡军军",motto:"用阳光乐观的心态去面对生活和工作，它们一样也会回报给你阳光"};function f(){return`
        <div class="resume-header">
            <div class="resume-header-content">
                <h1>${d.name}</h1>
                <p class="motto">${d.motto}</p>
            </div>
            <div class="avatar-placeholder">
                <i class="fas fa-user"></i>
            </div>
        </div>
    `}function g(s){return`
        <div class="resume-left-column">
            ${v(s.basicInfo)}
            ${b(s.skills)}
            ${y(s.selfEvaluation)}
        </div>
    `}function v(s){return`
        <div class="section-card">
            <h3><i class="fas fa-user-circle"></i> 基本信息</h3>
            ${s.map(e=>`
        <div class="info-item">
            <i class="fas ${e.icon}"></i>
            <span class="info-item-label">${e.label}:</span>
            <span class="info-item-value">${e.value}</span>
        </div>
    `).join("")}
        </div>
    `}function b(s){return`
        <div class="section-card">
            <h3><i class="fas fa-code"></i> 主要技能</h3>
            <ul class="skills-list">
                ${s.map(e=>`<li>${e}</li>`).join("")}
            </ul>
        </div>
    `}function y(s){return`
        <div class="section-card">
            <h3><i class="fas fa-comment-dots"></i> 自我评价</h3>
            <div class="self-evaluation">${s}</div>
        </div>
    `}function E(s){return`
        <div class="resume-right-column">
            ${x(s.education)}
            ${C(s.workExperience)}
            ${w(s.projects)}
        </div>
    `}function x(s){return s.length===0?"":`
        <div class="section-card">
            <h3 class="section-title"><i class="fas fa-graduation-cap"></i> 教育背景</h3>
            ${s.map(e=>`
        <div class="education-item">
            <div class="education-period">${e.period}</div>
            <div class="education-school">${e.school}</div>
            <div class="education-major">${e.major}</div>
            <div class="education-description">${e.description}</div>
        </div>
    `).join("")}
        </div>
    `}function C(s){return s.length===0?"":`
        <div class="section-card">
            <h3 class="section-title"><i class="fas fa-building"></i> 工作经验</h3>
            ${s.map(e=>{const o=e.description.map(i=>`<li>${i}</li>`).join("");return`
            <div class="work-item">
                <div class="work-header">
                    <div class="work-position">
                        <i class="fas fa-briefcase"></i>
                        ${e.position}
                    </div>
                    <span class="work-period">${e.period}</span>
                </div>
                <div class="work-company">${e.company}</div>
                <ul class="work-description">
                    ${o}
                </ul>
            </div>
        `}).join("")}
        </div>
    `}function w(s){return s.length===0?"":`
        <div class="section-card">
            <h3 class="section-title"><i class="fas fa-laptop-code"></i> 项目经验</h3>
            ${s.map(e=>{const o=e.description.map(i=>`<li>${i}</li>`).join("");return`
            <div class="project-item">
                <div class="project-header">
                    <div class="project-name">
                        <i class="fas fa-project-diagram"></i>
                        ${e.name}
                    </div>
                    <span class="project-period">${e.period}</span>
                </div>
                <div class="project-role">${e.role}</div>
                <ul class="project-description">
                    ${o}
                </ul>
            </div>
        `}).join("")}
        </div>
    `}class S{constructor(){this.isTypingComplete=!1,this.pageElements=[],this.pageContents=[];const t=document.getElementById(a.SELECTORS.RESUME_PAGES),e=document.getElementById(a.SELECTORS.PRINT_BTN),o=document.getElementById(a.SELECTORS.CONTROLS);if(!t||!e||!o)throw new Error("Required DOM elements not found");this.resumePages=t,this.printBtn=e,this.controls=o,this.initApp()}initApp(){this.buildInterface(),this.setupEventListeners()}buildInterface(){this.buildPages(),this.resumePages.innerHTML="",this.pageElements.forEach(t=>{this.resumePages.appendChild(t)}),this.resumePages.style.display="flex",this.resumePages.style.flexDirection="column",this.resumePages.style.gap="20px",this.pageContents=this.pageElements.map(t=>t.outerHTML),this.isTypingComplete=!0,this.showControls()}buildPages(){this.pageElements=[];const t=document.createElement("div");t.style.position="absolute",t.style.visibility="hidden",t.style.pointerEvents="none",t.style.width=`${a.PAGE.WIDTH}px`,t.style.top="0",t.style.left="0",document.body.appendChild(t);const e=this.getRightSections();let o=1,i=this.createPage(o,!0);t.appendChild(i);const n=this.htmlToElement(g(u)),r=i.querySelector(".resume-content"),c=r.querySelector(".resume-right-column");r.insertBefore(n,c),e.forEach(l=>{c.appendChild(l),i.scrollHeight>a.PAGE.HEIGHT&&(c.removeChild(l),this.pageElements.push(i),o++,i=this.createPage(o,!1),t.appendChild(i),i.querySelector(".resume-right-column").appendChild(l))}),this.pageElements.push(i),document.body.removeChild(t),this.pageElements.forEach(l=>{l.classList.add("resume-page-visible")})}showControls(){this.controls.style.display="flex",setTimeout(()=>{this.controls.classList.add("controls-visible")},100)}setupEventListeners(){this.printBtn.addEventListener("click",()=>this.handlePrint())}handlePrint(){this.isTypingComplete||(this.isTypingComplete=!0,this.showControls()),setTimeout(()=>{const t=this.pageElements.map(e=>e.outerHTML).join("");m(t,"","胡军军的简历")},a.PAGE.PRINT_DELAY)}createPage(t,e){const o=document.createElement("div");o.className="resume-page";const i=this.htmlToElement(`<div class="page-indicator">第${t}页</div>`);o.appendChild(i),e&&o.appendChild(this.htmlToElement(f()));const n=document.createElement("div");n.className=e?"resume-content":"resume-content single-column",o.appendChild(n);const r=document.createElement("div");return r.className=e?"resume-right-column":"resume-right-column single",n.appendChild(r),o}getRightSections(){const t=E(h),e=this.htmlToElement(t);return e?Array.from(e.children).map(o=>o.cloneNode(!0)):[]}htmlToElement(t){const e=document.createElement("template");return e.innerHTML=t.trim(),e.content.firstElementChild}}document.addEventListener("DOMContentLoaded",()=>{try{new S}catch(s){console.error("Failed to initialize ResumeApp:",s)}});
