//import Typewriter from 'typewriter-effect';
import Typewriter from 'typewriter-effect/dist/core';
import { NodeM } from './model';
 

export default function start(app:HTMLElement,nodes:NodeM[]){
    const typewriter = new Typewriter(app, {
        loop: false,
        delay: 75,
        cursor: '|' // 自定义光标
    });
    nodes.forEach((node)=>{
        typewriter.typeString(node.value).pauseFor(node.stp);
        if(node.callFunction){
            typewriter.callFunction(node.callFunction)
        }
        if(node.br){
            typewriter.typeString('<br/>').pauseFor(node.stp);
        }
    })
   
    typewriter.start();
}



