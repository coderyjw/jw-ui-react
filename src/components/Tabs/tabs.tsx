import React,{ useState,ReactNode,FunctionComponentElement } from "react"
import classNames from "classnames";
import { TabItemProps } from './tabItem'

export interface TabsProps {
  defaultIndex?: number;
  className?: string;
  onSelect?: (selectedIndex: number) => void;
  type?: 'line' | 'card';
  children?: ReactNode;
}

const Tabs: React.FC<TabsProps> = props => {
  const { className, type,defaultIndex,children, onSelect } = props
  const [ activeIndex, setActiveIndex ] = useState(defaultIndex)

  const handleClick = (e: React.MouseEvent, index: number, disabled: boolean | undefined) => {
    if(!disabled) {
      setActiveIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }
  const navClass = classNames('jw-tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  })

  const renderNavLinks = () => {
    return React.Children.map(children, (child,index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      console.log({childElement, child, index})
      const { disabled, label } = childElement.props
      const classes = classNames('jw-tabs-nav-item', {
        'is-active': activeIndex === index,
        'disabled': disabled,
      })
      return (
        <li 
          className={classes} 
          key={`nav-item-${index}`}
          onClick={(e) => {handleClick(e, index, disabled)}}
        >
          {label}
        </li>)
    })
    
    // return  tabsList.map(item => <li className={classes} key={item} onClick={e => setLabel(item)}>{item}</li>)
  }

  const renderContent = () => {
    return React.Children.map(children, (child,index) => {
      if (index === activeIndex) {
        return child
      }
    })
  }

  return <div className={`jw-tabs ${className}`}>
    <div className="jw-tabs-nav">
      <ul className={navClass}>
        {renderNavLinks()}
      </ul>

    </div>
    <div className="jw-tabs-content">
      {renderContent()}
    </div>
  </div>
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line'
}
export default Tabs