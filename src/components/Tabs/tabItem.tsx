
import React, { FC, ReactNode } from 'react'
export interface TabItemProps {
  /** Tab选项上面的文字 */
  label: string | React.ReactElement;
  /** Tab选项是否被禁用 */
  disabled?: boolean;
  children?: ReactNode;
}
const TabItem: FC<TabItemProps> = props => {
  const { children } = props
  return  (
    <div className="jw-tab-panel">
      {children}
    </div>
  )
}

export default TabItem


