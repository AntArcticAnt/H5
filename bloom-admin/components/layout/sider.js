import React from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import { config } from '../../utils'
import Menus from './menu'

const Sider = ({
  siderFold,
  darkTheme,
  location,
  changeTheme
}) => {

  // 侧边栏的属性
  const menusProps = {
    siderFold,
    darkTheme,
    location
  }

  return (
    <div>
      {/* logo */}
      <div className={styles.logo}>
        {/* logo图片 */}
        <img src={config.logoSrc} />
        {/* logo文字 */}
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      {/* 侧边栏 */}
      <Menus {...menusProps} className={styles.siderMenu} />
        {/* 切换主题按钮--只有不折叠时才有 */}
        {/*
          !siderFold ?
            <div className={styles.switchtheme}>
              <span><Icon type='bulb' />切换主题</span>
              <Switch onChange={changeTheme}
                      defaultChecked={darkTheme}
                      checkedChildren='黑'
                      unCheckedChildren='白' />
            </div> :
            ''
        */}
    </div>
  )
}

export default Sider
