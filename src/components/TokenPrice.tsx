import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TokenPrice = () => {
  const [price, setPrice] = useState('')
  const [price2, setPrice2] = useState('')

  useEffect(() => {
    const fetchPrice = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/artemis-vision?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false'
      )
      setPrice(data.market_data.current_price.usd)
    }

    fetchPrice()
  }, [])

  useEffect(() => {
    const fetchPrice2 = async () => {
      const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      setPrice2(data.ethereum.usd)
    }

    fetchPrice2()
  }, [])

  return (
    <div>
      <p>ARV price: ${price}</p>
      <p>ETH price: ${price2}</p>
    </div>
  )
}

export default TokenPrice
