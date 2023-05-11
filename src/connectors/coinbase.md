import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';

import { Connector } from '@web3-react/types';
import { JSON_RPC_URL } from '../constants';
import { toWeb3Connector } from './utils'



export function isCoinbaseWallet(connector: Connector) {
  return connector instanceof CoinbaseWallet
}

const connector = initializeConnector<CoinbaseWallet>(
  
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: JSON_RPC_URL,
        appName: 'web3-react',
      },
    })
)

export default toWeb3Connector(connector)

