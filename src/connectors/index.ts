import type { Web3Provider } from '@ethersproject/providers'
import { getPriorityConnector } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import metaMask, { isMetaMask } from './metaMask'
import walletConnect, { isWalletConnect } from './walletConnect'
// import CoinbaseWallet, { isCoinbaseWallet } from './coinbase'
import walletConnectLogo from '../components/walletconnect.png'
import metaMaskLogo from '../components/metamask.png'

export type { Web3Connector } from './utils'

interface ConnectorInfo {
  name: string
  logo: string
}

export function getConnectorInfo(connector: Connector): ConnectorInfo {
  if (isMetaMask(connector)) {
    return { name: ' MetaMask', logo: metaMaskLogo }
  } else if (isWalletConnect(connector)) {
    return { name: ' WalletConnect', logo: walletConnectLogo }
  // } else if (isCoinbaseWallet(connector)) {
  //   return { name: ' CoinbaseWallet', logo: walletConnectLogo }
  } else {
    throw new Error('Unknown Connector')
  }
}

export const connectors = [metaMask, walletConnect]

export function useActiveProvider(): Web3Provider | undefined {
  return getPriorityConnector(...connectors).usePriorityProvider() as Web3Provider
}
