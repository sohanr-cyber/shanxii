function generateTrackingNumber (length = 10) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let trackingNumber = ''

  for (let i = 0; i < length; i++) {
    trackingNumber += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    )
  }

  return trackingNumber
}

export { generateTrackingNumber }
