import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './styles.css'
import { FiUpload } from 'react-icons/fi'

interface Props {
  onFileUploaded: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

  
  const [selectedImageUrl, setSelectedImageUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)

    setSelectedImageUrl(fileUrl)
    onFileUploaded(file)
    
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accept:'image/*'
    })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        isDragActive ?
          <p>Solte os arquivos aqui...</p> :

          selectedImageUrl 
          ? <img src={selectedImageUrl} alt="Upload Image Preview"/>
          : (
          <p>
              <FiUpload/>
              Arraste/solte alguns arquivos aqui, ou clique para selecionar o arquivo
          </p>
          )
      }
    </div>
  )
}

export default Dropzone