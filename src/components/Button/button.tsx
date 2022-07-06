import React from 'react'
import classNames from 'classnames';
export type ButtonSize = 'lg' | 'sm'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType,
  children?: React.ReactNode,
  href?: string
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial< NativeButtonProps & AnchorButtonProps>




const Button: React.FC<ButtonProps> = (props) => {
  const { 
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
   } = props
  const classes = classNames('jw-btn',className, {
    [`jw-btn-${btnType}`]: btnType,
    [`jw-btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })

  if(btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes} {...restProps}>{children}</a>
    )
  }else {
    return (
      <button disabled={disabled} className={classes} {...restProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}
export default Button