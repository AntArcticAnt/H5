import React from 'react';
import { Router } from 'dva/router';

const cached = {};//一个空的对象,==>  用来存储model.namespace
// 定义一个局部作用域内的函数,后面export使用


// 封装的方法===>为dva.model()添加对应的model对象==>
function registerModel(app, model) {//registerModel注册模型=>参数为app,model
  if (!cached[model.namespace]) {//如果记录中没有
    app.model(model); //dva做处理
    cached[model.namespace] = 1;//记录存在


    // 0. 在index.js里面没有看到Model的处理,是因为在router.sj里面进行了处理,处理方式是
    // 1. 声明一个全局变量=空对象,封装一个函数(两个参数=>app和model),
    // 2. 发生路由跳转的时候,触发函数,
    // 3. 如果对象中没有这个键值对的键model[namespace],
    // 4. 那么触发app.model方法(app) ,app.model(model),并标记存贮这个键值对
    // 5. 如果对象中有这个键值对,没有发生任何改变...
  }
}

function RouterConfig({ history, app }) {
//函数的参数为一个对象,对象里面有两个键,键名为history和app
// history指明了跳转的方式
  const routes = [
    {
      path: '/',
      // 路径
      name: 'IndexPage',
      // 名称
      getComponent(nextState, cb) {
        // 异步加载组件
        //定义一个方法作为键值对,
        require.ensure([], (require) => {
          //require.ensure是什么东西?
          cb(null, require('./routes/IndexPage'));
          //
          //上面没有import引入，是因为下面直接用了require
          //cb是调用getComponent时候传进来的参数,第一个参数是null,第二个参数是JSX页面组件

        });
      },
    },
    {
      path: '/users',
      // 路径
      name: 'UsersPage',
      // 路由名称
      getComponent(nextState, cb) {
        // 键值对声明的函数,往里传参数nextState我猜是对象吧,cb是函数
        require.ensure([], (require) => {
          //触发路由跳转=>同时app.model(model)
          // 按需加载!!!!!!!!!!!!!!!!!!
          registerModel(app, require('./models/users'));
          //app是外面调用Route传进来的参数,是一个函数方法   app(model对象=四个键值对)
          cb(null, require('./routes/Users'));
          //  cb(err, component)
          //cb就是callback函数
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
  //返回值为JSX的Router虚拟DOM对象标签.history是传进来的参数,routes本质是一个数组对象
  // 返回值为标准的异步React-Router格式
}

export default RouterConfig;
