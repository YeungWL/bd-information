import Cookies from 'js-cookie'
import * as config from 'utils/config'

const state = {
  token: Cookies.get(config.TOKEN),
  user: Cookies.get(config.USER)
}

export default state
