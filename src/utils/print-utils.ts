import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
/**
 * 回退打印样式（当页面内无样式可复用时）
 */
const PRINT_STYLE_TEMPLATE = `
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
      background: white;
      color: #1f2937;
    }
    .resume-page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 40px;
      box-sizing: border-box;
      page-break-after: always;
      background: white;
    }
    .resume-page:last-child {
      page-break-after: auto;
    }
  </style>
`;

/**
 * 收集当前页面已加载的样式标签
 */
function collectRuntimeStyles(): string {
    if (typeof document === 'undefined') {
        return PRINT_STYLE_TEMPLATE;
    }

    const nodes = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));

    if (!nodes.length) {
        return PRINT_STYLE_TEMPLATE;
    }

    return nodes.map(node => node.outerHTML).join('\n');
}

/**
 * 打开打印窗口并打印内容
 * @param allContent 所有页面内容
 * @param unused 未使用（保持兼容性）
 * @param title 打印标题
 */
export function printResume(
    allContent: string,
    unused: string = '',
    title: string = '古月的简历'
): void {
    const printWindow = window.open('', '_blank');
    const styles = collectRuntimeStyles();
    
    if (printWindow) {
        // 移除光标元素
        const cleanContent = allContent.replace(/class="typewriter-cursor"/g, '');
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${title}</title>
            ${styles}
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

/**
 * 打开打印窗口并打印内容
 * @param allContent 所有页面内容
 * @param unused 未使用（保持兼容性）
 * @param title 打印标题
 */
async function  exportResume(
    allContent: string,
    unused: string = '',
    title: string = '古月的简历'
) {
    const printWindow = window.open('', '_blank');
    const styles = collectRuntimeStyles();

    if (printWindow) {
        // 移除光标元素
        const cleanContent = allContent.replace(/class="typewriter-cursor"/g, '');

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${title}</title>
            ${styles}
          </head>
          <body>
            ${cleanContent}
          </body>
          </html>
        `);
        const pages = document.querySelectorAll('.resume-page');
        const pdf = new jsPDF('p', 'mm', 'a4');
        // 导出配置

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            const canvas = await html2canvas(page, {
                useCORS: true,
                allowTaint: true,
                backgroundColor:null,
                scale:2
            });

            const imgData = canvas.toDataURL('image/jpeg', 1);

            // 添加新页面（第一页除外）
            if (i > 0) {
                pdf.addPage();
            }

            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        }
        pages.forEach(page => {

        });
        pdf.save('古月的简历.pdf');
        printWindow.close();
    }
}

export default exportResume

