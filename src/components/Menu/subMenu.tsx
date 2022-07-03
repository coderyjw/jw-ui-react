

import React,{ useContext } from 'react'
import classNames from "classnames";
import {MenuContext} from './menu'
import { MenuItemProps } from './menuItem';


export interface SubMenuProps {
  index?: number;
  title: string
  className?: string;
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children}) => {
  const context = useContext(MenuContext)
  const classes = classNames('jw-menu-item jw-submenu-item', className, {
    'is-active': context.index === index
  })
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child,i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className="jw-submenu"> 
        {childrenComponent}
      </ul>
    )
  }
  return (<li key={index} className={classes}>
    <div className="jw-submenu-title">{title}</div>
    {renderChildren()}
  </li>)
}

SubMenu.displayName = 'SubMenu'
export default SubMenu