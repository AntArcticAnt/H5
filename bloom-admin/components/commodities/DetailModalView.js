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

import {AL} from '../../utils'

import CommodityEditView from './DetailEditView'

const DetailModalView = ({

  // 商品对象+状态
  commodity,
  visible,
  isEditing,
  isLoading,

  // 显示-商品详情-方法
  showCommodityModal,

  // 显示-编辑商品-方法
  showEditCommodityModal,

  // 保存-编辑商品-方法
  updateCommodity,

  // 新增-商品-方法
  addCommodity,

  // footer按钮-方法
  onOk,
  onCancel,

}) => {

  const footer = [];
  let title = "";

  if (!AL.isAVObject(commodity)){
    title = "新增商品";
  }else if (isEditing){
    title = "编辑商品";
    footer.push(
      <Button key="edit"
              type="primary"
              size="large"
              onClick={()=>{
                showCommodityModal(commodity);
              }}
              >
        详情
      </Button>
    );

  }else{
    title = "商品详情";
    footer.push(
      <Button key="back"
              type="primary"
              size="large"
              onClick={()=>{
                showEditCommodityModal(commodity);
              }}
              >
        编辑
      </Button>
    );
  }
  footer.push(
    <Button key="cancel"
            type="ghost"
            size="large"
            loading={isLoading}
            onClick={onCancel}
            >
      取消
    </Button>
  );

  const modalOpts = {
    title,
    visible,
    footer,
    wrapClassName: 'vertical-center-modal',
  }

  return (
      <Modal {...modalOpts}
       >
         {

           isEditing
           ?  <CommodityEditView {
                ...{
                  commodity,
                  updateCommodity,
                  isLoading,
                }
              }
              />
           :  <CommodityDisplayView commodity={commodity} />
         }
       </Modal>
    );
}

const CommodityDisplayView = ({
  commodity,
}) => {

  return (
        <div>
         {
           commodity
           ?
           <div>
            {
              commodity.detailPhotos.map((photo,index)=>{
                  return (<img key={`${index}-detailPhoto-${photo.objectId}`} width={160} src={photo.URL} />);
              })
            }
            <br/>
            《{commodity.name}》
            <br/>
            {
              commodity.introductions.map((introduct,index)=>{
                return (<p key={`${index}-introduction-${commodity.objectId}`}>{introduct}</p>);
              })
            }
           </div>
           :''
         }
         </div>
    );

}

export default DetailModalView;
