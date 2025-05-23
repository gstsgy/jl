//import Typewriter from 'typewriter-effect';
import Typewriter from 'typewriter-effect/dist/core';
 





document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
const typewriter = new Typewriter(app, {
    loop: false,
    delay: 75,
    cursor: '|' // 自定义光标
});

typewriter
    .typeString('你好，我是古月')
    .pauseFor(1000)
    .typeString('<br/>')
    .pauseFor(1000)
    .typeString('感谢您花时间阅读我的在线简历，期待能有机会和您共事')
    .pauseFor(1000)
    .typeString('<br/>')
    .pauseFor(1000)
    .typeString('首先我先准备一张A4纸')
    .callFunction(()=>{
       
        // document.querySelector('.resume').style.width='21cm';
        // document.querySelector('.resume').style.height='29.7cm';
        // document.querySelector('.resume').style.boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'
        // document.querySelector('.resume').style.border='1px solid #3498db'
       
    })
    .start();
})
