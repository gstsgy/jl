export default class MatrixRain {
    private canvas: HTMLCanvasElement ;
    private ctx: CanvasRenderingContext2D|null;
    private fontSize: number;
    private columns: number;
    private drops: number[];
    private chars: string;
    private animationId: number; // 添加动画ID用于取消动画帧
    private lastTime: number = 0;
    private frameInterval: number = 100; // 控制每100ms更新一次，约10fps

    constructor() {
        this.canvas=document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        //this.chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        this.chars = "天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜";
        this.animationId = 0; // 初始化动画ID
        this.initCanvas();
        this.init();
        this.start();
    }
    initCanvas(){

        this.canvas.id = 'matrixRain';
        document.body.prepend(this.canvas); // 添加到 body 最前面

// 设置样式
        Object.assign(this.canvas.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: '-1',
            display: 'block'
        });
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        // @ts-ignore
        this.drops = Array(this.columns).fill().map(() =>
            Math.floor(Math.random() * -this.canvas.height / this.fontSize)
        );

        window.addEventListener('resize', () => this.init());
    }

    draw(timestamp: number = 0) {
        if(!this.ctx){
            return;
        }
        // 控制帧率
        if (timestamp - this.lastTime < this.frameInterval) {
            this.animationId = requestAnimationFrame((time) => this.draw(time));
            return;
        }
        this.lastTime = timestamp;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;

        this.drops.forEach((drop, i) => {
            if(!this.ctx){
                return ;
            }
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = drop * this.fontSize;

            // 渐变色彩
            if (y < this.canvas.height * 0.3) {
                this.ctx.fillStyle = '#0f0'; // 亮绿
            } else if (y < this.canvas.height * 0.6) {
                this.ctx.fillStyle = '#0a0'; // 中绿
            } else {
                this.ctx.fillStyle = '#050'; // 暗绿
            }

            this.ctx.fillText(char, x, y);

            this.drops[i] ++;

            if (drop * this.fontSize > this.canvas.height && Math.random() > 0.99) {
                this.drops[i] = Math.floor(Math.random() * -this.canvas.height / this.fontSize);
            }
        });
        this.animationId = requestAnimationFrame((time) => this.draw(time));
    }

    start() {
        this.lastTime = 0;
        this.animationId = requestAnimationFrame((time) => this.draw(time));
    }
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

