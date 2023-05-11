import { useEffect, useState } from "react";
import axios from "axios";


interface LiquidityProps {
  contractAddress: string;
}

interface TokenInfo {
  symbol: string;
  name: string;
}

interface PairInfo {
  totalSupply: string;
  reserveUSD: string;
  token0: TokenInfo;
  token1: TokenInfo;
}

const Liquidity = ({ contractAddress }: LiquidityProps) => {
  const [pairInfo, setPairInfo] = useState<PairInfo | null>(null);

  useEffect(() => {
    const fetchPairInfo = async () => {
      try {
        const response = await axios.post(
          "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
          {
            query: `
              {
                pair(id: "${contractAddress}") {
                  totalSupply
                  reserveUSD
                  token0 {
                    symbol
                    name
                  }
                  token1 {
                    symbol
                    name
                  }
                }
              }
            `,
          }
        );

        const result = response.data;
        setPairInfo(result.data.pair);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPairInfo();
  }, [contractAddress]);

  if (!pairInfo) {
    return <p>Loading...</p>;
  }

  const { totalSupply, reserveUSD, token0, token1 } = pairInfo;

  // Convert reserveUSD to a number and calculate the liquidity in USD
  const liquidityUSD = parseFloat(reserveUSD);

  return (
    <div>
      <p>{token0.symbol}-{token1.symbol} Pool:
      ${liquidityUSD.toLocaleString()}</p>
     
    </div>
  );
};

export default Liquidity;
