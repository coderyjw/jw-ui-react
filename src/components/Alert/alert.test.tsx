import { render,fireEvent } from '@testing-library/react'
import Alert, {AlertProps} from './alert'

const testProps: AlertProps = {
  title: '我是标题',
  type: 'success',
  onClose: jest.fn(),
  description: 'hello',
}
describe('Alert提示组件测试用例',() =>{
  it('是否渲染一个success组件', () => {
    const { getByText, container, queryByText } = render(<Alert data-testid="test"{...testProps}/>)
    expect(queryByText('我是标题')).toBeInTheDocument()
    expect(container.querySelector('.jw-alert')).toHaveClass('jw-alert-success')
    fireEvent.click(getByText('关闭'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(queryByText('我是标题')).not.toBeInTheDocument()
  })

  it('关闭功能是否正常', () => {
    const { getByText, container, queryByText } = render(<Alert data-testid="test"{...testProps}/>)
    expect(queryByText('我是标题')).toBeInTheDocument()
    fireEvent.click(getByText('关闭'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(queryByText('我是标题')).not.toBeInTheDocument()
  })

  it('description 属性是否正常', () => {
    const { container, queryByText } = render(<Alert title="title" description="hello" closable={false}/>)
    expect(queryByText('title')).toHaveClass('bold-title')
    expect(queryByText('hello')).toBeInTheDocument()
    expect(queryByText('关闭')).not.toBeInTheDocument()

  })
  
})