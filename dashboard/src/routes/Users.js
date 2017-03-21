import React from 'react';
//
import { connect } from 'dva';
// connect是什么???
import styles from './Users.css';
// css-module样式效果
import UsersComponent from '../components/Users/Users';
// 引入组件UsersComponent
// 引入的组件Users

import MainLayout from '../components/MainLayout/MainLayout';
// 引入组件MainLayout


function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UsersComponent />
      </div>
    </MainLayout>
  );
}


export default connect()(Users);
