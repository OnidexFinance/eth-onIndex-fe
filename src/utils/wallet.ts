// Set of helper functions to facilitate wallet setup

import { BASE_URL } from 'config'
// import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = process.env.REACT_APP_CHAIN_ID
      ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
      : 1;

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      });
      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
    return false;
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${BASE_URL}/images/tokens/${tokenAddress}.png`,
      },
    },
  })

  return tokenAdded
}