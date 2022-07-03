import classNames from "classnames"


export interface MenuItemProps {
  index?: number,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties,
  children?: React.ReactNode
}


const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style ,children} = props
  const classes = classNames('jw-menu-item', className, {
    'is-disabled': disabled
  })
  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}

export default MenuItem