

import React,{ useContext, useState } from 'react'
import classNames from "classnames";
import {MenuContext} from './menu'
import { MenuItemProps } from './menuItem';


export interface SubMenuProps {
  index?: string;
  disabled?: boolean;
  title: string;
  className?: string;
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children, disabled}) => {
  const context = useContext(MenuContext)
  const openSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
  const [ menuOpen, setOpen] = useState(isOpend)
  const classes = classNames('jw-menu-item jw-submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
    'is-disabled': disabled,
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
    if(context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    },300)
  } 

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)},
  }: {}

  const renderChildren = () => {
    const subMenuClasses = classNames('jw-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child,i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
          disabled
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className={subMenuClasses}> 
        {childrenComponent}
      </ul>
    )
  }
  return (<li key={index} className={classes} {...hoverEvents}>
    <div className="jw-submenu-title" {...clickEvents}>{title}</div>
    {renderChildren()}
  </li>)
}

SubMenu.displayName = 'SubMenu'
export default SubMenu