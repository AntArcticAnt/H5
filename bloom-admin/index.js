import DVA from 'dva';
//DVA变量==>容器
// import './index.html';
import './index.css';
// 导入css样式

// 1. 初始化
import {
  browserHistory
} from 'dva/router';
//browserHistory是变量==>

import {
  message
} from 'antd';

import createLogger from 'redux-logger';
// 搜索createLogger

const dva = DVA({
  // 初始数据，优先级高于 model 中的 state，默认是 {}
  initialState: {},
  // 路由用的 history，默认是 hashHistory
  // history: browserHistory,
  // 打印被触发的action
  // onAction: createLogger({}),
  // 全局错误处理
  onError(e) {
    console.log("error",e);
    message.error(`${e.message} ${e.code}`, /* duration */ 5);
  },
});

// 2. 中间件
/*
  loading: {
    global: false,
    models: {
      users: false,
      todos: false,
      ...
    },
  }
**/
import createLoading from 'dva-loading';
dva.use(createLoading());

// 3. 模块
dva.model(require('./models/app'))   //和这句话有没有关系??? ({app}) => ({app})
// dva.model(require('./models/users'))
dva.model(require('./models/commodities'))
dva.model(require('./models/orders'))

// dva.model(require('./models/dashboard'))


// 4. 路由(Page纬度)
dva.router(require('./router'))
// 同样的引入了一个函数??
// 一个函数,引入了一个函数,

// 5. Start
dva.start('#root')
