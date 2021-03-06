import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID ? process.env.REACT_APP_CHAIN_ID : 1

export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getMasterChefAddress = (masterChefSymbol) => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getLimitOrderAddress = () => {
  return addresses.limitOrder[chainId]
}
// export const getLotteryTicketAddress = () => {
//   return addresses.lotteryNFT[chainId]
// }

// export const getPlockAddress = () => {
//   return addresses.plock[chainId]
// }
