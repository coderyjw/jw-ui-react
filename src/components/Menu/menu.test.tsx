import { cleanup, fireEvent, render, RenderResult,waitFor } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
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
      <SubMenu title="dropdown" >
        <MenuItem>dropdown1</MenuItem>
        <MenuItem>dropdown2</MenuItem>
        <MenuItem>dropdown3</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `.jw-submenu {
    display: none;
  }
    .jw-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}
let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('测试Menu MenuItem组件', () => {
  beforeEach(() => {  
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('是否渲染正确的Menu和MenuItem 基于默认的属性',() => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('jw-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('jw-menu-item is-active')
    expect(disabledElement).toHaveClass('jw-menu-item is-disabled')
  })

  it('属性的点击回调是否会被触发',() => {
    const thirditem= wrapper.getByText('deafult')
    fireEvent.click(thirditem)
    expect(thirditem).toHaveClass('jw-menu-item is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('mode为vertical时，是否正确渲染',() =>{
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('测试下拉菜单', async () => {
    expect(wrapper.queryByText('dropdown1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('dropdown1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('dropdown1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('dropdown1')).toBeVisible()
    })

  })
})