import mongoose from 'mongoose'
import { MONGODB_URI } from '@/config'
const connection = {}

async function connect() {
  if (connection.isConnected) {
    console.log('already connected')
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('use previous connection')
      return
    }
    await mongoose.disconnect()
  }
  const db = await mongoose.connect(MONGODB_URI, {})
  console.log('new connection')
  connection.isConnected = db.connections[0].readyState
}

// async function disconnect () {
//   if (connection.isConnected) {
//     if (process.env.NODE_ENV === 'production') {
//       await mongoose.disconnect()
//       connection.isConnected = false
//     } else {
//       console.log('not disconnected')
//     }
//   }
// }


async function disconnect() {
  if (connection.isConnected) {
    // ✅ Never disconnect automatically — just log
    console.log('Skipping disconnect in production')
    return

    // ❌ If you really need to disconnect at some point,
    // implement logic to check for idle state first.
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString()
  doc.createdAt = doc.createdAt.toString()
  doc.updatedAt = doc.updatedAt.toString()
  return doc
}

const db = { connect, disconnect, convertDocToObj }
export default db
