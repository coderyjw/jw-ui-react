import React,{useState} from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../Button/button'
import Transition from './transition'
export default {
  title: 'Transition 过渡',
  id: 'Transition',
  component: Transition,
} as ComponentMeta<typeof Transition>

export const ADefaultTabs: ComponentStory<typeof Transition> = (args) => {
  const [showBtn, setShowBtn] = useState(false)
  return (
    <>
      <Button onClick={e => setShowBtn(!showBtn)}>showButton</Button>
      <Transition  in={showBtn} wrapper timeout={300} {...args}>
        <div style={{marginBottom: '10px'}}>
          <Button autoFocus> Hello </Button>
        </div>
      </Transition>
    </>

  )
}
ADefaultTabs.storyName = '默认的Transition'
