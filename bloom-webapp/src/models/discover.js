import {
  getCommodities,
  updateCommodity,
  createCommodity,
} from '../services/home'

import {AL} from '../utils'
import Immutable from 'seamless-immutable'

export default {

  namespace: 'discover',
  // 数据==》命名空间
  state: Immutable({

    /* 数据层 */
    list: [],

    /* UI层 */
    loading: false,
  }),
  // 监听
  subscriptions: {

    // setup ({ dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '#/home') {
    //       dispatch({
    //         type: 'loadCommodities',
    //       })
    //     }
    //   })
    // }
  },
  // 异步
  effects: {

  },
  // 同步
  reducers: {

  }
}
