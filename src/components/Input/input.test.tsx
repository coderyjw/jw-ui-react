import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Input, InputProps } from './input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}
describe('测试Input组件', () => {
  it('应该呈现正确的默认输入', () => {
    const wrapper = render(<Input {...defaultProps}/>)
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('jw-input-inner')
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  it('应该在禁用的属性上呈现禁用的输入', () => {
    const wrapper = render(<Input disabled placeholder="disabled"/>)
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('应该在 size 属性上呈现不同的输入大小', () => {
    const wrapper = render(<Input placeholder="sizes" size="lg" />)
    const testContainer = wrapper.container.querySelector('.jw-input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })
  it('应该在 prepend/append 属性上呈现 prepend 和 append 元素', () => {
    const {queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"/>)
    const testContainer = container.querySelector('.jw-input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    expect(queryByText('https://')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })
})