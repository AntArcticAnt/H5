import { request, fetch } from '../utils/request'
import {AL} from '../utils'



// 查询订单
/*
  日期：不限 今天 明天 后天 指定
  日期类型：下单时间 配送时间
  状态：不限 已完成 未完成 指定
  地区：不限 北京 上海 指定
  排序方式：配送时间 下单时间 支付时间
  关键字：
  来源：
**/
const getCommodityOrders = async({
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
  keyword,
  timestamp,
  sort,
}) => {

    AL.log("+++ 查询订单 +++");

    const body = {
    };
    if (AL.isNumber(limit)){
      body.limit = limit;
    }
    if (AL.isNumber(skip)){
      body.skip = skip;
    }
    if (AL.isDate(createdFromDate)){
      body.createdFromDate = AL.date2string(createdFromDate);
    }
    if (AL.isDate(createdToDate)){
      body.createdToDate = AL.date2string(createdToDate);
    }
    if (AL.isDate(deliveryFromDate)){
      body.deliveryFromDate = AL.date2string(deliveryFromDate);
    }
    if (AL.isDate(deliveryToDate)){
      body.deliveryToDate = AL.date2string(deliveryToDate);
    }
    if (AL.isArray(states) && states.every((state)=>(AL.isNumber(state)))){
      body.states = states;
    }
    if (AL.isString(keyword) && keyword.length>0){
      body.keyword = keyword;
    }
    if (AL.isArray(channels)){

      const platforms = [];
      if (channels.indexOf('iOS')!==-1){
        platforms.push('iOS');
      }
      if (channels.indexOf('Android')!==-1){
        platforms.push('Android');
      }
      if (!AL.isEmpty(platforms)){
        body.platforms = platforms;
      }

      const appNames = [];
      if (channels.indexOf('BLOOM')!==-1){
        appNames.push('BLOOM');
      }
      if (channels.indexOf('鲜花中国')!==-1){
        appNames.push('鲜花中国');
      }
      if (channels.indexOf('奔奔送花')!==-1){
        appNames.push('奔奔送花');
      }
      if (channels.indexOf('Enjoy Flower')!==-1){
        appNames.push('Enjoy Flower');
      }
      if (!AL.isEmpty(appNames)){
        body.appNames = appNames;
      }
    }
    if (AL.isBoolean(isOnlyBloom) && isOnlyBloom===true){
        body.isOnlyBloom = isOnlyBloom;
    }
    if (AL.isBoolean(isOnlyNotToPrint) && isOnlyNotToPrint===true){
        body.isOnlyNotToPrint = isOnlyNotToPrint;
    }

    AL.log("body",body);
    const URL = `/order/commodity/search`;
    const data = await fetch(URL, body);
    return AL.dataFormate(data);


}

// 更新订单状态
const updateCommodityOrderState = async({
  orders,
}) => {

  AL.log("更新订单状态");
  // const {
  //   state,
  //   objectId:orderId,
  // } = orders;

  const body = {
    orders:orders.map((order)=>{
      return {
        objectId : order.objectId,
        state   : order.state,
      };
    })
  };

  const URL = `/order/commodity/update/state`;
  return await fetch(URL, body);
}

const downloadOrders = async({
  orderIds
})=>{

  AL.log("修改订单信息");

  // const {
  //   state,
  //   objectId:orderId,
  // } = order;

  const URL = `/order/commodity/download`;

  const body = {
    orderIds,
  };

  // AL.log("下载订单-body",body);
  // return await fetch(URL, body);

  return request(URL, {
    method: 'get',
    data: body
  })

}

// 修改订单信息
const updateCommodityOrderInfo = async({
  orderId,
  isBloom,
  state,
  totalPrice,
  costPrice,
  receiverName,
  receiverPhone,
  senderName,
  senderPhone,
  deliveryAddress,
  deliveryFromDate,
  deliveryToDate,
  cardMessage,
  cardName,
  isAnonymity,
  isAllowSms,
  remark,
  remarkOfServer,
}) => {

  AL.log("修改订单信息");

  // const {
  //   state,
  //   objectId:orderId,
  // } = order;

  const URL = `/order/commodity/update/info`;

  const body = {
    orderId,
    isBloom,
    state,
    totalPrice,
    costPrice,
    receiverName,
    receiverPhone,
    senderName,
    senderPhone,
    deliveryAddress,
    deliveryFromDate:deliveryFromDate?AL.date2string(deliveryFromDate):null,
    deliveryToDate:deliveryToDate?AL.date2string(deliveryToDate):null,
    cardMessage,
    cardName,
    isAnonymity,
    isAllowSms,
    remark,
    remarkOfServer,
  };

  AL.log("修改订单信息-body",body);
  return AL.dataFormate(await fetch(URL, body));
}

// 发布到花娃

export {
  getCommodityOrders,
  updateCommodityOrderState,
  updateCommodityOrderInfo,
  downloadOrders,
}
