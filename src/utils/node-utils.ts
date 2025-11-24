import { ResumeItem } from '../types';
import { NodeM } from '../core/model';
import { cssStyleToString } from './style-utils';

/**
 * 将简历数据转换为节点数据
 * @param data 简历数据数组
 * @returns 节点数据数组
 */
export function createNodesFromData(data: ResumeItem[]): NodeM[] {
    const nodes: NodeM[] = [];

    data.forEach(item => {
        const styleStr = item.style ? cssStyleToString(item.style) : '';
        let content = '';

        switch (item.type) {
            case 'header':
                content = `<div class="resume-header" style="${styleStr}">
                    <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: bold;">${item.content}</h1>
                    ${item.subtitle ? `<p style="margin: 0; font-size: 16px; color: #666; font-style: italic;">${item.subtitle}</p>` : ''}
                </div>`;
                break;
            case 'info-grid':
                if (Array.isArray(item.content)) {
                    content = `<div class="info-grid" style="${styleStr}">`;
                    item.content.forEach((info, index) => {
                        content += `<span class="info-item">${info}</span>`;
                    });
                    content += '</div>';
                }
                break;
            case 'title':
                content = `<h2 class="section-title" style="${styleStr}">${item.content}</h2>`;
                break;
            case 'text':
                content = `<p style="${styleStr}">${item.content}</p>`;
                break;
            case 'list':
                if (Array.isArray(item.content)) {
                    content = `<ul style="${styleStr}">`;
                    item.content.forEach(li => {
                        content += `<li>${li}</li>`;
                    });
                    content += '</ul>';
                }
                break;
            case 'work-item':
                content = `<div class="work-item" style="${styleStr}">
                    <div class="work-header">
                        <strong class="work-title">${item.content}</strong>
                        ${item.subtitle ? `<span class="work-date">${item.subtitle}</span>` : ''}
                    </div>
                    ${item.items && item.items.length > 0 ? `<ul class="work-description">${item.items.map(desc => `<li>${desc}</li>`).join('')}</ul>` : ''}
                </div>`;
                break;
            case 'project-item':
                content = `<div class="project-item" style="${styleStr}">
                    <div class="project-header">
                        <strong class="project-title">${item.content}</strong>
                        ${item.subtitle ? `<span class="project-date">${item.subtitle}</span>` : ''}
                    </div>
                    ${item.items && item.items.length > 0 ? `<ul class="project-description">${item.items.map(desc => `<li>${desc}</li>`).join('')}</ul>` : ''}
                </div>`;
                break;
        }

        if (content) {
            nodes.push({
                value: content,
                stp: item.pauseAfter || 0,
                br: false
            });
        }
    });

    return nodes;
}

