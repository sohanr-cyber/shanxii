import React, { useEffect, useState } from 'react'
import styles from '../../styles/Utility/Upload.module.css'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '@/database/firebase'
import ProgressBar from './ProgressBar'

const UploadMany = ({ handle }) => {
  const [files, setFiles] = useState([''])
  const [uploading, setUploading] = useState(false)
  const [progressPercent, setProgressPercent] = useState(0)
  const [downloadURLs, setDownloadURLs] = useState([])
  useEffect(() => {
    if (downloadURLs.length > 0 && downloadURLs.length == files.length) {
      handle(downloadURLs)
      setFiles([])
      setDownloadURLs([])
      setUploading(false)
    }
  }, [downloadURLs.length])

  const handleFiles = async files => {
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const uploadTasks = files.map(async file => {
        const storageRef = ref(storage, `division/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
              setProgressPercent(progress)
            },
            reject, // Reject on error
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadURL => {
                  setDownloadURLs(prev => [...prev, downloadURL])
                  resolve() // Resolve after successful upload
                })
                .catch(reject) // Reject on error
            }
          )
        })
      })
      await Promise.all(uploadTasks)
    } catch (error) {
      alert(error)
      setUploading(false)
    }
  }
  return (
    <div className={styles.container}>
      {uploading && <ProgressBar value={progressPercent} />}
      <input
        type='file'
        className={styles.inputfile}
        multiple
        onChange={e => {
          setFiles(Array.from(e.target.files))
          handleFiles(Array.from(e.target.files))
        }}
        style={uploading ? { display: 'none' } : { display: 'block' }}
      />
    </div>
  )
}

export default UploadMany
