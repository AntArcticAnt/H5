import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import CommoditySearchView from '../components/commodities/SearchView'
import CommodityTabelView from '../components/commodities/TabelView'
import CommodityModalView from '../components/commodities/DetailModalView'
// import OrderModalView from '../components/orders/OrderModalView'

import {AL} from '../utils'

const Commodities = ({
  location,
  dispatch,
  commodities,
}) => {

  // commodities Model 数据
  const {
    loading,
    list,
    selectedList,
    total,
    searchInfo,
    modals,
  } = commodities;

  // 系统参数
  const {
    // field,
    keyword
  } = location.query;

  // 翻页方法
  const onPageChange = (page) => {

    AL.log("翻页方法",page);

    const {
      current:pageNumber,
      pageSize,
    } = page;

    const payload = {
      limit : parseInt(pageSize),
      skip : (parseInt(pageNumber)-1) * parseInt(pageSize),
    };

    AL.log("翻页-payload", payload);

    dispatch({
      type: 'commodities/loadCommodities',
      payload,
    });

  };

  // 查看商品详情modal
  function showCommodityModal(commodity){

    AL.log("查看-commodity-modal",commodity.name);

    dispatch({
      type: 'commodities/changeCommodityModalVisible',
      payload: {
        commodity,
        visible:true,
      }
    });
  }

  // 查看订单详情modal
  // function showDisplayOrderModal(order) {
  //
  //   AL.log("查看order-modal",order.receiverName);
  //
  //   dispatch({
  //     type: 'orders/changeOrderModalVisible',
  //     payload: {
  //       order,
  //       visible:true,
  //       isEditing:false,
  //     }
  //   });
  // }

  // 显示编辑订单modal
  function showEditCommodityModal(commodity){

    AL.log("编辑-commodity-modal",commodity.name);

    dispatch({
      type: 'commodities/changeCommodityModalVisible',
      payload: {
        commodity,
        visible:true,
        isEditing:true,
      }
    });
  }

  // 隐藏订单modal
  // function hideOrderModal(){
  //
  //   AL.log("取消order-modal");
  //   dispatch({
  //     type: 'orders/changeOrderModalVisible',
  //     payload: {
  //       order:null,
  //       visible:false,
  //     }
  //   });
  // }

  // 保存编辑结果
  function updateCommodity(values) {

    AL.log("保存-commodity-edit",values);

    dispatch({
      type: 'commodities/updateCommodity',
      payload: values
    });
  }

  // 新增商品
  function addCommodity(values) {

    AL.log("新增-commodity",values);

    dispatch({
      type: 'commodities/addCommodity',
      payload: values
    });
  }

  // 更新订单状态
  // function updateOrderState(orders) {
  //
  //   AL.log("更新order状态-function",orders);
  //
  //   dispatch({
  //     type: 'orders/updateOrderState',
  //     payload: {
  //       orders,
  //     }
  //   });
  // }

  // 下载Excel
  // function downloadOrders(orderIds){
  //
  //   AL.log("下载订单-function",orderIds);
  //
  //   dispatch({
  //     type: 'orders/downloadOrders',
  //     payload: {
  //       orderIds,
  //     }
  //   });
  // }

  // 订单搜索方法
  function onSearch(params) {

    AL.log("搜索方法", params);

    const {
      isOnlyBloom,
      sort,
      keyword,
    } = params;

    dispatch({
      type: 'commodityies/loadCommodities',
      payload: params
    })
  }

  // 构建-订单数据
  const commodityListProps = {
    // 加载中状态
    loading,
    list,
    selectedList,

    total,

    // 搜索数据
    searchInfo,

    // 改变订单状态

    // 翻页方法
    onPageChange,

    // 查看商品详情方法
    showCommodityModal,

    // 查看订单详情方法
    // showDisplayOrderModal,

    // 编辑商品信息方法
    showEditCommodityModal,

    // 更新订单状态
    // updateOrderState,

    // 下载订单
    // downloadOrders,

  }

  // AL.log("commodityListProps",commodityListProps);

  // 构建-订单查询属性
  const commoditySearchProps = {
    // 搜索数据
    searchInfo,
    // 搜索方法
    onSearch,

  }

  const commodityModalProps = {

    visible : modals.commodity.visible,
    commodity   : modals.commodity.object,
    isEditing : modals.commodity.isEditing,
    isLoading : modals.commodity.isLoading,

    // 显示-商品详情-方法
    showCommodityModal,

    // 显示-编辑商品-方法
    showEditCommodityModal,

    // 保存-编辑商品-方法
    updateCommodity,

    // 新增-商品-方法
    addCommodity,

    onOk() {
      AL.log("确认按钮");
      dispatch({
        type: 'commodities/changeCommodityModalVisible',
        payload: {
          commodity:null,
          visible:false,
        }
      });
    },
    onCancel(e) {
      AL.log("取消按钮");
      dispatch({
        type: 'commodities/changeCommodityModalVisible',
        payload: {
          commodity:null,
          visible:false,
        }
      });
    }
  }

  // const orderModalProps = {
  //   visible : modalOptions.orderVisible,
  //   order   : modalOptions.order,
  //   isEditing : modalOptions.orderIsEditing,
  //   // loading: modalOptions.orderIsLoading,
  //   // 查看订单详情方法
  //   showDisplayOrderModal,
  //   // 显示编辑订单modal
  //   showEditOrderModal,
  //   // 保存编辑结果
  //   updateOrderInfo,
  //   // 更新订单状态
  //   updateOrderState,
  //   // 取消modal
  //   hideOrderModal,
  //   // 加载状态
  //   isUpdatetOrderInfo:loadings.isUpdatetOrderInfo,
  //   isUpdatetOrderState:loadings.isUpdatetOrderState,
  //
  //   // onCancel(e) {
  //   //   AL.log("取消按钮");
  //   //   dispatch({
  //   //     type: 'orders/changeOrderModalVisible',
  //   //     payload: {
  //   //       order:null,
  //   //       visible:false,
  //   //     }
  //   //   });
  //   // }
  // }

  return (

      <div className='content-inner'>

        {/* 搜索栏 - 属性比较多，可以构建一个属性对象 */}
        {/*<CommoditySearchView {...commoditySearchProps} />*/}

        {/* 订单列表 + 分页 */}
        <CommodityTabelView {...commodityListProps} />

        {/* 商品详情窗口 */}
        <CommodityModalView {...commodityModalProps} />

        {/* 订单详情窗口 */}
        {/*<OrderModalView {...orderModalProps} />*/}

      </div>
  );
}

Commodities.propTypes = {
  commodities: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ commodities }) {
  return { commodities }
  // commodities==>默认写法:
}


export default connect(mapStateToProps)(Commodities)
