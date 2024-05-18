import { useState, ChangeEvent, FormEvent } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function CryptoSearchForm() {
  const { cryptocurrencies, fetchData } = useCryptoStore();
  //state con la moneda y la cripto
  const [pair, setPair] = useState<Pair>({
    currency: "",
    cryptoCurrency: "",
  });

  const [error, setError] = useState("")

  const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //Validación
    if (Object.values(pair).includes("")) {
      setError("Todos los campos son Obligatorios")
      return
    }
    setError("")
    //Consultar API
    fetchData(pair)
  }


  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda</label>
        <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
          <option value="">-- Seleccione Moneda --</option>
          {currencies.map((currency) => (
            <option value={currency.code} key={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cryptoCurrency">Criptomoneda</label>
        <select name="cryptoCurrency" id="cryptoCurrency" onChange={handleChange} value={pair.cryptoCurrency}>
          <option value="">-- Seleccione Moneda --</option>
          {cryptocurrencies.map((crypto) => (
            <option value={crypto.CoinInfo.Name} key={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value={"CotizaR"} />
    </form>
  );
}
