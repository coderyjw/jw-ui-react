import React, {useState} from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition';
export type AlertType = 'default' | 'success' | 'danger' | 'warning'
export interface AlertProps {
  /**标题 */
  title: string;
  /**描述 */
  description?: string;
  /**类型 四种可选 针对四种不同的场景 */
  type?: AlertType;
  /**关闭alert时触发的事件 */
  onClose?: () => void;
  /**是否显示关闭图标*/
  closable?: boolean;
}

/** 
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 * 
 * ~~~js
 * import { Alert } from 'jw-ui-react'
 * ~~~
*/
export const Alert: React.FC<AlertProps> = (props) => {
  const [ hide, setHide ] = useState(false)

  const {
    title,
    type,
    description,
    closable,
    onClose
  } = props
  const classes = classNames('jw-alert', {
    [`jw-alert-${type}`]: type,
  })
  const titleClass = classNames('jw-alert-title', {
    'bold-title': description
  })
 
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }

  return (
    <Transition
      in={!hide}
      timeout={300}
      animation="zoom-in-top"
    >
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description &&  <p className="jw-alert-desc">{description}</p>}
        {closable && <span className="jw-alert-close" onClick={handleClose}><Icon icon="times"/></span>}
      </div>
    </Transition>
  )

 
}

Alert.defaultProps = {
  type: 'default',
  closable: true,
}
export default Alert