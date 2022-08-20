import React from 'react'
import { storiesOf} from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'

const log = (e: string)=> {
  console.log(e)
  return true
}

const defaultFileList: UploadFile[] = [
  {uid: '1', size: 1234, name: 'hello.md', status:'uploading',percent: 50},
  {uid: '2', size: 1234, name: 'xyz.md', status:'success',percent: 11},
  {uid: '3', size: 1234, name: 'esad.md', status:'error',percent: 22}
]
const SimpleUpload = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('change')}
      beforeUpload={e => log('beforeUpload')}
      defaultFileList={defaultFileList}
      />
    )
}


storiesOf('Upload 上传', module).add('Upload', SimpleUpload)