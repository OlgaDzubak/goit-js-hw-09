function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequire7bc7;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequire7bc7=r);var i=r("7Y9D8");document.querySelector('button[type="submit"]').addEventListener("click",(function(t){t.preventDefault();let n=document.querySelector('input[name="delay"]').valueAsNumber,o=document.querySelector('input[name="step"]').valueAsNumber,r=document.querySelector('input[name="amount"]').valueAsNumber,l=1;n||(n=0);o||(o=0);r||(r=0);let u=n;r&&(intervalId=setInterval((()=>{var t,a;(t=l,a=u,new Promise(((e,n)=>{const o=Math.random()>.3;setTimeout((()=>{o?e({position:t,delay:a}):n({position:t,delay:a})}),a)}))).then((({position:t,delay:n})=>{e(i).Notify.success(`✅ Fulfilled promise ${t} in ${n}ms`)})).catch((({position:t,delay:n})=>{e(i).Notify.failure(`❌ Rejected promise ${t} in ${n}ms`)})),u=n+o*l,l+=1,l>r&&clearInterval(intervalId)}),0))}));
//# sourceMappingURL=03-promises.f3007588.js.map
