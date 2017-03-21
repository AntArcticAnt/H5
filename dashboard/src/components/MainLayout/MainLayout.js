import React from 'react';
import styles from './MainLayout.css';
import Header from './Header';
// 使用组件Header

function MainLayout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
    {/*使用了Header组件*/}
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
          {/*相当于this.props.children  */}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
