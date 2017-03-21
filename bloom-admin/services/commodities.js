import { request, fetch } from '../utils/request'
import {AL} from '../utils'

// 查询商品
/*

**/
const getCommodities = async({
  limit,
  skip,
}) => {

    AL.log("+++ 查询商品 +++");

    const body = {
    };
    if (AL.isNumber(limit)){
      body.limit = limit;
    }
    if (AL.isNumber(skip)){
      body.skip = skip;
    }

    AL.log("body",body);
    const URL = `/commodity/search`;
    const data = await fetch(URL, body);
    return AL.dataFormate(data);
}

// 修改商品信息
const updateCommodity = async({
  commodityId,
  // isBloom,
  // state,
  // totalPrice,
  // costPrice,
  // receiverName,
  // receiverPhone,
  // senderName,
  // senderPhone,
  // deliveryAddress,
  // deliveryFromDate,
  // deliveryToDate,
  // cardMessage,
  // cardName,
  // isAnonymity,
  // isAllowSms,
  // remark,
  // remarkOfServer,
}) => {

  AL.log("修改商品信息");

  // const {
  //   state,
  //   objectId:orderId,
  // } = order;

  const URL = `/commodity/update`;

  const body = {
    commodityId,
    // isBloom,
    // state,
    // totalPrice,
    // costPrice,
    // receiverName,
    // receiverPhone,
    // senderName,
    // senderPhone,
    // deliveryAddress,
    // deliveryFromDate:deliveryFromDate?AL.date2string(deliveryFromDate):null,
    // deliveryToDate:deliveryToDate?AL.date2string(deliveryToDate):null,
    // cardMessage,
    // cardName,
    // isAnonymity,
    // isAllowSms,
    // remark,
    // remarkOfServer,
  };

  AL.log("修改商品-body",body);
  return AL.dataFormate(await fetch(URL, body));
}

// 修改商品信息
const addCommodity = async({
  // commodityId,
  // isBloom,
  // state,
  // totalPrice,
  // costPrice,
  // receiverName,
  // receiverPhone,
  // senderName,
  // senderPhone,
  // deliveryAddress,
  // deliveryFromDate,
  // deliveryToDate,
  // cardMessage,
  // cardName,
  // isAnonymity,
  // isAllowSms,
  // remark,
  // remarkOfServer,
}) => {

  AL.log("添加-商品");

  // const {
  //   state,
  //   objectId:orderId,
  // } = order;

  const URL = `/commodity/add`;

  const body = {
    // commodityId,
    // isBloom,
    // state,
    // totalPrice,
    // costPrice,
    // receiverName,
    // receiverPhone,
    // senderName,
    // senderPhone,
    // deliveryAddress,
    // deliveryFromDate:deliveryFromDate?AL.date2string(deliveryFromDate):null,
    // deliveryToDate:deliveryToDate?AL.date2string(deliveryToDate):null,
    // cardMessage,
    // cardName,
    // isAnonymity,
    // isAllowSms,
    // remark,
    // remarkOfServer,
  };

  AL.log("添加商品-body",body);
  return AL.dataFormate(await fetch(URL, body));
}

// 发布到花娃

export {
  getCommodities,
  updateCommodity,
  addCommodity,
  // updateCommodityOrderState,
  // updateCommodityOrderInfo,
  // downloadOrders,
}
