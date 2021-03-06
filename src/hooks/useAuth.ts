import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorLocalStorageKey, connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { connect } = useWallet()

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      window.localStorage.setItem(connectorLocalStorageKey, connectorID)

      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              connect(connector)              
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              console.error('Provider Error', 'No provider was found')
              // toastError('Provider Error', 'No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              console.error('Authorization Error', 'Please authorize to access your account')
              // toastError('Authorization Error', 'Please authorize to access your account')
            } else {
              console.error(error.name, error.message)
              // toastError(error.name, error.message)
            }
          }
        })
      } else {
        console.error('Unable to find connector', 'The connector config is wrong')
        // toastError('Unable to find connector', 'The connector config is wrong')
      }
    },
    [activate, connect],
  )

  const logout = useCallback(() => {
    // dispatch(profileClear())
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    window.localStorage.removeItem(connectorLocalStorageKey)

    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
  }, [deactivate])

  return { login, logout }
}

export default useAuth
