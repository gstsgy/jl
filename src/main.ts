//import Typewriter from 'typewriter-effect';

import Typewriter from 'typewriter-effect/dist/core';
import  init from './core/index';
import  {data} from './data/出师表';





document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    if(app){
        init(app,data);
    }
})
