const UINT8_MAX = 255;
const UINT16_MAX = 65535; //0~65535

// config
// const config = require("./ALConfig").ALConfig();

const moment = require('moment-timezone');
const _ = require('underscore');
const crypto = require('crypto');
const Buffer = require('buffer').Buffer;
import config from './config'

const host = "https://flowerso2o.leanapp.cn/0.1/";
// "http://localhost:3000/0.1/";

//查询
const log = (message, object) => {

    if (!isNil(object)) {
        console.log(message, object);
    } else {
        console.log(message);
    }
};

const isProperties = (obj, properties) => {

    return properties.map((property) => {
        return _.propertyOf(obj)(property);
    }).every((isProperty) => {
        return isProperty;
    });
};

// 执行两个对象之间的优化深度比较，确定他们是否应被视为相等。
const isEqual = (obj1, obj2) => (_.isEqual(obj1, obj2));

// 对象是否没有任何key-value
// 如果object 不包含任何值(没有可枚举的属性)，返回true。 对于字符串和类数组（array-like）对象，如果length属性为0，那么_.isEmpty检查返回true。
const isEmpty = (object) => (_.isEmpty(object));

// 告诉你properties中的键和值是否包含在object中。
const isMatch = (object, properties) => (_.isMatch(object, properties))

//数据类型
const isArray = (object) => (_.isArray(object));

const isObject = (object) => (_.isObject(object));

const isFunction = (object) => (_.isFunction(object));

// 是否为 NaN,null,undefined
const isNil = (object) => ((_.isNaN(object) || _.isNull(object) || _.isUndefined(object)) ? true : false);

// constructor 属性返回所有 JavaScript 变量的构造函数。
const isDate = (object) => (_.isDate(object));

const isNumber = (object) => (_.isNumber(object));

const isBoolean = (object) => (_.isBoolean(object));

const isEmail = (object) => {
    const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return re.test(object);
};

const isString = (object) => (_.isString(object));

const isPhone = (object) => {
    const reg = /^\d{11}$/g;
    // AL.log("isString",isString(object))
    // AL.log("test",re.test(object))
    // AL.log("isPhone",(isString(object) && re.test(object)))
    return isString(object) && reg.test(object);
}

const isPhoneCode = (object) => {
    const reg = /^\d{4}$/g;
    // AL.log("isString",isString(object));
    // AL.log("test",re.test(object));
    // AL.log("&&",isString(object) && re.test(object));
    return isString(object) && reg.test(object);
}

const isCouponCode = (object) => {
    const reg = /^\d{6}$/g;
    return isString(object) && reg.test(object);
}

const isDateString = (string) => {

    if (!isString(string)) {
        return false;
    }
    return true;
};

const isAVObjectId = (avObjId) => {
    return (isString(avObjId) && avObjId.length === 24) ? true : false;
};

const isAVObject = (avObject) => {

    if (!isObject(avObject)) {
        return false;
    }
    if (!isProperties(avObject, ['objectId', 'className'])) {
        return false;
    }
    if (!isAVObjectId(avObject.objectId)) {
        return false;
    }
    return true;
};

const url2base64 = async(url) => {

  // 通过co-request向微信服务器发出请求
  return await httpGetRequest(url, {
    encoding: 'base64' // 指定编码
  });
}

// 字典排序
const dictKeySort = (dict) => {

    return Object.keys(dict).sort().map((key) => {
        return {
            key,
            value: dict[key]
        };
    });
};

//md5加密
const md5 = (text) => {
    return crypto.createHash('md5').update(text).digest('hex');
};

//base64加密
const base64 = (text) => {
    return new Buffer(text).toString('base64');
};

// 字符串 --> 时间
// String --> Date
const string2date = (str, format) => {

    if (!str) {
        return new Date();
    }

    if (!format) {
        format = "YYYY-MM-DD HH:mm:ss";
    }
    //console.dir(moment(date).tz('Asia/Shanghai').format(format));
    return moment(str, format).tz('Asia/Shanghai').toDate();
};

//生成guid
const guid = () => {
    const S4 = () => {
        Math.floor(Math.random() * 16.0).toString(16);
        return (((1 + Math.random()) * UINT16_MAX) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

const addTime = (date, times, unit) => {

    // Deprecation warning: moment().add(period, number) is deprecated. Please use moment().add(number, period).
    //return moment(date||new Date()).add(times||0,unit||'hours').toDate()
    if (times >= 0) {
        return moment(date || new Date()).add(times || 0, unit || 'hours').toDate()
    } else {
        return moment(date || new Date()).subtract(-1 * times || 0, unit || 'hours').toDate()
    }
};

const addDate = (days) => {

    const date = addTime(null, days || 0, 'days');
    //this.log(date);
    return string2date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
};

// 时间 --> 字符串
// Date --> String
const date2string = (date, format) => {

    if (!date) {
        date = new Date();
    }

    if (!format) {
        format = "YYYY-MM-DD HH:mm:ss";
    }
    //console.dir(moment(date).tz('Asia/Shanghai').format(format));
    return moment(date).tz('Asia/Shanghai').format(format);
};

//时间戳
const getTimestamp = (formate) => {
    return moment().tz('Asia/Shanghai').format(formate || 'YYYYMMDDHHmmss');
};

// 时间戳 --> 时间
// timeStamp --> Date
const timeStamp2date = (timeStamp) => {

    if (isNaN(parseInt(timeStamp))) {
        return new Date();
    } else {
        return new Date(parseInt(timeStamp));
    }
};

// 时间 --> 时间戳
// Date --> timeStamp
const date2timeStamp = (date) => {

    if (!date) {
        date = new Date();
    }
    return Date.parse(date);
};

// 倒计时
const getRTime = (EndTime) => {

    const checkTime = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    const NowTime = new Date();
    let ts = EndTime.getTime() - NowTime.getTime();
    let string = "";

    if (ts >= 0) {
        string += "剩余 ";
    } else {
        string += "超时 ";
        ts *= -1;
    }

    let dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    let hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
    let mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
    let ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数

    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);

    if (dd > 0) string += dd + " 天 ";
    if (hh > 0) string += hh + " 时 ";
    if (mm > 0) string += mm + " 分 ";
    if (ss > 0) string += ss + " 秒 ";
    //console.dir(string);
    return string;
};

//随机数
const getRandomNumberWithRange = (Min, Max) => {
    const Range = Max - Min;
    const Rand = Math.random();
    return (Min + Math.round(Rand * Range));
};

//随机码
const getRandomNumberWithDigit = (_idx) => {
    let str = '';
    for (let i = 0; i < _idx; i += 1) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
};

//生成error
const error = (code, message) => {
    return {
        code,
        message
    };
};

const checkPhoneSegment = async(phoneNumber) => {

    const url = `http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=${phoneNumber}`;
    const body = await httpGetRequest(url);
    if (!body) {
        return null;
    }
    const iconv = require('iconv-lite');
    // log(body);
    const bodyJsStr = iconv.decode(body, 'gb2312').toString();
    // log(bodyJsStr);
    const __GetZoneResult_ = eval(bodyJsStr);
    return __GetZoneResult_;

};

const PromiseForEach = async(objects, dosometing) => {

    if (!isArray(objects) || !isFunction(dosometing)) {
        return Promise.reject(error(-1, "参数类型错误"));
    }

    if (isEmpty(objects)) {
        return [];
    }

    const realResultList = [];
    for (let object of objects){
        realResultList.push(await dosometing(obj));
    }
    return realResultList;

    // let result = Promise.resolve();
    // result = result.then(() => {
    //
    //     if (!isArray(objects) || !isFunction(dosometing)) {
    //         return Promise.reject(error(-1, "参数类型错误"));
    //     }
    //
    //     if (isEmpty(objects)) {
    //         return [];
    //     }
    //
    //     const realResultList = [];
    //     let resultTmp = Promise.resolve();
    //     objects.forEach((obj) => {
    //         resultTmp = resultTmp.then((len) => {
    //             // log("len : " + len);
    //             return dosometing(obj);
    //         }).then((res) => {
    //             return realResultList.push(res); // 返回的是长度
    //         });
    //     });
    //     resultTmp = resultTmp.then(() => {
    //         // log("realResultList : " + realResultList.length);
    //         return realResultList;
    //     });
    //     return resultTmp = resultTmp.catch(Promise.reject);
    // });
    // return result = result.catch(Promise.reject);
}

const dataFormate = (object)=>{

  if (isArray(object)) {
      return object.map((obj) => (dataFormate(obj)));
  }

  if (!isObject(object)){
      return object;
  }

  if (!isDate(object)
      && object["__type"]==='Date'
      && isString(object.iso)){
      // log("date1",object.iso)
      // log("date2",string2date(object.iso,"YYYY-MM-DD'T'HH:mm:ss.SSS'Z'"))
      return string2date(object.iso,"YYYY-MM-DD'T'HH:mm:ss.SSS'Z'");
  }

  const reg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/g;
  for (let key in object){
      // if (key==="createdAt"){
      //   const value = object[key];
      //   log("value",value);
      //   log("dataFormate(value)",dataFormate(value));
      // }
      const value = object[key];
      if (isObject(value)){
          object[key] = dataFormate(value)
      }

      if (isString(value)
          && reg.test(value)){
          // log("key",key);
          object[key] = string2date(value, "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'");
      }
  }

  return object;
}

const checkAVObjectChanges = (
  avobject,
  params,
)=>{

  const data = {};

  if (!isAVObject(avobject)){
      return data;
  }

  for (let key in params){

    const value = params[key];
    if (isDate(value) && isDate(avobject[key])){
      if (date2string(value)!==date2string(avobject[key])){
          data[key] = value;
      }
    }
    else if (isAVObject(value) && isAVObject(avobject[key])){
      if (value.objectId!==avobject[key].objectId){
          data[key] = value;
      }
    }
    else {
      if (value !== avobject[key]){
        data[key] = value;
      }
    }
  }
  if (!AL.isEmpty(data)){
    data.objectId = avobject.objectId;
  }
  return data;
}

module.exports = {

    // 时间
    moment,
    // 异步编程
    PromiseForEach,

    // 字典排序
    dictKeySort,
    // MD5加密
    md5,
    //base64加密
    base64,

    error,

    // body 参数预处理
    checkPhoneSegment,

    log,
    guid,

    /**     时间     **/
    addTime,
    addDate,
    date2string,
    string2date,
    timeStamp2date,
    date2timeStamp,
    getTimestamp,
    getRTime,

    /**     随机数     **/
    getRandomNumberWithRange,
    getRandomNumberWithDigit,

    /**     判断-自定义数据类型     **/
    isPhone,
    isPhoneCode,
    isCouponCode,

    /**     判断-基本数据类型     **/
    isNil,
    isNumber,
    isString,
    isBoolean,
    isArray,
    isDate,
    isFunction,
    isEmpty,
    isEqual,

    /**     判断-AV数据类型     **/
    isAVObject,
    isAVObjectId,

    /**     判断-字典     **/
    isObject,
    isMatch,
    isProperties,

    dataFormate,
    config,
    host,

    checkAVObjectChanges,
};
