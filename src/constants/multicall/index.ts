import { ChainId } from '@evercreative-libs/onidex-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  42: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  // [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  // [ChainId.RINKEBY]: '0x301907b5835a2d723Fe3e9E8C5Bc5375d5c1236A'
}
const multiCall2 = '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'

export { MULTICALL_ABI, MULTICALL_NETWORKS }
