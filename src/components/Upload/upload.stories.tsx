import React  from 'react'
import { ComponentMeta } from '@storybook/react'
import { Upload, UploadProps } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

export default { 
  title: 'Upload 上传',
  id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
} as ComponentMeta<typeof Upload>

export const ASimpleUpload = (args:UploadProps) => (
  <Upload
    {...args}
    action="https://jsonplaceholder.typicode.com/posts"
  >
    <Button size="lg" btnType="primary"><Icon icon="upload" /> 点击上传 </Button>
  </Upload>  
)
ASimpleUpload.storyName = '普通的 Upload 组件'
export const BCheckUpload = (args:UploadProps) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  }
  return (
    <Upload
      {...args}
      action="https://jsonplaceholder.typicode.com/posts"
      beforeUpload={checkFileSize}
    >
      <Button size="lg" btnType="primary"><Icon icon="upload" /> 不能传大于50Kb！ </Button>
    </Upload>  
  )
}
BCheckUpload.storyName = '上传前检查文件大小'
export const CDragUpload = (args:UploadProps) => (
  <Upload
    {...args}
    action="https://jsonplaceholder.typicode.com/posts"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
CDragUpload.storyName = '拖动上传'