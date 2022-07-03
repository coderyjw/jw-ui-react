import classNames from "classnames";
import { createContext, useState } from "react";

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback =  (selectedIndex: number) => void
export interface MenuProps {
  mode?: MenuMode,
  defaultIndex?: number,
  className?: string,
  style?: React.CSSProperties,
  onSelect?: SelectCallback,
  children: React.ReactNode
}

interface IMenuContext {
  index: number,
  onSelect?: SelectCallback
}

export const MenuContext =  createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = props => {
  const { className, mode, defaultIndex,
   style, children,onSelect } = props

   const classes = classNames('jw-menu', className, {
    'menu-vertical': mode === 'vertical'
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
    onSelect: handleClick
  }
  return (<ul className={classes} style={style}>
    <MenuContext.Provider value={passedContext}>
      {children}  
    </MenuContext.Provider>
  </ul>)
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu