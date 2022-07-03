import classNames from "classnames";
import React, { createContext, useState } from "react";
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback =  (selectedIndex: string) => void
export interface MenuProps {
  mode?: MenuMode,
  defaultIndex?: string,
  className?: string,
  style?: React.CSSProperties,
  onSelect?: SelectCallback,
  children?: React.ReactNode,
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string,
  onSelect?: SelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[]
}

export const MenuContext =  createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = props => {
  const { className, mode, defaultIndex,
   style, children,onSelect,defaultOpenSubMenus } = props

   const classes = classNames('jw-menu', className,{
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const [currentActive, setActive] = useState(defaultIndex)
  
  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChiuldren = () => {
    return React.Children.map(children, (child,index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } =  childElement.type 
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }
  return (<ul className={classes} style={style} data-testid="test-menu">
    <MenuContext.Provider value={passedContext}>
      {renderChiuldren()}  
    </MenuContext.Provider>
  </ul>)
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu