// import {
//   // login,
//   // getUserInfo,
//   // logout
// } from '../services/app'


import Immutable from 'seamless-immutable';

export default {
  namespace: 'app',
  // 命名空间
  state: Immutable({
    login: false,
    loading: false,
    tab: {
      selected:'首页',
      hidden:false,
      items:[
        {
          title:"首页",
          key:"首页",
          icon:"https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
          selectedIcon:"https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
          badge:0,
          dot:false,
        },
        {
          title:"分类",
          key:"分类",
          icon:"https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
          selectedIcon:"https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
          badge:0,
          dot:false,
        },
        {
          title:"发现",
          key:"发现",
          icon:"https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg",
          selectedIcon:"https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg",
          badge:0,
          dot:false,
        },
        {
          title:"我的",
          key:"我的",
          icon:"https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg",
          selectedIcon:"https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg",
          badge:0,
          dot:false,
        },
      ]
    },
  }),
  subscriptions: {
    // setup ({dispatch}) {
    //   dispatch({
    //     type: 'checkLogin'
    //   });
    //   window.onresize = function () {
    //     dispatch({type: 'changeNavbar'})
    //   }
    // }
  },
  effects: {

    *login ({
      payload
    }, {
      call,
      put,
    }) {

      console.log("登录请求")

      try {

        yield put({
          type: 'showLoginButtonLoading'
        });

        const success = yield call(login, parse(payload));

        if (success) {
          console.log("登陆成功")
          yield put({
            type: 'loginSuccess',
            payload: {
              user: {
                username: payload.username
              }
            }})
        } else {
          yield put({
            type: 'loginFail'
          })
        }

      } catch (e) {

        yield put({
          type: 'loginFail'
        })
        throw e;

      } finally {

      }
    },

    *checkLogin ({
      payload
    }, {call, put}) {

      yield put({type: 'showLoading'})

      const userInfo = yield call(getUserInfo, parse(payload))

      if (userInfo && userInfo.username) {

        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              username: userInfo.username
            }
          }
        })
      } else {

        yield put({type: 'hideLoading'})
      }
    },

    *logout ({
      payload
    }, {call, put}) {
      yield call(logout)
      // if (data.success) {
        yield put({
          type: 'logoutSuccess'
        })
      // }
    },

  },
  reducers: {

    selectTab(state,{
      payload
    }){
      console.log('payload',payload);

      return state.merge({
        tab: {
          ...state.tab,
          selected:payload,
        },
      });
    },

    // loginSuccess (state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //     login: true,
    //     loginButtonLoading: false
    //   }
    // },
    // logoutSuccess (state) {
    //   return {
    //     ...state,
    //     login: false,
    //     loginButtonLoading: false
    //   }
    // },
    // loginFail (state) {
    //   return {
    //     ...state,
    //     login: false,
    //     loginButtonLoading: false
    //   }
    // },
    // showLoginButtonLoading (state) {
    //   return {
    //     ...state,
    //     loginButtonLoading: true
    //   }
    // },
    // showLoading (state) {
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // },
    // hideLoading (state) {
    //   return {
    //     ...state,
    //     loading: false
    //   }
    // },
  }
}
