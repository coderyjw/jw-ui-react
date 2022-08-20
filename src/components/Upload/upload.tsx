import axios from 'axios';
import React, { ChangeEvent, FC , useRef} from 'react'

import Button from '../Button/button'

export interface UploadProps  {
  action: string;
  onProgress?: (percent: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void; 
  onError?: (err: any, file: File) => void;
}

export const Upload: FC<UploadProps> = props => {
  const { action,onError,onProgress,onSuccess } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if(fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e:ChangeEvent<HTMLInputElement>)=> {
    const files = e.target.files
    if(!files) return
    
    uploadFiles(files)
    if(fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios.post(action,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            console.log(percentage, file)
            if (percentage < 100) {
            if(onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      }).then(res => {
        console.log({res})
        if(onSuccess) {
          onSuccess(res.data,file)
        }
      }).catch(err => {
        console.log(err)
        if(onError) {
          onError(err, file)
        }
      })
    })
  }
  return (
    <div  className="jw-upload-component">
     <Button btnType='primary' onClick={handleClick}>Upoload File</Button>
     <input 
      ref={fileInput} 
      className="jw-file-input" 
      style={{display:'none'}} 
      type="file"
      onChange={handleFileChange}
      />

    </div>
  )
}