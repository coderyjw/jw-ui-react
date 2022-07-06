import React, {useState} from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition';
export type AlertType = 'default' | 'success' | 'danger' | 'warning'
export interface AlertProps {
  title: React.ReactNode,
  description?: React.ReactNode,
  type?: AlertType,
  onClose?: () => void;
  closable?: boolean
}
const Alert: React.FC<AlertProps> = (props) => {
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