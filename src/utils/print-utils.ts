/**
 * 打印样式模板
 */
const PRINT_STYLE_TEMPLATE = `
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
`;

/**
 * 打开打印窗口并打印内容
 * @param allContent 所有页面内容
 * @param unused 未使用（保持兼容性）
 * @param title 打印标题
 */
export function printResume(
    allContent: string,
    unused: string = '',
    title: string = '胡军军的简历'
): void {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
        // 移除光标元素
        const cleanContent = allContent.replace(/class="typewriter-cursor"/g, '');
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${title}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            ${PRINT_STYLE_TEMPLATE}
          </head>
          <body>
            ${cleanContent}
          </body>
          </html>
        `);
        
        printWindow.document.close();
        
        // 延迟打印以确保内容加载完成
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 200);
    } else {
        // 如果无法打开新窗口，使用默认打印
        window.print();
    }
}

