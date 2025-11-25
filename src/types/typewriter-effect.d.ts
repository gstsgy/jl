// src/types/typewriter-effect.d.ts
declare module 'typewriter-effect/dist/core' {
    class Typewriter {
        constructor(element: HTMLElement | string, options?: TypewriterOptions);
        typeString(text: string): this;
        pauseFor(ms: number): this;
        deleteChars(count: number): this;
        deleteAll(): this;
        callFunction(callback: Function): this;
        start(): Typewriter;
        stop(): void;
    }

    interface TypewriterOptions {
        loop?: boolean;
        delay?: number;
        deleteSpeed?: number;
        cursor?: string | boolean;
        cursorClassName?: string;
        wrapperClassName?: string;
    }

    export default Typewriter;
}