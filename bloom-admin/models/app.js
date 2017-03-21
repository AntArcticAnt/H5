import {
  login,
  getUserInfo,
  logout
} from '../services/app'

import {parse} from 'qs'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {
      username: 'admin'
    },
    // 登录按钮
    loginButtonLoading: false,
    //
    menuPopoverVisible: false,
    // 是否折叠
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    // 是否使用黑色主题
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    // 是否slide是否隐藏在nav中
    isNavbar: document.body.clientWidth < 769
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({
        type: 'checkLogin'
      });
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
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
    *switchSider ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    }
  },
  reducers: {

    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    }
  }
}
