import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';
// 组件

function IndexPage({ location }) {
  // 传进来的实参对象解构赋值获取location变量
  return (
    <MainLayout location={location}>
      {/*嵌套组件==>自定义内容 */}
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
      </div>
    </MainLayout>
  );
}

IndexPage.propTypes = {
};
// 没有对应的model,所以在route文件中没有触发dva.model(model对象);

export default connect()(IndexPage);
// 直接暴露出整个组件的
