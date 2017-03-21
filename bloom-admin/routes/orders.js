import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import OrderSearchView from '../components/orders/SearchView'
import OrderTabelView from '../components/orders/TabelView'
import CommodityModalView from '../components/commodities/DetailModalView'
import OrderModalView from '../components/orders/OrderModalView'

import {AL} from '../utils'

const Orders = ({
  location,
  dispatch,
  orders
}) => {

  // orders Model 数据
  const {
    loading,
    loadings,
    list,
    selectedList,
    total,
    searchInfo,
    modalOptions,
    // pagination,
    currentItem,
    modalVisible,
    modalType
  } = orders;

  // 系统参数
  const {
    field,
    keyword
  } = location.query;

  // 方法
  // 翻页方法
  function handlePageChange(page) {

    // 路由传参--只能穿string?
    // dispatch(routerRedux.push({
    //   pathname: '/orders',
    //   query: {
    //     page: parseInt(page.current),
    //     pageSize: parseInt(page.pageSize)
    //   }
    // }))

    AL.log("翻页",page);

    const {
      current:pageNumber,
      pageSize,
    } = page;

    const payload = {
      limit : parseInt(pageSize),
      skip : (parseInt(pageNumber)-1) * parseInt(pageSize),
    };

    console.log("翻页-payload", payload);

    dispatch({
      type: 'orders/loadOrders',
      payload,
    });

  };

  // 查看商品详情modal
  function onCommodityModal(commodity){

    AL.log("查看商品",commodity.name);

    dispatch({
      type: 'orders/changeCommodityModalVisible',
      payload: {
        commodity,
        visible:true,
      }
    });
  }

  // 查看订单详情modal
  function showDisplayOrderModal(order) {

    AL.log("查看order-modal",order.receiverName);

    dispatch({
      type: 'orders/changeOrderModalVisible',
      payload: {
        order,
        visible:true,
        isEditing:false,
      }
    });
  }

  // 显示编辑订单modal
  function showEditOrderModal(order){

    AL.log("编辑order-modal",order.receiverName);

    dispatch({
      type: 'orders/changeOrderModalVisible',
      payload: {
        order,
        visible:true,
        isEditing:true,
      }
    });
  }

  // 隐藏订单modal
  function hideOrderModal(){

    AL.log("取消order-modal");
    dispatch({
      type: 'orders/changeOrderModalVisible',
      payload: {
        order:null,
        visible:false,
      }
    });
  }

  // 保存编辑结果
  function updateOrderInfo(values) {

    AL.log("保存order-edit",values);

    dispatch({
      type: 'orders/updateOrderInfo',
      payload: values
    });
  }
  // 更新订单状态
  function updateOrderState(orders) {

    AL.log("更新order状态-function",orders);

    dispatch({
      type: 'orders/updateOrderState',
      payload: {
        orders,
      }
    });
  }

  // 下载Excel
  function downloadOrders(orderIds){

    AL.log("下载订单-function",orderIds);

    dispatch({
      type: 'orders/downloadOrders',
      payload: {
        orderIds,
      }
    });
  }

  // 订单搜索方法
  function handleSearch(params) {

    AL.log("搜索方法", params);

    const {
      createdFromDate,
      createdToDate,
      deliveryFromDate,
      deliveryToDate,
      states,
      channels,
      isOnlyBloom,
      keyword,
    } = params;

    dispatch({
      type: 'orders/loadOrders',
      payload: params
    })
  }

  // 构建-订单数据
  const orderListProps = {
    // 加载中状态
    loading,
    // table数据
    // list: list.map((order)=>{
    //   // 数据整合
    //   order.person = {
    //     receiverName:order.receiverName,
    //     senderName:order.senderName,
    //     receiverPhone:order.receiverPhone,
    //     senderPhone:order.senderPhone,
    //   }
    //   //:AL.string2date(item.deliveryToDate.iso, "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'"),
    //   order.date = {
    //     createdAt:order.createdAt,
    //     deliveryFromDate:order.deliveryFromDate,
    //     deliveryToDate:order.deliveryToDate,
    //   }
    //
    //   let {
    //     appName,
    //     platform,
    //     version,
    //   } = order;
    //
    //   if (!platform || !version){
    //     if (appName==="BLOOM"){
    //         platform = "iOS";
    //         version = "1.6.0";
    //     }
    //   }
    //
    //   order.channel = {
    //     // channel:order.channel,
    //     appName,
    //     platform,
    //     version,
    //   }
    //
    //   return order;
    //
    // }),
    list,
    selectedList,

    total,

    // 搜索数据
    searchInfo,

    // 改变订单状态

    // 翻页方法
    handlePageChange,

    // 查看商品详情方法
    onCommodityModal,

    // 查看订单详情方法
    showDisplayOrderModal,
    // 编辑订单状态方法
    showEditOrderModal,

    // 更新订单状态
    updateOrderState,

    // 下载订单
    downloadOrders,

  }

  // 构建-订单查询属性
  const orderSearchProps = {
    // 搜索数据
    searchInfo,
    // 搜索方法
    handleSearch,

  }

  const commodityModalProps = {
    visible : modalOptions.commodityVisible,
    commodity   : modalOptions.commodity,
    isEditing : modalOptions.commodityIsEditing,
    onOk() {
      AL.log("确认按钮");
      dispatch({
        type: 'orders/changeCommodityModalVisible',
        payload: {
          commodity:null,
          visible:false,
        }
      });
    },
    onCancel(e) {
      AL.log("取消按钮");
      dispatch({
        type: 'orders/changeCommodityModalVisible',
        payload: {
          commodity:null,
          visible:false,
        }
      });
    }
  }


  const orderModalProps = {
    visible : modalOptions.orderVisible,
    order   : modalOptions.order,
    isEditing : modalOptions.orderIsEditing,
    // loading: modalOptions.orderIsLoading,
    // 查看订单详情方法
    showDisplayOrderModal,
    // 显示编辑订单modal
    showEditOrderModal,
    // 保存编辑结果
    updateOrderInfo,
    // 更新订单状态
    updateOrderState,
    // 取消modal
    hideOrderModal,
    // 加载状态
    isUpdatetOrderInfo:loadings.isUpdatetOrderInfo,
    isUpdatetOrderState:loadings.isUpdatetOrderState,

    // onCancel(e) {
    //   AL.log("取消按钮");
    //   dispatch({
    //     type: 'orders/changeOrderModalVisible',
    //     payload: {
    //       order:null,
    //       visible:false,
    //     }
    //   });
    // }
  }

  return (

      <div className='content-inner'>

        {/* 搜索栏 - 属性比较多，可以构建一个属性对象 */}
        <OrderSearchView {...orderSearchProps} />

        {/* 订单列表 + 分页 */}
        <OrderTabelView {...orderListProps} />

        {/* 商品详情窗口 */}
        <CommodityModalView {...commodityModalProps} />

        {/* 订单详情窗口 */}
        <OrderModalView {...orderModalProps} />

      </div>
  );
}

Orders.propTypes = {
  orders: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ orders }) {
  return { orders }
}

export default connect(mapStateToProps)(Orders)
