import React, {useState} from 'react'
import classNames from 'classnames'

export enum AlertType {
  Default = 'default',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning'
}
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

  if(!hide) {
    return (
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description &&  <p className="jw-alert-desc">{description}</p>}
        {closable && <span className="jw-alert-close" onClick={handleClose}>关闭</span>}
      </div>
    )
  } else {
    return null
  }
 
}

Alert.defaultProps = {
  type: AlertType.Default,
  closable: true,
}
export default Alert