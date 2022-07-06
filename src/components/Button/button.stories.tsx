import Button from './button'

import { ComponentStory, ComponentMeta } from '@storybook/react'


const buttonMeta: ComponentMeta<typeof Button> = {
  title: '第四章：Button',
  component: Button
}

export default buttonMeta


export const Default: ComponentStory<typeof Button> = () => (
  <Button>Default Button</Button>
)
Default.storyName = '默认按钮样式'

export const BButtonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)
BButtonWithSize.storyName = '不同尺寸的按钮'

export const CButtonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
)

CButtonWithType.storyName = '不同类型的按钮'