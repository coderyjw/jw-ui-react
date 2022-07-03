import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps:MenuProps = {
  mode: 'vertical',
  defaultIndex: '0'
}

const generateMenu = (props:MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem >deafult</MenuItem>
    </Menu>
  )
}

let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('测试Menu MenuItem组件', () => {
  beforeEach(() => {  
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('是否渲染正确的Menu和MenuItem 基于默认的属性',() => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('jw-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('jw-menu-item is-active')
    expect(disabledElement).toHaveClass('jw-menu-item is-disabled')
  })

  it('属性的点击回调是否会被触发',() => {
    const thirditem= wrapper.getByText('deafult')
    fireEvent.click(thirditem)
    expect(thirditem).toHaveClass('jw-menu-item is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })

  it('mode为vertical时，是否正确渲染',() =>{
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})