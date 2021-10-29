%%raw(`
//import React , {useEffect} from 'react'
import './App.css';
import Animation from './animation'
import Worker from "./mythread.worker.js";
`)

//let startWebWorker : unit => worker = 
  //%raw(` () => new Worker() `) 

let start =
%raw(`
 () => {
    // Feature detect.
    /*
    document.querySelector(selector)....指定されたセレクタ，またはセレクタのグループに一致する文書内の最初のElementを返す．
    <classListのメソッド>toggle；クラスが含まれていれば削除，含まれていなければ追加
    document.querySelector("p").classList.toggle("").....クリックイベントなどでclassの着脱が可能
    */
    document.querySelector('main').classList.toggle(
      'supported', ('OffscreenCanvas' in window));

    document.body.classList.toggle(
   //document.body.classList.toggle...文書のbodyを表す
      'iframe', (window.location !== window.parent.location));
      //location...urlを返す
    //document.querySelector('#make-busy').addEventListener('click', );
    //left animation
    const animationWindow = new Animation(document.querySelector('#canvas-window').getContext('2d'));
    animationWindow.start();
    
    
    const worker = new Worker();
    //right animation
    const offscreen = document.querySelector('#canvas-worker').transferControlToOffscreen();
    //transferControlToOffscreen()...ワーカーオブジェクトに制御を移す
    const urlParts = window.location.href.split('/');
    if (urlParts[urlParts.length - 1].indexOf('.') !== -1) {
    //indexOf()...呼び出す String オブジェクト中で、 fromIndex から検索を始め、
    //指定された値が最初に現れたインデックスを返す。値が見つからない場合は -1 を返す。
      urlParts.pop();//pop()...配列から最後の要素を取り除き、その要素を返す。
    }
    worker.postMessage({ msg: 'start', origin: urlParts.join('/'), canvas: offscreen }, [offscreen]);
    
  }
`)

let run =
%raw(`
() => {
  document.querySelector('#busy').innerText = 'Main thread working...';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Animation.fibonacci(40);
        document.querySelector('#busy').innerText = 'Done!';
      });
    })
    }
`)

@react.component
let make = () => {
  React.useEffect0(() => {
    start()
  })
  <main>
    <section className="support">
    {React.string(`Your browser does not support OffscreenCanvas`)}
    </section>
    <section>
      <p className="hide-in-iframe">
        {React.string(`OffscreenCanvas lets you avoid animation jank caused by main thread event traffic`)}
      </p>
      <p className="desc">
        {React.string(`When you click "make busy" button, the animation on window canvas is
        blocked, while OffscreenCanvas, running on a worker, still plays smoothly.`)}
      </p>
      <button id="make-busy" onClick={run}> { React.string(`Make me busy!`) }</button>
      <div id="busy"> </div>
      <div className="display">
      <div>
        <h1>
          {React.string(`Canvas on main thread`)}
        </h1>
        <canvas id="canvas-window" width="400" height="200"></canvas>
      </div>
      <div>
        <h1>
          {React.string(`Canvas on worker`)}
        </h1>
        <canvas id="canvas-worker" width="400" height="200"></canvas>
      </div>
      </div>
    </section>

    </main>
}

let default = make;