import classNames from "classnames";
import React, { createContext, useState } from "react";
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback =  (selectedIndex: number) => void
export interface MenuProps {
  mode?: MenuMode,
  defaultIndex?: number,
  className?: string,
  style?: React.CSSProperties,
  onSelect?: SelectCallback,
  children?: React.ReactNode
}

interface IMenuContext {
  index: number,
  onSelect?: SelectCallback,
  mode?: MenuMode
}

export const MenuContext =  createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = props => {
  const { className, mode, defaultIndex,
   style, children,onSelect } = props

   const classes = classNames('jw-menu', className,{
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const [currentActive, setActive] = useState(defaultIndex)
  
  const handleClick = (index: number) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode
  }

  const renderChiuldren = () => {
    return React.Children.map(children, (child,index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } =  childElement.type 
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index
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
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu