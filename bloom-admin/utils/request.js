
import Fetch from 'isomorphic-fetch';
import Ajax from 'robe-ajax';
// import Fetch from 'dva/fetch'
// const qs = require('qs')

let apiRoot = 'http://localhost:3000/0.1/admin';
// apiRoot = 'https://flowerso2o.leanapp.cn/0.1/admin';

const bodyParams = {
  appName: "admin",
  version: "0.1",
};

const fetch = async(url, options) => {

    const URL = `${apiRoot}${url}`;

    // console.log(" === 开始请求 === ", URL);

    const body = JSON.stringify({
      ...bodyParams,
      ...options,
    });

    // console.log(" body ",body);

    const response = await Fetch(URL, {
      method: "POST",
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      // body: "firstName=Nikhil&favColor=blue&password=easytoguess"
      // cache: 'default',
      body,
    });

    // console.log(" === 请求完成 === ",response);

    if (response.status != 200) {
      console.log("statusCode : " + result.statusCode)
      throw {
        code: response.status,
        message: response.errMsg
      };
    }

    const {
      object,
      error,
    } = await response.json();

    // console.log("object",object);
    // console.log("error",error);

    if (error) {
      throw error;
    }

    // console.log("返回object", object);

    return object;
}



/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request (url, options) {
  if (options.cross) {
    return Ajax.getJSON('http://query.yahooapis.com/v1/public/yql', {
      q: "select * from json where url='" + url + '?' + Ajax.param(options.data) + "'",
      format: 'json'
    })
  } else {
    return Ajax.ajax({
      url: url,
      method: options.method || 'get',
      data: options.data || {},
      processData: options.method === 'get',
      dataType: 'JSON'
    }).done((data) => {
      return data
    })
  }
}

// export {
//   fetch,
//   request,
// };

module.exports = {
  fetch,
  request,
}
