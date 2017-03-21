import React, { Component,PropTypes } from 'react'
// PropTypes是用来检验props类型的；
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';


import {AL} from '../../utils'


// stateless 组件
const Commodity = ({
  // 数据
  commodity
  // 方法

})=>{

    return (
      <div>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card>
            <Card.Header
              title="这是 title"
              thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
              extra={<span>this is extra</span>}
            />
            <Card.Body>
              <div>这是卡片内容</div>
            </Card.Body>
            <Card.Footer content="这是卡尾" extra={<div>这是尾部介绍</div>} />
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
    );
}

export default Commodity;
