function transformData (inputData) {
  const result = []

  for (const [date, values] of Object.entries(inputData)) {
    const total = values.total || 0
    const pending = (values.pending || 0) + (values.Pending || 0)
    const processing = values.Processing || 0
    const canceled = values.Canceled || 0
    const failed = values.Failed || 0
    const delivered = values.Delivered || 0
    const packing = values.Packing || 0

    result.push({
      date: date,
      total: total,
      pending: pending,
      processing: processing,
      canceled: canceled,
      failed: failed,
      delivered: delivered,
      packing: packing
    })
  }

  return result
}

// const data = {
//   '2024-03': {
//     total: 22,
//     pending: 22
//   },
//   '2024-04': {
//     total: 33,
//     pending: 13,
//     Pending: 3,
//     Processing: 1,
//     Canceled: 6,
//     Failed: 5,
//     Delivered: 4,
//     Packing: 1
//   },
//   '2024-07': {
//     total: 1,
//     Pending: 1
//   }
// }

console.log(transformData(data))
