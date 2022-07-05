import { render,RenderResult,fireEvent } from '@testing-library/react'
import Tabs, { TabsProps } from './tabs'
import TabItem from './tabItem'

const testProps: TabsProps = {
  defaultIndex: 1,
  onSelect: jest.fn()
}

let wrapper: RenderResult
describe('Tbas组件测试用例额', () => {
  beforeEach(() => {
    wrapper = render(
      <Tabs {...testProps}>
        <TabItem label="tab1">content1</TabItem>
        <TabItem label="tab2">content2</TabItem>
        <TabItem label="disabled" disabled>content3</TabItem>
      </Tabs>
    )
  })

  it('呈现正确的默认选项卡', () => {
    const { queryByText, container } = wrapper
    expect(container.querySelector('.jw-tabs-nav')).toHaveClass('nav-line')
    const activeElement = queryByText('tab2')
    expect(activeElement).toBeInTheDocument()
    expect(activeElement).toHaveClass('is-active')
    expect(queryByText('tab1')).not.toHaveClass('is-active')
    expect(queryByText('content2')).toBeInTheDocument()
  })

  it('点击TabItem应该切换到对应的内容', () => {
    const { queryByText, getByText } = wrapper
    const clickedElement = getByText('tab1')
    fireEvent.click(clickedElement)
    expect(clickedElement).toHaveClass('is-active')
    expect(queryByText('tab2')).not.toHaveClass('is-active')
    expect(queryByText('content1')).toBeInTheDocument()
    expect(queryByText('content2')).not.toBeInTheDocument()
    expect(testProps.onSelect).toHaveBeenCalledWith(0)
  })

  it('单击禁用的TabItem不应该工作', () => {
    const { getByText } = wrapper
    const disableElement = getByText('disabled')
    expect(disableElement).toHaveClass('disabled')
    fireEvent.click(disableElement)
    expect(disableElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })
})