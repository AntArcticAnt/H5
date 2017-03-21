import React, { Component,PropTypes } from 'react'

import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import {AL} from '../../utils';

import { Commodity } from './Commodity';
// 引入子组件 ！！！

const CommodityProject = ({
  commodities,
})=>{

    return (
      <div>
        {
          commodities.map((commodity)=>{
            return (<Commodity commodity={commodity} />);
            // 传进来的参数是
          })
        }
      </div>
    );
}

export default CommodityProject;
