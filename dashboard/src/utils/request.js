import fetch from 'dva/fetch';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  // 暴露默认 异步 自己定义的函数request;

  const response = await fetch(url, options);
  // fetch是引入进来的方法,等待---.
  checkStatus(response);
  //全局的方法,
  const data = await response.json();
  //等待地 -->


// ret是return
  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    //  response中有属性,属性中有个方法get()  => 'x-total-count'  ==>
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
  // 异步函数被调用 => 的最终返回值为一个对象,结构为data:OBJ,headers:{}
}
