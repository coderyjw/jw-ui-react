import { ReactNode } from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
declare type TransitionProps = CSSTransitionProps & {
    /** 动画名称 */
    animation?: AnimationName;
    /** 添加一层div  */
    wrapper?: boolean;
    children?: ReactNode;
};
export declare const Transition: React.FC<TransitionProps>;
export default Transition;
