
import sharp from 'sharp'


function bufferToBase64 (buffer) {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getFileBufferRemote (url) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

export async function getPlaceholderImage (filepath) {
  try {
    const originalBuffer = await getFileBufferRemote(filepath)
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer()
    return {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer)
    }
  } catch (err) {
    console.log(err)
    return {
      src: filepath,
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='
    }
  }
}
