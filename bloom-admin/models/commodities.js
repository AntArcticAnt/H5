import {
  getCommodities,
  updateCommodity,
} from '../services/commodities'

import {AL} from '../utils'

export default {

  namespace: 'commodities',

  // 数据
  state: {

    /* 数据层 */

    // 商品列表
    list: [],
    // 选中订单列表
    selectedList:[],
    // 订单总数
    total:0,

    // 搜索信息
    searchInfo: {

      limit : 100,
      skip  : 0,

      // 渠道信息
      // channels : [],
      // 只显示自营的订单
      isOnlyBloom : false,
      // 只显示未打印的订单
      // isOnlyNotToPrint : false,

      keyword : "",
      sort  : "",
    },

    /* UI层 */
    loading: false,

    /* 加载中标识 */
    // loadings : {
    //
    // },
    modals:{
      commodity:{
        object:null,
        visible : false,
        isEditing: false,
        isLoading : false,
      }
    }
  },
  // 监听
  subscriptions: {

    setup ({ dispatch, history }) {
      history.listen(location => {
          dispatch({
            type: 'loadCommodities',
          })
      })
    }
  },

  effects: {

    *loadCommodities({
      payload
    }, {
      call,
      put,
      select,
    }) {

      AL.log("--- 请求商品 ---")

      let data = null;

      try {

        // 开始加载
        yield put({
          type: '_startLoadCommodity'
        });

        AL.log("payload", payload)

        // if (payload && payload.keyword){
        //
        //   // 获取订单
        //   data = yield call(getCommodityOrders, {
        //     keyword : payload.keyword,
        //   });
        //
        // } else {
        //
          // 修改搜索参数
          yield put({
            type: '_changeSearchInfo',
            payload,
          });

          // 搜索参数
          const searchInfo = yield select(state => state.commodities.searchInfo);

          AL.log("搜索参数", searchInfo);

          // 获取商品
          data = yield call(getCommodities, searchInfo);

        // }
        // AL.log("搜索结果", data);

      } finally {

        yield put({
          type: '_endLoadCommodity',
          payload: data,
        });
      }

    },

    *updateCommodity({
      payload
    }, {
      call,
      put,
      select,
    }){

      AL.log("--- 修改商品 ---",payload)
      try{

        // 开始加载
        yield put({
          type: '_startUpdateCommodity'
        });

        let newCommodity = null;

        if (!AL.isEmpty(payload)){

          // 更新订单
          newCommodity = yield call(updateCommodity, payload);

          if (AL.isAVObject(newCommodity)){

            yield put({
              type: '_changeCommodity',
              payload:{
                commodity:newCommodity
              },
            });
          }
          AL.log("修改结果", newCommodity);

        }

      }finally{

        yield put({
          type: '_endUpdateCommodity',
        });
      }
    },

    *addCommodity({
      payload
    }, {
      call,
      put,
      select,
    }){

    }
    // *updateOrderState({
    //   payload
    // }, {
    //   call,
    //   put,
    //   select,
    // }){
    //
    //   console.log("--- 更新订单状态 ---")
    //
    //   let {
    //     orders,
    //   } = payload;
    //
    //   try{
    //
    //     // 开始加载
    //     yield put({
    //       type: '_startUpdateOrderState',
    //       payload:{
    //         orders,
    //       },
    //     });
    //
    //     AL.log("payload",payload);
    //
    //     // const {
    //     //     orders
    //     // } = payload;
    //
    //     orders = yield call(updateCommodityOrderState, payload);
    //     AL.log("orders",orders);
    //   // }catch(err){
    //   //   AL.log("error",err);
    //
    //   }finally{
    //
    //     yield put({
    //       type: '_endUpdateOrderState',
    //       payload: {
    //         orders
    //       },
    //     });
    //
    //   }
    //
    // },
  },

  reducers: {

    // 改变查询条件
    _changeSearchInfo(state, {
      payload
    }) {

        AL.log("改变查询条件")

        if (AL.isEmpty(payload)){
            return state;
        }

        return {
          ...state,
          searchInfo:{
            ...state.searchInfo,
            ...payload,
          }
        };

    },

    _changeCommodity(state, {
      payload
    }){

      if (AL.isEmpty(payload)){
          return state;
      }

      const {
        commodity:newCommodity,
      } = payload;

      if (!AL.isAVObject(newCommodity)){
        return state;
      }

      const newState = {
        ...state,
      }

      newState.list = newState.list.map((commodity)=>{
        if (commodity.objectId === newCommodity.objectId){

          return {
            ...commodity,
            ...newCommodity,
          };
        }
        return commodity;
      });

      if (AL.isAVObject(newState.modals.commodity.object)
      && newState.modals.commodity.object.objectId === newCommodity.objectId){

        newState.modals.commodity.object = {
          ...newState.modals.commodity.object,
          ...newCommodity,
        };
      }

      return newState;

    },

    _startLoadCommodity(state) {
      return {
        ...state,
        loading: true,
      }
    },

    _endLoadCommodity(state, {
      payload,
      error,
    }) {

      if (!error && payload) {

        let {
          // 商品列表
          commodities,
          // 商品总数
          total,
          // 其他参数
          ...params,
        } = payload;

        // AL.log("orders",orders);

        return {
          ...state,
          loading: false,
          list:commodities.map((commodity)=>{
            if (!commodity.loading){
              commodity.loading = false;
            }
            return commodity;
          }),
          total,
          ...params,
        };
      }
    },

    _startUpdateCommodity(state) {

      return {
        ...state,
        modals : {
          ...state.modals,
          commodity:{
            ...state.modals.commodity,
            isLoading:true,
          },
        },
      }
    },

    _endUpdateCommodity(state, {
      payload,
      error,
    }) {

      return {
        ...state,
        modals : {
          ...state.modals,
          commodity:{
            ...state.modals.commodity,
            isEditing:false,
            isLoading:false,
          },
        },
      }
    },

    // _startUpdateOrderState(state, {
    //   payload,
    // }) {
    //
    //   const {
    //     orders:newOrders,
    //   } = payload;
    //
    //   const newState = {
    //     ...state,
    //   }
    //
    //   newState.list = newState.list.map((order)=>{
    //
    //       if (newOrders.some((newOrder)=>(newOrder.objectId === order.objectId))){
    //         AL.log("发现相同Id")
    //         return {
    //           ...order,
    //           loading : true,
    //         };
    //       }
    //       return order;
    //   });
    //
    //   // AL.log("newState",newState);
    //
    //   return newState;
    //
    // },
    //
    // _endUpdateOrderState(state, {
    //   payload,
    //   error,
    // }) {
    //
    //   const {
    //     orders:newOrders,
    //   } = payload;
    //
    //   // AL.log("list",state.list)
    //
    //   const newState = {
    //     ...state,
    //   }
    //
    //   newState.list = newState.list.map((order)=>{
    //
    //       let tmpOrder = {
    //         ...order,
    //       };
    //       newOrders.forEach((newOrder)=>{
    //
    //           if (newOrder.objectId === order.objectId){
    //             tmpOrder = {
    //               ...order,
    //               state : newOrder.state,
    //               loading : false,
    //             };
    //           }
    //
    //       });
    //
    //       return tmpOrder;
    //   });
    //
    //   return newState;
    //
    // },

    changeCommodityModalVisible(state, {
      payload,
    }){

      AL.log("改变-model-commodity-action",payload);

      const {
        commodity,
        visible,
        isEditing=false,
      } = payload;

      const newState = {
        ...state,
      };

      if (AL.isAVObject(commodity)){
          newState.modals.commodity.object = commodity;
      }
      newState.modals.commodity.visible = visible;
      newState.modals.commodity.isEditing = isEditing;

      return newState;
    },

    // changeOrderModalVisible(state, {
    //   payload,
    // }){
    //
    //   const {
    //     order,
    //     visible,
    //     isEditing,
    //   } = payload;
    //
    //   const newState = {
    //     ...state,
    //   };
    //
    //   newState.modalOptions.order = order;
    //   newState.modalOptions.orderVisible = visible;
    //   newState.modalOptions.orderIsEditing = isEditing;
    //
    //   return newState;
    // },

  }

}
