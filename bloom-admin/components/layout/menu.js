import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'

const topMenus = menu.map(item => item.key);

/*
  menuArray 目录items

**/
const getMenus = (menuArray, siderFold, parentPath='/') => {

  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

const Menus = ({
  siderFold,
  darkTheme,
  location,
  isNavbar,
  handleClickNavMenu,
  className
}) => {

  const menuItems = getMenus(menu, siderFold);
  // console.log("menuItems",menuItems);
  return (
    <Menu
      className={className}
      /* 菜单类型，现在支持垂直、水平、和内嵌模式三种 vertical horizontal inline */
      mode={siderFold ? 'vertical' : 'inline'}
      /* 主题颜色 */
      theme={darkTheme ? 'dark' : 'light'}
      /* 点击 menuitem 调用此函数，参数为 {item, key, keyPath} */
      onClick={handleClickNavMenu}
      /* 初始展开的 SubMenu 菜单项 key 数组 */
      defaultOpenKeys={isNavbar ? menuItems.map(item => item.key) : []}
      /* 初始选中的菜单项 key 数组 */
      defaultSelectedKeys={[
        location.pathname.split('/')[location.pathname.split('/').length - 1] || menuItems[0].key || ''
      ]}>
      {menuItems}
    </Menu>
  )
}

export default Menus;
