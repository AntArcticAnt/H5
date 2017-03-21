import React, {
  PropTypes,
  Component,
} from 'react'

import {
  Button,
  Row,
  Col,
  Modal,
} from 'antd'

import OrderEditView from './OrderEditView'

import {AL} from '../../utils'

const OrderModalView = ({
  order,
  visible,
  isEditing,
  // loading,
  isUpdatetOrderInfo,
  isUpdatetOrderState,
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

}) => {

  // const {
  //   isEditing,
  //   loading,
  // } = this.state;
  //
  // const {
  //   order,
  //   visible,
  // } = this.props;

  AL.log("order",order);

  const footer = [];

  if (isEditing){
    footer.push(
      <Button key="back"
              type="ghost"
              size="large"
              onClick={()=>{
                showDisplayOrderModal(order);
              }}
              >
        取消
      </Button>
    );
    // footer.push(
    //   <Button key="submit"
    //           type="primary"
    //           size="large"
    //           loading={loading}
    //           onClick={()=>{
    //             updateOrderInfo();
    //           }}
    //           >
    //     完成
    //   </Button>
    // );
  }else{
    footer.push(
      <Button key="back"
              type="ghost"
              size="large"
              onClick={()=>{
                showEditOrderModal(order);
              }}
              >
        编辑
      </Button>
    );
    // footer.push(
    //   <Button key="submit"
    //           type="primary"
    //           size="large"
    //           // loading={order.loading}
    //           onClick={()=>{
    //             updateOrderState([order])
    //           }}
    //           >
    //     更新订单状态
    //   </Button>
    // );
  }

  AL.log("visible",visible);
  const modalOpts = {
    wrapClassName: 'vertical-center-modal',
    title: isEditing?"编辑订单信息":"订单详情",
    visible,
    footer,
    onCancel:hideOrderModal,
  }

  return (
      <Modal {...modalOpts}>
         {
           isEditing
           ?<OrderEditView {
              ...{ order,
                  isUpdatetOrderInfo,
                  updateOrderInfo,
              }
            }

            />
           :<OrderDisplayView order={order} />
         }
       </Modal>
    );

}

const OrderDisplayView = ({
  order,
}) => {

  if (!AL.isAVObject(order)){
    return <div></div>;
  }

  // 发货人姓名
  let signature = '未知';
  if (order.isAnonymity) {
      signature = "******"
  } else if (order.cardName) {
      signature = order.cardName;
  } else if (order.senderName) {
      signature = order.senderName;
  } else if (order.user) {
      signature = order.user.nickname;
  } else {
      signature = "未知";
  }

  return (
        <div>
         {
           order
           ?
           <div>
             <p>商品名:《{order.commodityName}》</p>
             <p>销量:{order.commodity.saleCount}</p>
             <p>金额:{order.totalPrice/100} 元</p>
             ---------------------------------------
             <p>发货人姓名:{signature}</p>
             <p>发货人电话:{order.senderPhone}</p>
             <p>购买次数:{order.user.saleCount}</p>
             <p>留言:{order.cardMessage}</p>
             ---------------------------------------
             <p>收货人姓名:{order.receiverName}</p>
             <p>收货人电话:{order.receiverPhone}</p>
             <p>收货人住址:{order.deliveryAddress}</p>
             <p>优惠金额:{order.coupon?order.coupon.faceValue:''}</p>
             <p>备注: {order.remark}</p>
           </div>
           :''
         }
         </div>
    );

}

export default OrderModalView;
