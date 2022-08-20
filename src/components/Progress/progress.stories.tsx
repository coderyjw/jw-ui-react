import React  from 'react'
import { ComponentMeta } from '@storybook/react'
import { Progress, ProgressProps } from './progress'
import Button from '../Button/button'
import Icon from '../Icon/icon'

export default { 
  title: 'Progress 进度条',
  id: 'Progress',
  component: Progress,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
} as ComponentMeta<typeof Progress>

export const ASimpleUpload = (args:ProgressProps) => (
  <div>
    <Progress styles={{marginBottom: '10px'}} percent={10} theme='danger' />
    <Progress styles={{marginBottom: '10px'}} percent={20} theme="dark"/>
    <Progress styles={{marginBottom: '10px'}} percent={30} theme="info" />
    <Progress styles={{marginBottom: '10px'}} percent={50} theme="primary"/>
    <Progress styles={{marginBottom: '10px'}} percent={60} theme="secondary"/>
    <Progress styles={{marginBottom: '10px'}} percent={70} theme="success"/>
    <Progress styles={{marginBottom: '10px'}} percent={80} theme="warning"/>
  </div>
)
ASimpleUpload.storyName = '普通的 Progress 组件'
