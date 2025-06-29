import React, { useEffect, useState } from 'react'
import styles from '../../styles/Utility/Upload.module.css'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/database/firebase'
import Loading from './Loading'

const UploadMany = ({ handle }) => {
  const [files, setFiles] = useState([]) // ✅ Start with an empty array
  const [uploading, setUploading] = useState(false)
  const [progressPercent, setProgressPercent] = useState(0)
  const [downloadURLs, setDownloadURLs] = useState([])

  useEffect(() => {
    if (
      files.length > 0 &&
      downloadURLs.length === files.length
    ) {
      handle(downloadURLs)
      setFiles([])
      setDownloadURLs([])
      setUploading(false)
    }
  }, [downloadURLs])

  const handleFiles = async selectedFiles => {
    if (!selectedFiles || selectedFiles.length === 0) return

    setUploading(true)
    setDownloadURLs([])

    try {
      const uploadTasks = selectedFiles.map(file => {
        if (!file?.name) return Promise.resolve() // skip invalid

        const storageRef = ref(storage, `division/${file.name}-${Date.now()}`)
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
            error => {
              console.error('Upload error:', error)
              reject(error)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then(downloadURL => {
                  setDownloadURLs(prev => [...prev, downloadURL])
                  resolve()
                })
                .catch(error => {
                  console.error('GetDownloadURL error:', error)
                  reject(error)
                })
            }
          )
        })
      })

      await Promise.all(uploadTasks)
    } catch (error) {
      alert('Upload failed: ' + error.message)
      setUploading(false)
    }
  }

  return (
    <div className={styles.container}>
      {uploading && <Loading />}
      <input
        type="file"
        accept="image/*"
        className={styles.inputfile}
        multiple
        onChange={e => {
          const selected = Array.from(e.target.files)
          setFiles(selected)
          handleFiles(selected)
        }}
        style={uploading ? { display: 'none' } : { display: 'block' }}
      />
    </div>
  )
}

export default UploadMany
