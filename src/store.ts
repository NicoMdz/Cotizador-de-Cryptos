import {create} from "zustand"
import {devtools} from "zustand/middleware"
import { CryptoCurrency, CrytoPrice, Pair } from "./types"
import { getCryptos, getCryptoData } from "./services/CryptoService"

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[]
    result: CrytoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair : Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies: cryptocurrencies
        }))
    },
    // result: {} as CrytoPrice, Otra manera de poner el state inicial
    result: {
        IMAGEURL: "",
        PRICE: "",
        HIGHDAY: "",
        LOWDAY: "",
        CHANGEPCT24HOUR: "",
        LASTUPDATE: ""
    },
    loading: false,
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await getCryptoData(pair)
        set(() => ({
            result: result,
            loading: false
        }))
    }
})))