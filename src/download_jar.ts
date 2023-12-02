import axios from 'axios'
import * as fs from 'fs' // Using fs.promises for async file operations

export async function downloadFile(): Promise<void> {
  try {
    const url = 'https://unified-agent.s3.amazonaws.com/wss-unified-agent.jar'
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    })

    const writer = fs.createWriteStream('./wss-unified-agent.jar')

    response.data.pipe(writer)

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })

    console.log('File downloaded successfully!')
  } catch (error) {
    console.error('Error downloading file:', error)
    throw error
  }
}
