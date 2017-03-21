import { request, fetch } from '../utils/request'
import {AL} from '../utils'

// 查询商品
/*
**/
const getCommodities = async({
  limit,
  skip,
  colors,
  flowers,
  channels,
  sort,
  keyword,
}) => {

    AL.log("+++ 查询商品 +++");

    const body = {
      limit,
      skip,
      colors,
      flowers,
      channels,
      sort,
      keyword,
    };
    // if (AL.isNumber(limit)){
    //   body.limit = limit;
    // }
    // if (AL.isNumber(skip)){
    //   body.skip = skip;
    // }

    AL.log("body",body);
    const URL = `/commodity/search`;
    const data = await fetch(URL, body);
    return AL.dataFormate(data);
}

// 修改商品信息
const updateCommodity = async({

  objectId:commodityId,
  name,
  subname,
  introductions,
  price,

  detailPhotos,
  introducePictures,

  serviceIntroductions,
  promises,

  limitCities,
  skipCities,
  limitDates,
  skipDates,

}) => {

  AL.log("修改商品信息-commodityId",commodityId);

  const URL = `/commodity/update`;

  if (AL.isArray(detailPhotos)){
    detailPhotos = detailPhotos.map((photo)=>(AL.avobject2withoutData(photo)));
  }

  if (AL.isArray(introducePictures)){
    introducePictures = introducePictures.map((photo)=>(AL.avobject2withoutData(photo)));
  }

  const body = {
    commodityId,
    name,
    subname,
    introductions,
    price,

    detailPhotos,
    introducePictures,

    serviceIntroductions,
    promises,

    limitCities,
    skipCities,
    limitDates,
    skipDates,
  };

  AL.log("修改商品-body",body);
  return AL.dataFormate(await fetch(URL, body));
}

// 添加商品
const createCommodity = async({

  name,
  subname,
  introductions,
  price,

  detailPhotos,
  introducePictures,

  serviceIntroductions,
  promises,

  limitCities,
  skipCities,
  limitDates,
  skipDates,

}) => {

  AL.log("修改商品信息");

  const URL = `/commodity/create`;

  if (AL.isArray(detailPhotos)){
    detailPhotos = detailPhotos.map((photo)=>(AL.avobject2withoutData(photo)));
  }

  if (AL.isArray(introducePictures)){
    introducePictures = introducePictures.map((photo)=>(AL.avobject2withoutData(photo)));
  }

  const body = {
    commodityId,
    name,
    subname,
    introductions,
    price,

    detailPhotos,
    introducePictures,

    serviceIntroductions,
    promises,

    limitCities,
    skipCities,
    limitDates,
    skipDates,
  };

  AL.log("创建商品-body",body);
  return AL.dataFormate(await fetch(URL, body));
}

// 发布到花娃

export {
  getCommodities,
  updateCommodity,
  createCommodity,
  // updateCommodityOrderState,
  // updateCommodityOrderInfo,
  // downloadOrders,
}
