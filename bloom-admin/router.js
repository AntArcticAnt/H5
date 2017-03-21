import React from 'react'
import { Router, Route, IndexRoute } from 'dva/router'

import App from './routes/app'
import orders from './routes/orders'
import commodities from './routes/commodities'
import error from './routes/error'

export default function ({history, app}) {
//向外面暴露一个函数
  return (
    <Router history={history}>
      <Route path="/" component={App}>
      {/*路由设置  */}
      <IndexRoute component={orders} />
      {/*首页路由  */}
      <Route path="/orders" component={orders} />
      {/* orders */}
      <Route path="/commodities" component={commodities} />
      {/* commodities */}
      <Route path="/*" component={error} />
      </Route>
    </Router>
  );
  /*
  <Route path="/ui/ico" component={ico} />
  <Route path="/ui/search" component={search} />
  <Route path="/*" component={error} />
  **/

  /*
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          app.model(require('./models/dashboard'))
          cb(null, {component: require('./routes/dashboard')})
        })
      },
      childRoutes: [
        {
          path: 'dashboard',
          name: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.model(require('./models/dashboard'))
              cb(null, require('./routes/dashboard'))
            })
          }
        },
        {
          path: 'users',
          name: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              app.model(require('./models/users'))
              cb(null, require('./routes/users'))
            })
          }
        },
        {
          path: 'orders',
          name: 'orders',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              // app.model(require('./models/orders'))
              cb(null, require('./routes/orders'))
            })
          }
        },
        {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes} />
  **/
}
