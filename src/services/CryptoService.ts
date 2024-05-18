import axios from "axios"
import { CryptoCurrenciesResponseSchema, CrytoPriceSchema } from "../schema/crypto-schema" 
import { Pair } from "../types"

export async function getCryptos() {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
    const {data: {Data}} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    if (result.success) {
        return result.data
    }
}

export async function getCryptoData(pair : Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`
    const {data: {DISPLAY}} = await axios(url)
    //Ya que incluso los nombres de las llaves cambian con cada llamado, usaremos esta sintaxis de corchetes para acceder a cada una dependiendo de nuestros datos.
    const result = CrytoPriceSchema.safeParse(DISPLAY[pair.cryptoCurrency][pair.currency])
    if(result) {
        return result.data
    }
}