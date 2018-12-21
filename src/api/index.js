import axios from 'axios'
import config from '../../configs/config'

export default {
  request (method, urn, data = null) {
    console.log(`Data: ${data}`)
    console.log(`Urn: ${urn}`)
    console.log(`Method: ${method}`)

    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!urn) {
      console.error('API function call requires urn argument')
      return
    }
    var uri = config.serverURL + urn
    return axios({method, url: uri, data })
  }
}
