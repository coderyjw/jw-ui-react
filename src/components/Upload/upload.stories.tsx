import React from 'react'
import { storiesOf} from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'

const log = (e: string)=> {
  console.log(e)
  return true
}
const SimpleUpload = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('change')}
      beforeUpload={e => log('beforeUpload')}
      />
    )
}


storiesOf('Upload 上传', module).add('Upload', SimpleUpload)