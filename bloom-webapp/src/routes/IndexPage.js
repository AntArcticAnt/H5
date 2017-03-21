import React, { PropTypes } from 'react'
import { connect } from 'dva'
// import Login from './login'
// import Header from '../components/layout/header'
// import Bread from '../components/layout/bread'
// import Footer from '../components/layout/footer'
// import Sider from '../components/layout/sider'
// import styles from '../components/layout/main.less'
// import { Spin } from 'antd'
// import { classnames } from '../utils'
// import '../components/layout/common.less'

import HomePage from './HomePage';
import ThemePage from './ThemePage';
import DiscoverPage from './DiscoverPage';
import MinePage from './MinePage';

import { TabBar, Icon } from 'antd-mobile';

// import { Redirect } from 'dva/router';
import { Link } from 'dva/router';
import {AL} from '../utils'





// stateless 页面组件
const IndexPage = ({
  // 系统参数==》有系统的参数变量 原来的 this.props.children/location/dispatch方法
  children,
  location,
  dispatch,
  // model参数==》不止有命名空间的app变量
  app
}) => {

  const {
    tab:{
      //解构赋值;
      selected,
      hidden,
      items,
    }
  } = app;
  // 解构赋值 ==> 从app中得到model中的state中的tabselected.hidden,items

  // login参数
  // const loginProps = {
  //   loading,
  //   loginButtonLoading,
  //   onOk (data) {
  //     dispatch({
  //       type: 'app/login',
  //       payload: data
  //     })
  //   }
  // }


  //
  //什么时候使用了selectTab(key);
  // onPress={() => {
  //   selectTab(key);
  // }}

  // selectTab
  const selectTab = (key) => {
    dispatch({
      type: 'app/selectTab',
      payload: key
    })
  }
  // selectTab(state,{
  //   payload
  // }){
  //   console.log('payload',payload);
  //
  //   return state.merge({
  //     tab: {
  //       ...state.tab,
  //       selected:payload,
  //     },
  //   });
  // },



// 一个JSX对象==>好像没用上
  const renderContent = (pageText) => {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }}
           onClick={(e) => {
          e.preventDefault();
          this.setState({
            hidden: !this.state.hidden,
            // 无状态组件里面为什么会有this.state呢???
            //true.false之间切换
          });
        }}
        >
          点击切换 tab-bar 显示/隐藏
        </a>
      </div>
    );
  }


  const tabBarProps = {
    // 拼凑props
    unselectedTintColor:"#949494",
    tintColor:"#33A3F4",
    barTintColor:"white",
    hidden,
  }



// 充当路由的作用,在组件之间进行切换;
  const getItem = (key)=>{
    // AL.log("key",key);
    if (key==='首页'){
      return (<HomePage />);
    }else if (key==='分类'){
      return (<ThemePage />);
    }else if (key==='发现'){
      return (<DiscoverPage />);
    }else if (key==='我的'){
      return (<MinePage />);
    }else{
      return '';
    }
  }





//
  const createTabBarItems = ({
    items,
    selected,
  }) => {

    return items.map((item)=>{
      const {
        title,
        key,
        icon,
        selectedIcon,
        badge,
        dot,
      } = item;
      return (
        <TabBar.Item
          title={title}
          key={key}
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${icon}) center center /  0.42rem 0.42rem no-repeat` }}
          />
          }
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${selectedIcon}) center center /  0.42rem 0.42rem no-repeat` }}
          />
          }
          selected={selected === key}
          //selected这个变量初始化的时候是来自于model的state,然后在selected这个事件触发的时候
          badge={badge}
          onPress={() => {
            selectTab(key);
          }}
        >
        {
          getItem(key)
        }
        </TabBar.Item>
      );
    });
  }
// 最后的返回值Rr
  return (
      <TabBar
        {...tabBarProps}
      >
        {
          createTabBarItems({
            items,
            selected,
          })
          //items和selected两个实参是哪里来的???
       //   const {
            //   tab:{
            //     //解构赋值;
            //     selected,
            //     hidden,
            //     items,
            //   }
            // } = app;
        }
      </TabBar>
    );
}

IndexPage.propTypes = {
  // children: PropTypes.element.isRequired,
  // location: PropTypes.object,
  // dispatch: PropTypes.func,
  // loading: PropTypes.object,
}

export default connect(({app}) => ({app}))(IndexPage)
// ({app}) => ({app}) 啥意思？？
