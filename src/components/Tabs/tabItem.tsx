
import React, { FC, ReactNode } from 'react'
export interface TabItemProps {
  label: string | React.ReactElement;
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


