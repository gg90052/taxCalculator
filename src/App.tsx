import React, { useEffect } from "react"
import axios from "axios"
import "./App.css"
import Header from "./components/Header"
import InputMoney from "./components/InputMoney"
import { supportCurrency } from "./types"

export const ContextStore = React.createContext({} as supportCurrency);

function App() {
  const [currency, setCurrency] = React.useState({} as supportCurrency);
  async function getCurrency() {
    const result = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=AgvJrkUloZWxm9__1zWmi16iCuyjM2Xj0V3_DiDyewCtvnYcPA5AMQ5myrBYzrP3KfeRoyi2qtxAycw8Gc3Xs7Z7B2xqqyOBm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFcWIXHFHFekbamqTXii3bJJY5fdw8l-NL1vARaXG4kA227UV886wLEeNA7rKYMcQLojxXCjXQD0nJ3DWgHxNbHf-zY7sgfeItz9Jw9Md8uu&lib=M723U3NPOmeyPsADMnTAyW_dF4fEebSNL');
    return result.data;
  }
  useEffect(() => {
    let ignore = false;
    getCurrency().then((response) => {
      if (!ignore) {
        setCurrency(response);
        saveToLocalStorage(response);
      }
      return () => { ignore = true; }
    });
  }, [])

  const saveToLocalStorage = (data: any) => {
    localStorage.setItem("currency", JSON.stringify(data));
  }
  return (
    <div className="text-center w-[390px] mx-auto">
      <Header />
      <ContextStore.Provider value={currency}>
        <InputMoney />
      </ContextStore.Provider>
    </div>
  )
}

export default App