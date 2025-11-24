/**
 * 将 CSS 样式对象转换为字符串
 * @param style CSS 样式对象
 * @returns CSS 样式字符串
 */
export function cssStyleToString(style: Record<string, string>): string {
    return Object.entries(style)
        .map(([key, value]) => {
            // 将 camelCase 转换为 kebab-case
            const kebabKey = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            return `${kebabKey}: ${value};`;
        })
        .join(' ');
}

