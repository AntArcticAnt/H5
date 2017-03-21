import dva from 'dva';
import { browserHistory } from 'dva/router';
// 路由处理
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.html';    //引入index.html的目的是什么???
import './index.css';     //引入index.css 的目的是什么???

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: browserHistory,//browserHistory设置路由监听
//initialState：指定初始数据，优先级高于 model 中的 state，默认是 {}
  onError(e) {  //报错设置
    message.error(e.message, ERROR_MSG_DURATION);
  },
});
// DVA的设置

// 2. Plugins
app.use(createLoading());
// 使用插件

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));
// ？？？有点疑问？？？==>为什么传入的参数是一个函数
//设置路由,进行了React的封装,获得的变量是一个函数,形参为一个对象，并拆分为history和app两个变量。


// 5. Start
app.start('#root');
// 插入到html结构中

//---------------------------------------------------------------
// dva实例中可以配置的所有属性:

// const app = dva({
//   history,
//   initialState,
//   onError,      //=>可以使用antd的message
//   onAction,
//   onStateChange,
//   onReducer,
//   onEffect,
//   onHmr,
//   extraReducers,
//   extraEnhancers,
// });
