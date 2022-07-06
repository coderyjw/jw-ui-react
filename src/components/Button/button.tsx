import React from 'react'
import classNames from 'classnames';
export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' |'default'|'danger' |'link'


interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType,
  children?: React.ReactNode,
  href?: string
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial< NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * 
 * ```javascript
 * import { Button } from 'jw-ui-react'
 * ```
 */
export const Button: React.FC<ButtonProps> = (props) => {
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
    'disabled': (btnType ==='link') && disabled
  })

  if(btnType === 'link' && href) {
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
  btnType: 'default'
}
export default Button