import { useCallback, useRef, useState, useEffect } from 'react'
import { BsWallet } from 'react-icons/bs'
import { SupportedLocale, SUPPORTED_LOCALES, SwapWidget, darkTheme, lightTheme, Theme } from '@uniswap/widgets'
import Liquidity from './Liquidity'
import ConnectorModal from './ConnectorModal'
import TokenPrice from './TokenPrice'
import Transactions from './Transactions'
import Menu from './Menu';

// ↓↓↓ Don't forget to import the widgets' fonts! ↓↓↓
import '@uniswap/widgets/fonts.css'
// ↑↑↑

import { useActiveProvider } from '../connectors'
import { JSON_RPC_URL } from '../constants'
import Web3Connectors from './Web3Connectors'
import styles from '../styles/Home.module.css'
import icon1 from './icon1.png'
import icon2 from './icon2.png'
import arvicon from './arvethicon.png'

// const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
const TOKEN_LIST = [
  {
    name: 'Artemis Vision',
    address: '0x28fDA76721a8077A5dE802Ab0212849B8c38429E',
    symbol: 'ARV',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://artemisvision.io/arvlogo200px.png',
  },
  {
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    decimals: 6,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
  {
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    decimals: 6,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
]

const ARV = '0x28fDA76721a8077A5dE802Ab0212849B8c38429E'

export default function App() {
  // When a user clicks "Connect your wallet" in the SwapWidget, this callback focuses the connectors.
  const connectors = useRef<HTMLDivElement>(null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
  }

  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()

  // The locale to pass to the SwapWidget.
  // This is a value from the SUPPORTED_LOCALES exported by @uniswap/widgets.
  const [locale, setLocale] = useState<SupportedLocale>('en-US')
  const onSelectLocale = useCallback((e) => setLocale(e.target.value), [])
  const [theme, setTheme] = useState('light')
  const [backdrop, setBackdrop] = useState('leftwrap')
  const [backdroptrans, setBackdroptrans] = useState('transactioncontainer')
  const [toggle, setToggle] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [connectedWalletAddress, setConnectedWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    if (provider) {
      provider
        .getSigner()
        .getAddress()
        .then((address: string) => {
          if (address) {
            const firstFive = address.substr(0, 5)
            const lastFour = address.substr(-4)
            setConnectedWalletAddress(`${firstFive}...${lastFour}`)
          } else {
            setConnectedWalletAddress(null)
          }
        })
    } else {
      setConnectedWalletAddress(null)
    }
  }, [provider])

  const toggleTheme = () => {
    setToggle(!toggle)
    setDarkMode(!darkMode)
    if (theme === 'light') {
      setTheme('dark')
      setBackdrop('leftwrapb')
      setBackdroptrans('transactioncontainerw')
    } else {
      setTheme('light')
      setBackdrop('leftwrap')
      setBackdroptrans('transactioncontainer')
    }
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const myLight: Theme = {
    ...lightTheme, // Extend the lightTheme
    primary: '#000000',
    secondary: '#7c527d',
    interactive: '#d1d1d1',
    container: '#efefef',
    module: '#f9f9f9',
    accent: '#b500dc',
    outline: '#b500dc',
    dialog: '#FFF',
    borderRadius: 0.8,
  }
  const myDark: Theme = {
    ...darkTheme, // Extend the darkTheme
    accent: '#b500dc',
    primary: '#FFFFFF',
    secondary: '#888D9B',
    module: '#000000',
    outline: '#b500dc',
    container: '#010101',
    dialog: '#000',
    interactive: '#191919',
  }

  const hideConnectionUI = true

  return (
    <div className={styles.container}>

      <div className={`App ${theme}`}>
        <div className="toggleback">
          {/* <button className="togglebutton" onClick={toggleTheme}>
            {toggle ? <img src={icon1} alt="icon1" /> : <img src={icon2} alt="icon2" />}
          </button> */}
        </div>
      </div>
      <div className={styles.i18n}>
        <label style={{ display: 'flex' }}></label>


        <div>
          <button className={styles.walletButton} onClick={toggleModal}>
            <div className={styles.iconwallet}>
              <BsWallet />
            </div>
            {connectedWalletAddress ? connectedWalletAddress : 'Connect Wallet'}
          </button>
          <ConnectorModal isOpen={modalIsOpen} toggle={toggleModal}>
            <button className={styles.closebut} onClick={toggleModal}>
              X
            </button>
            <div className={styles.clearright}></div>
            <div className={styles.connectors} ref={connectors} tabIndex={-1}>
              <Web3Connectors />
            </div>
            <div className={styles.disclaimer}>
              By connecting a wallet, you agree to Uniswap <br></br> Labs' Terms of Service and consent to its<br></br>{' '}
              Privacy Policy.
            </div>
          </ConnectorModal>
        </div>
      </div>
      <main className={styles.main}>
      {/* <div>
        <Menu />
      </div> */}
        {/* <h1 className="headertitle">ArvSwap 2.0</h1>
        <span className="headertext">Exchange ARV tokens in seconds</span> */}

        <div className={styles.demo}>
          <div>
            {/* <div className={`App ${backdrop}`}>
              <img className={styles.arvicon} src={arvicon} alt="arvicon" />
              <h2>Liquidity Information</h2>
              <Liquidity contractAddress="0x508f74d5080d4ad6d1d91bae0c1acb5d9418fd2d" />
              <div>
                <h2>Token Price</h2>
                <TokenPrice />
              </div>
            </div> */}
          </div>
          <div className={styles.widget}>
            <SwapWidget
              theme={darkMode ? myDark : myLight}
              jsonRpcEndpoint={JSON_RPC_URL}
              tokenList={TOKEN_LIST}
              provider={provider}
              locale={locale}
              onConnectWallet={toggleModal}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={ARV}
            />
          </div>
        </div>

        {/* <div className={`App ${backdroptrans}`}>
          <Transactions />
        </div> */}
      </main>

      <div></div>
    </div>
  )
}
