import Typewriter from 'typewriter-effect/dist/core';
import { NodeM } from './model';

/**
 * 打字机配置选项
 */
export interface TypewriterOptions {
    loop?: boolean;
    delay?: number;
    cursor?: string;
}

/**
 * 启动打字机效果
 * @param app 容器元素
 * @param nodes 节点数据数组
 * @param options 配置选项
 * @returns Typewriter 实例
 */
export default function start(
    app: HTMLElement,
    nodes: NodeM[],
    options?: TypewriterOptions
): Typewriter {
    const defaultOptions: TypewriterOptions = {
        loop: false,
        delay: 30,
        cursor: '|'
    };

    const finalOptions = { ...defaultOptions, ...options };

    const typewriter = new Typewriter(app, {
        loop: finalOptions.loop,
        delay: finalOptions.delay,
        cursor: finalOptions.cursor,
        cursorClassName: 'typewriter-cursor',
        wrapperClassName: 'typewriter-wrapper'
    });

    nodes.forEach((node) => {
        if (node.value) {
            typewriter.typeString(node.value).pauseFor(node.stp);
        }

        if (node.callFunction) {
            typewriter.callFunction(node.callFunction);
        }

        if (node.br) {
            typewriter.typeString('<br/>').pauseFor(node.stp);
        }
    });

    return typewriter.start();
}
