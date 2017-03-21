import {
  getCommodityOrders,
  updateCommodityOrderState,
  updateCommodityOrderInfo,
  downloadOrders,
} from '../services/orders'

import {AL} from '../utils'

export default {

  namespace: 'orders',

  // 数据
  state: {

    /* 数据层 */

    // 选中的订单列表
    // selectes,

    // 订单列表
    list: [],
    // 选中订单列表
    selectedList:[],
    // 订单总数
    total:0,

    // 搜索信息
    searchInfo: {

      limit : 100,
      skip  : 0,

      createdFromDate   : null,
      createdToDate     : null,
      deliveryFromDate  : null,
      deliveryToDate    : null,
      // 状态信息
      states  : [2,3,5,7],
      // 渠道信息
      channels : [],
      // 只显示自营的订单
      isOnlyBloom : false,
      // 只显示未打印的订单
      isOnlyNotToPrint : false,

      keyword : "",
      timestamp : 0,
      sort  : "",
    },

    /* UI层 */
    loading: false,

    /* 加载中标识 */
    loadings : {
      isLoadOrder:false,
      isUpdatetOrderInfo:false,
      isUpdatetOrderState:false,
    },

    modalOptions: {

      commodity : null,
      commodityVisible : false,
      commodityIsEditing: false,
      commodityIsLoading : false,

      order : null,
      orderVisible : false,
      orderIsEditing : false,
      orderIsLoading:false,

    },

  },
  // 监听
  subscriptions: {
    setup ({ dispatch, history }) {

      history.listen(location => {

        // if (location.pathname === '/orders') {

          // dispatch({
          //   type: 'query',
          //   payload: location.query
          // })

          // console.log("location.query",location.query);

          dispatch({
            type: 'loadOrders',
            // payload: location.query
          })

        // }
      })
    }
  },

  effects: {

    *loadOrders({
      payload
    }, {
      call,
      put,
      select,
    }) {

      AL.log("--- 请求订单 ---")

      let data = null;

      try {

        // 开始加载
        yield put({
          type: '_startLoadOrder'
        });

        // AL.log("payload", payload)

        if (payload && payload.keyword){

          // 获取订单
          data = yield call(getCommodityOrders, {
            keyword : payload.keyword,
          });

        } else {

          // 修改搜索参数
          yield put({
            type: '_changeSearchInfo',
            payload,
          });

          // 搜索参数
          const searchInfo = yield select(state => state.orders.searchInfo);

          AL.log("搜索参数", searchInfo);

          // 获取订单
          data = yield call(getCommodityOrders, searchInfo);

        }
        // AL.log("搜索结果", data);

      } finally {

        yield put({
          type: '_endLoadOrder',
          payload: data,
        });
      }

    },

    *downloadOrders({
      payload
    }, {
      call,
      put,
      select,
    }){

      // 下载订单
      AL.log("下载订单-downloadOrders",payload)
      yield call(downloadOrders, payload);


    },

    *updateOrderInfo({
      payload
    }, {
      call,
      put,
      select,
    }){

      AL.log("--- 修改订单 ---",payload)
      try{

        // 开始加载
        yield put({
          type: '_startUpdateOrderInfo'
        });

        let newOrder = null;

        if (!AL.isEmpty(payload)){

          // 更新订单
          newOrder = yield call(updateCommodityOrderInfo, payload);

          if (newOrder){
            yield put({
              type: '_changeOrder',
              payload:{
                order:newOrder
              },
            });
          }
          AL.log("修改结果", newOrder);

        }

      }finally{

        yield put({
          type: '_endUpdateOrderInfo',
          // payload: {order:newOrder},
        });

      }

    },

    *updateOrderState({
      payload
    }, {
      call,
      put,
      select,
    }){

      console.log("--- 更新订单状态 ---")

      let {
        orders,
      } = payload;

      try{

        // 开始加载
        yield put({
          type: '_startUpdateOrderState',
          payload:{
            orders,
          },
        });

        AL.log("payload",payload);

        // const {
        //     orders
        // } = payload;

        orders = yield call(updateCommodityOrderState, payload);
        AL.log("orders",orders);
      // }catch(err){
      //   AL.log("error",err);

      }finally{

        yield put({
          type: '_endUpdateOrderState',
          payload: {
            orders
          },
        });

      }

    },
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

        let {
          // page,
          // pageSize,
          limit,
          skip,
          createdFromDate,
          createdToDate,
          deliveryFromDate,
          deliveryToDate,
          states,
          channels,
          isOnlyBloom,
          isOnlyNotToPrint,
          // keyword,
          // timestamp:0,
          // sort,
        } = payload;

        // AL.log("page",page);
        // AL.log("pageSize",pageSize);
        // if (page && !AL.isNumber(page)){
        //     page = parseInt(page);
        // }
        // if (pageSize && !AL.isNumber(pageSize)){
        //     pageSize = parseInt(pageSize);
        // }

        // if (AL.isNumber(page) && AL.isNumber(pageSize)){
        //
        //   newState.searchInfo.limit = pageSize;
        //   newState.searchInfo.skip = (page-1) * pageSize;
        //
        //   newState.pagination.current = page;
        //   newState.pagination.pageSize = pageSize;
        //
        //   // AL.log("newState.searchInfo", newState.searchInfo);
        // }

        const {
          searchInfo,
        } = state;

        if (AL.isNumber(limit)){
          // AL.log("limit",limit);
          searchInfo.limit = limit;
        }

        if (AL.isNumber(skip)){
          // AL.log("skip",skip);
          searchInfo.skip = skip;
        }

        // if (AL.isDate(createdFromDate)){
          searchInfo.createdFromDate = createdFromDate;
        // }

        // if (AL.isDate(createdToDate)){
          searchInfo.createdToDate = createdToDate;
        // }

        // if (AL.isDate(deliveryFromDate)){
          searchInfo.deliveryFromDate = deliveryFromDate;
        // }

        // if (AL.isDate(deliveryToDate)){
          searchInfo.deliveryToDate = deliveryToDate;
        // }

        if (AL.isArray(states) && states.every((state)=>(AL.isNumber(state)))){
          searchInfo.states = states;
        }

        if (AL.isArray(channels) && channels.every((channel)=>(AL.isString(channel)))){
          searchInfo.channels = channels;
        }

        if (AL.isBoolean(isOnlyBloom)){
          searchInfo.isOnlyBloom = isOnlyBloom;
        }

        if (AL.isBoolean(isOnlyNotToPrint)){
          searchInfo.isOnlyNotToPrint = isOnlyNotToPrint;
        }

        // AL.log("searchInfo",searchInfo);

        return {
          ...state,
          searchInfo,
        };
    },

    _changeOrder(state, {
      payload
    }){

      if (AL.isEmpty(payload)){
          return state;
      }

      const {
        order:newOrder,
      } = payload;

      if (!AL.isAVObject(newOrder)){
        return state;
      }

      const newState = {
        ...state,
      }

      // newState.list = newState.list.map((order)=>{
      //   return {
      //     ...order,
      //     state:2,
      //   }
      // });

      newState.list = newState.list.map((order)=>{
        if (order.objectId === newOrder.objectId){

          // AL.log("newOrder-list",{
          //   ...order,
          //   ...newOrder,
          // });

          return {
            ...order,
            ...newOrder,
          };
        }
        return order;
      });

      if (AL.isAVObject(newState.modalOptions.order)
      && newState.modalOptions.order.objectId === newOrder.objectId){

        // AL.log("newOrder-modalOptions",{
        //   ...order,
        //   ...newOrder,
        // });

        newState.modalOptions.order = {
          ...newState.modalOptions.order,
          ...newOrder,
        };
      }

      return newState;

    },

    _startLoadOrder(state) {
      return {
        ...state,
        loading: true,
      }
    },

    _endLoadOrder(state, {
      payload,
      error,
    }) {

      if (!error && payload) {

        let {
          order,
          // 订单列表
          orders,
          // 订单总数
          total,
          // limit,
          // skip,
          ...params,
        } = payload;

        // AL.log("orders",orders);

        return {
          ...state,
          loading: false,
          list:orders.map((order)=>{
            if (!order.loading){
              order.loading = false;
            }
            return order;
          }),
          total,
          ...params,
        };
      }

      return {
        ...state,
        loading: false,
        error,
      };
    },

    _startUpdateOrderInfo(state) {
      return {
        ...state,
        loadings : {
          ...state.loadings,
          isUpdatetOrderInfo:true,
        },
      }
    },

    _endUpdateOrderInfo(state, {
      payload,
      error,
    }) {
      return {
        ...state,
        modalOptions:{
          ...state.modalOptions,
          orderIsEditing:false,
        },
        loadings : {
          ...state.loadings,
          isUpdatetOrderInfo:false,
        },
      }
    },

    _startUpdateOrderState(state, {
      payload,
    }) {

      const {
        orders:newOrders,
      } = payload;

      const newState = {
        ...state,
      }

      newState.list = newState.list.map((order)=>{

          if (newOrders.some((newOrder)=>(newOrder.objectId === order.objectId))){
            AL.log("发现相同Id")
            return {
              ...order,
              loading : true,
            };
          }
          return order;
      });

      // AL.log("newState",newState);

      return newState;

    },

    _endUpdateOrderState(state, {
      payload,
      error,
    }) {

      const {
        orders:newOrders,
      } = payload;

      // AL.log("list",state.list)

      const newState = {
        ...state,
      }

      newState.list = newState.list.map((order)=>{

          let tmpOrder = {
            ...order,
          };
          newOrders.forEach((newOrder)=>{

              if (newOrder.objectId === order.objectId){
                tmpOrder = {
                  ...order,
                  state : newOrder.state,
                  loading : false,
                };
              }

          });

          return tmpOrder;
      });

      return newState;

    },

    changeCommodityModalVisible(state, {
      payload,
    }){

      AL.log("改变model-commodity-action");

      const {
        commodity,
        visible,
      } = payload;

      const newState = {
        ...state,
      };
      if (AL.isAVObject(commodity)){
          newState.modalOptions.commodity = null;
          newState.modalOptions.commodity = commodity;
      }
      newState.modalOptions.commodityVisible = visible;

      return newState;
    },

    changeOrderModalVisible(state, {
      payload,
    }){

      const {
        order,
        visible,
        isEditing,
      } = payload;

      const newState = {
        ...state,
      };
      if (AL.isAVObject(order)){
        newState.modalOptions.order = null;
        newState.modalOptions.order = order;
      }
      newState.modalOptions.orderVisible = visible;
      newState.modalOptions.orderIsEditing = isEditing;

      return newState;
    },

  }

}
