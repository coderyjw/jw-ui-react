import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactElement, InputHTMLAttributes } from 'react';

type InputSize = 'sm' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}

export const Input: React.FC<InputProps> = (props) => {
  // 取出各种属性
  const { disabled, size, icon, prepend, append } = props;
  // 根据属性计算不同的className

  return (
    // 根据属性判断是否需要添加特定的节点
    <div>input</div>
  );
};

export default Input;
