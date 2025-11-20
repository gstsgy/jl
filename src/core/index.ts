//import Typewriter from 'typewriter-effect';
import Typewriter from 'typewriter-effect/dist/core';
import { NodeM } from './model';

export interface TypewriterOptions {
    loop?: boolean;
    delay?: number;
    cursor?: string;
}

export default function start(
    app: HTMLElement,
    nodes: NodeM[],
    options?: TypewriterOptions
): Typewriter {
    const defaultOptions: TypewriterOptions = {
        loop: false,
        delay: 75,
        cursor: '|'
    };

    const finalOptions = { ...defaultOptions, ...options };

    const typewriter = new Typewriter(app, {
        loop: finalOptions.loop,
        delay: finalOptions.delay,
        cursor: finalOptions.cursor
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
