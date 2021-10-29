// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";

//import React , {useEffect} from 'react'
import './App.css';
import Animation from './animation'
import Worker from "./mythread.worker.js";
;

var start = (() => {
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
    
  });

var run = (() => {
  document.querySelector('#busy').innerText = 'Main thread working...';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Animation.fibonacci(40);
        document.querySelector('#busy').innerText = 'Done!';
      });
    })
    });

function App(Props) {
  React.useEffect((function () {
          return Curry._1(start, undefined);
        }), []);
  return React.createElement("main", undefined, React.createElement("section", {
                  className: "support"
                }, "Your browser does not support OffscreenCanvas"), React.createElement("section", undefined, React.createElement("p", {
                      className: "hide-in-iframe"
                    }, "OffscreenCanvas lets you avoid animation jank caused by main thread event traffic"), React.createElement("p", {
                      className: "desc"
                    }, "When you click \"make busy\" button, the animation on window canvas is\n        blocked, while OffscreenCanvas, running on a worker, still plays smoothly."), React.createElement("button", {
                      id: "make-busy",
                      onClick: run
                    }, "Make me busy!"), React.createElement("div", {
                      id: "busy"
                    }), React.createElement("div", {
                      className: "display"
                    }, React.createElement("div", undefined, React.createElement("h1", undefined, "Canvas on main thread"), React.createElement("canvas", {
                              id: "canvas-window",
                              height: "200",
                              width: "400"
                            })), React.createElement("div", undefined, React.createElement("h1", undefined, "Canvas on worker"), React.createElement("canvas", {
                              id: "canvas-worker",
                              height: "200",
                              width: "400"
                            })))));
}

var make = App;

var $$default = App;

export {
  start ,
  run ,
  make ,
  $$default ,
  $$default as default,
  
}
/*  Not a pure module */
