import pica from 'pica'
import axios from 'axios'

const fetchAndBlurImage = async (url, width = 10, height = 10) => {
  if (typeof window === 'undefined') {
    return null
  }
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  const blob = new Blob([response.data], { type: 'image/jpeg' })

  const img = new Image()
  const src = URL.createObjectURL(blob)
  img.src = src

  await new Promise(resolve => {
    img.onload = resolve
  })

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height

  context.drawImage(img, 0, 0, width, height)

  const picaInstance = pica()
  const resultCanvas = document.createElement('canvas')
  resultCanvas.width = width
  resultCanvas.height = height

  await picaInstance.resize(canvas, resultCanvas)
  console.log({ resultCanvas })
  return resultCanvas.toDataURL()
}

export default fetchAndBlurImage
