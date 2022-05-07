import firebase from 'firebase';
// import 'firebase/auth';

export const initFireBase = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCYLfjHX-qcawu0bSzbZojRUAVfQ5p3z7Q",
    authDomain: "my-kiss-1d8cf.firebaseapp.com",
    projectId: "my-kiss-1d8cf",
    storageBucket: "my-kiss-1d8cf.appspot.com",
    messagingSenderId: "432264437470",
    appId: "1:432264437470:web:b6e1d2209c3f0d1072ac4f",
    measurementId: "G-FNFJJNEBBX"
  };
  //   const firebaseConfig = {
  //     apiKey: "AIzaSyCnujueeNyGbVrKQ5DYbn5QUsawKhEDW_g",
  //     authDomain: "test-firebase-c8093.firebaseapp.com",
  //     projectId: "test-firebase-c8093",
  //     storageBucket: "test-firebase-c8093.appspot.com",
  //     messagingSenderId: "415879349261",
  //     appId: "1:415879349261:web:05be74fe3915d43ce80144"
  //   };
  //// Initialize Firebase

  firebase.initializeApp(firebaseConfig);

};


// 设备检测
/* eslint  no-cond-assign:0 radix:0 */
interface IUAProps {
  ie?: any
  firefox?: any
  chrome?: any
  opera?: any
  safari?: any
  android?: any
  iphone?: any
  ipad?: any
  ipad13?: any
  ios?: any
  isWin32?: any
  isWeixin?: any
  isUcweb?: any
  isMqq?: any
  isWeiBo?: any
  isMobile?: any
}
export const getUA = () => {
  const UA: IUAProps = {};
  const ua = navigator.userAgent.toLowerCase();
  let s: boolean | string[] | null;
  UA.ie = (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))
    ? parseInt(s[2])
    : false;
  UA.firefox = (s = ua.match(/firefox\/([\d.]+)/)) ? parseInt(s[1]) : false;
  UA.chrome = (s = ua.match(/chrome\/([\d.]+)/)) ? parseInt(s[1]) : false;
  UA.opera = (s = ua.match(/opera.([\d.]+)/)) ? parseInt(s[1]) : false;
  UA.safari = (s = ua.match(/version\/([\d.]+).*safari/))
    ? parseInt(s[1])
    : false;
  UA.android = (s = ua.match(/android/)) ? s : false;
  UA.iphone = (s = ua.match(/iphone os/)) ? s : false;
  UA.ipad = (s = ua.match(/ipad/)) ? s : false;
  //ipad中  ios13之后，navigator.userAgent不包含ipad字段
  UA.ipad13 = (s = ua.match(/mac/) && navigator.maxTouchPoints > 1)
    ? { s }
    : false;
  UA.ios = UA.ipad || UA.iphone || UA.ipad13;
  UA.isWin32 = /win32/i.test(window.navigator.platform);
  UA.isWeixin = (s = ua.match(/MicroMessenger/i)) ? !!s : false; // 判断是否是在微信浏览器里面
  UA.isUcweb = (s = ua.match(/ucbrowser/)) ? !!s : false;
  UA.isMqq = (s = ua.match(/mqqbrowser/)) ? !!s : false; // 是否是手机qq浏览器
  UA.isWeiBo = (s = ua.match(/__weibo__/)) ? !!s : false; // 是否微博浏览器
  // console.log(UA);

  UA.isMobile = UA.android || UA.ios;
  return UA;
};


//初始化根标签的font-size  设计稿375  
export function initRem(): void {
  const docEle = document.documentElement;
  const { isMobile } = getUA();
  window.isMobile = isMobile;
  function setHtmlFontSize() {
    let deviceWidth = docEle.clientWidth || window.innerWidth;

    if (!isMobile) {
      return (docEle.style.fontSize = '100px');
    }

    const getWidth = () => {
      if (deviceWidth >= 750) {
        return 750;
      }
      if (deviceWidth <= 320) {
        return 320;
      }
      return deviceWidth;
    };
    const fontSize = getWidth() / 3.75;
    console.log("🚀 ~ file: util.ts ~ line 87 ~ setHtmlFontSize ~ fontSize", fontSize)
    docEle.style.fontSize = fontSize.toFixed(3) + 'px';
  }
  setHtmlFontSize();
  if (isMobile) window.addEventListener('resize', setHtmlFontSize);
}


//函数等待暂停
export function sleep(time:number) {
  let timeStamp = new Date().getTime()
  let entTimeStamp = timeStamp + time
  while (true) {
    if (entTimeStamp < new Date().getTime()) {
      return 
    }
  }
}


//函数防抖--连续触发，结束单位时间后|先立即     再执行函数
export function debounce(fn:Function,delay:number=0,immediate?:boolean) {
 
  
  let timeout: NodeJS.Timeout | null ;
  let debounced = function (this: any) {
       //存储触发防抖函数时的this实例
       let _this = this
       //存储event对象
       let args = arguments
       //清除timeout变量代表的setTimeout定时器函数，
       //timeout本身还是原来setTimeout定时器的id  
       !!timeout && clearTimeout(timeout)

       //首次立即执行，之后在delay时间后函数触发才执行
       if (immediate) {
           let callNow = !timeout
           // 在时间间隔delay内，多次触发防抖函数，计时重新累计
           timeout = setTimeout(() => {
               timeout = null
           }, delay);

           if(callNow)  fn.apply(this,args)
       }else{
           timeout = setTimeout(() => {
                 fn.apply(_this,args)
           },delay)
       }

      //  return result

  }
   
  // debounced.cancel = function(){
  //     timeout&&clearTimeout(timeout)
  //     timeout = null
  // }

  return debounced
}

//函数节流---若干时间内每隔delay时间段只能触发一次函数，
export function throttle( fn:Function,delay:number,immediate?:boolean) {
    let timer:NodeJS.Timeout | null;
    
    return function(this: any){
      var args = arguments
     
      //先立即执行再节流
      if (!!immediate && !timer) {
        let isNow = !timer
        isNow && fn.apply(this,args)
        timer = setTimeout(() => {
            timer&&clearTimeout(timer)
            timer = null
        },delay)
      }

      //直接节流执行
      if(!timer && !immediate){
        timer = setTimeout(() => {
          // timer&&clearTimeout(timer)
          timer = null
          fn.apply(this,args)
        },delay)
      }
        
    }
}