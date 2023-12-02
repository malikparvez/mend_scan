import * as core from '@actions/core'
import { exec } from 'child_process'
import { downloadFile } from './download_jar'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const WS_APIKEY: string = core.getInput('WS_APIKEY')
    const WS_USERKEY: string = core.getInput('WS_USERKEY')
    const WS_PRODUCTNAME: string = core.getInput('WS_PRODUCTNAME')
    const WS_PROJECTNAME = process.env.GITHUB_REPOSITORY || ''

    core.debug('Starting mend scan')
    process.env.WS_APIKEY = WS_APIKEY
    process.env.WS_USERKEY = WS_USERKEY
    process.env.WS_PRODUCTNAME = WS_PRODUCTNAME
    process.env.WS_PROJECTNAME = WS_PROJECTNAME
    await downloadFile()

    exec('java -jar wss-unified-agent.jar', (error, stdout, stderr) => {
      if (error) {
        console.error('Error scanning the repository:', error)
      } else {
        console.log(stdout)
      }
    })
    //java -jar wss-unified-agent.jar
    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
