module.exports = {
  name: 'Ant Design Admin',
  prefix: 'antdAdmin',
  footerText: '北京万事互联科技有限公司 版权所有 © 2017 由 Albert Lee 提供技术支持',
  /* logo图片 */
  logoSrc: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
  /* logo文字 */
  logoText: 'BLOOM管理后台',
  needLogin: true,
  states : {
    '关闭':-1,
    '下单':1,
    '支付':2,
    '确认':3,
    '制作':5,
    '配送':7,
    '签收':8,
    '完成':10,
    '申请退款':11,
    '退款通过':12,
    '退款完成':13,
  },
  channels : [
    "iOS",
    "Android",
    "BLOOM",
    "鲜花中国",
    "奔奔送花",
    "Enjoy Flower"
  ],
}
