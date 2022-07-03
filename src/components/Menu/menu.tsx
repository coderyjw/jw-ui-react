import classNames from "classnames";

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  mode?: MenuMode,
  defaultIndex?: number,
  className?: string,
  style?: React.CSSProperties,
  onSelect?: (selectedIndex: number) => void,
  children: React.ReactNode
}


const Menu: React.FC<MenuProps> = props => {
  const { className, mode, defaultIndex,
   style, children } = props
   const classes = classNames('jw-menu', className, {
    'menu-vertical': mode === 'vertical'
   })
  return (<ul className={classes} style={style}>
    {children}
  </ul>)
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu