import { useCallback, useRef, useState, useEffect } from 'react'
import { BsWallet } from 'react-icons/bs'
import { SupportedLocale, SUPPORTED_LOCALES, darkTheme, lightTheme, Theme } from '@uniswap/widgets'

import ConnectorModal from './ConnectorModal'
import Menu from './Menu'

import { useActiveProvider } from '../connectors'
import { JSON_RPC_URL } from '../constants'

import styles from '../styles/Home.module.css'

export default function Arvbridge() {
  const connectors = useRef<HTMLDivElement>(null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
  }

  const provider = useActiveProvider()

  const [locale, setLocale] = useState<SupportedLocale>('en-US')
  const onSelectLocale = useCallback((e) => setLocale(e.target.value), [])

  const [theme, setTheme] = useState('light')
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
    } else {
      setTheme('light')
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

  useEffect(() => {
    setConnectedWalletAddress(null) // Reset connected wallet address state
  }, []) // Empty dependency array triggers this effect only on mount

  return (
    <div className={styles.container}>
      <Menu />
    </div>
  )
}
