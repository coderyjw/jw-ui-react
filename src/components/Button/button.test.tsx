import { render, fireEvent } from "@testing-library/react";

import Button, {ButtonProps, ButtonSize, ButtonType} from "./button";
const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Danger,
  size: ButtonSize.Large,
  className: 'coder'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button',() => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() 
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('jw-btn jw-btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
    expect(element.disabled).toBeFalsy()
    
  })
  it('should render the correct component based on different props',() => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('coder jw-btn-danger jw-btn jw-btn-lg')
  })
  it('should render a lin when btnType equals link and hred is provided',() => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('jw-btn jw-btn-link')
  })
  it('should renderdisabled button when disabled set to true',() => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>)
    const element = wrapper.getByText('disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})