
import { UploadFile } from './upload'
import Icon from '../Icon/icon'


export interface UploadListProps {
  fileList: UploadFile[],
  onRemove: (_file: UploadFile) => void
}
export const UploadList: React.FC<UploadListProps> = props => {
  const {
    fileList,
    onRemove,
  } = props
  console.log('firelist', fileList)
  return (
    <ul className="jw-upload-list">
      {fileList.map(item => {
        return (
          <li className="jw-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => { onRemove(item)}}/>
            </span>
          </li>
        )
      })}
    </ul>
  )

}

export default UploadList