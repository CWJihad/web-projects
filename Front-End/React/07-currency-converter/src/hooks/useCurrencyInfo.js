import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  const api = `https://api.currencyapi.com/v3/latest?apikey=cur_live_CPHrss6nsoIniYErxQmy23cCRdVQl2N0fx0Wbrut&base_currency=${currency}`;

  useEffect(() => {
    const fetchCurrency = async () => {
      const res = await fetch(api)
      const json = await res.json()

      setData(json.data)
    }

    fetchCurrency()
    
  }, [currency])
  
  return data
  
}

export default useCurrencyInfo
