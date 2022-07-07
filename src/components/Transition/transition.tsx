import { ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
type TransitionProps = CSSTransitionProps & {
  /** 动画名称 */
  animation?:AnimationName
  /** 添加一层div  */
  wrapper?: boolean,
  children?: ReactNode
}

export const Transition:React.FC<TransitionProps> = props => {

  const { children, classNames, animation, wrapper, ...restProps} = props
  return (
    <CSSTransition 
      classNames = { classNames ? classNames : animation}
      { ...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
  animation: 'zoom-in-top'
}


export default Transition