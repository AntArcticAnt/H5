import * as usersService from '../services/users';

export default {
  //相当于暴露出去的变量是一个对象包含四个键值对,

  // namespace,
  // state,
  // reducers,
  // effects
  //subscriptions
  namespace: 'users123',
//  namespace命名空间 相当于 一个标记,一个id.
//  model的命名空间，同时也是他在全局 state 上的属性，只能用字符串，不支持通过 . 的方式创建多层命名空间。

  state: {
    list: [],
    total: null,
    page: null,
  },
  //最重要的state状态==>immutable(!!!! 没有更改,只有销毁与新建)

// actions在哪里???
// actions
  reducers: {
  //达到的效果reducers
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    //
  },


// effects是一个对象==>
// 键值对为变量==>函数
// 函数内,一般为两个yield(yield call和yield put),
// 第一个一般调用service中的方法.第二个传参为键值对type和payload

  effects: {
// 异步==>同步 的效果
    *fetch({ payload: { page = 1 } }, { call, put }) {
      //*fetch 声明的函数
      //({ payload: { page = 1 } }, { call, put })  传参和默认参数
      //{page=1}是什么???  ==>是不是,如果传进来的第一个对象参数中有payload,var page=payload,如果没有var page=1;
      // payload是什么???  ===>
      // call变量是什么?===>应该是一个函数方法
      // put变量是什么? ==>应该是一个函数方法
      const { data, headers } = yield call(usersService.fetch, { page });
      // usersService是一个文件暴露出来的对象(函数方法集合===>用了里面的fetch方法)

      //触发方法=>(函数方法,{1})

      // usersService.fetch如下:
      // export function fetch({ page }) {
      //   return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
      // }



      // 获得两个变量data和headers   ===>
      yield put({
        type: 'save',
        payload: {
          data,//使用上一个yield获取的常量data
          total: parseInt(headers['x-total-count'], 10),
          //猜测headers是一个对象,而且有一个键为x-total-count
          page: parseInt(page, 10),
          // 实参
        },
      });
    },


    *remove({ payload: id }, { call, put }) {
      //*remove函数?
      // 参数==>  ({从传进来的对象中选择payload变量=>新增变量id指针},{从中提取变量call和input})
      yield call(usersService.remove, id);
      // yield 变量(方法,变量)
      yield put({ type: 'reload' });
        // yield 变量(一个对象)
    },

  // 同上
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },

  // 同上
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },

  // 同上
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },


  },







  subscriptions: {
    setup({ dispatch, history }) {
      // 定义函数setup==>传进来的对象参数解构赋值,变量为dispatch和history
      return history.listen(({ pathname, query }) => {
        // history中的方法history.listen(),传进来的参数为解构赋值的path和query
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
          //
        }
      });
    },
  },
};
