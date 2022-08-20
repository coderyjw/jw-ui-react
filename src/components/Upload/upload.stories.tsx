import React from 'react'
import { storiesOf} from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'


const SimpleUpload = () => {
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts"></Upload>
  )
}


storiesOf('Upload 上传', module).add('Upload', SimpleUpload)