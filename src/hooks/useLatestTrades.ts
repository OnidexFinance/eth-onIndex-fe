import { useEffect, useState } from 'react'
import axios from 'axios';
// import { DEX_API_BASE_URL } from 'config/constants/endpoints';
import useRefresh from './useRefresh';

const useLatestTrades = (tokenAddress, jwtToken) => {
  const [latestTrades, setLatestTrades] = useState([])
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchLatestTrades = async () => {
      try {
        const result = await axios.get(`https://dapp-backend-bsc.vercel.app/lastTrades?token=${tokenAddress}&exchange=UniSwap&network=ethereum`, {
          headers: {
            token: jwtToken.jwtToken
          }
        });
        const dexTrades = [...result.data.tokenLastTrades.data.ethereum.dexTrades];
        setLatestTrades(dexTrades.slice(0, 20));
      // eslint-disable-next-line no-empty
      } catch (error) {
      }
    };

    if (jwtToken) {
      fetchLatestTrades()
    }
  }, [tokenAddress, jwtToken, slowRefresh])

  return latestTrades
}

export default useLatestTrades
