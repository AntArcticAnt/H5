import DVA from 'dva';

import {
  Toast,
} from 'antd-mobile';

import {
  browserHistory,
} from 'dva/router';

// import './index.css';

// 1. Initialize
const dva = DVA({
  // 初始数据，优先级高于 model 中的 state，默认是 {}
  initialState: {},
  // 路由用的 history，默认是 hashHistory
  history: browserHistory,
  // 打印被触发的action
  // onAction: createLogger({}),
  // 全局错误处理
  onError(e) {
    console.log('error', e);
    Toast.fail(`${e.message} ${e.code}`, /* duration */5, null, false);
  },
});

// 2. Plugins
// dva.use({});

// 3. Model
dva.model(require('./models/app'));
dva.model(require('./models/home'));
dva.model(require('./models/theme'));
dva.model(require('./models/discover'));
dva.model(require('./models/mine'));

// 4. Router
dva.router(require('./router'));

// 5. Start
dva.start('#root');
