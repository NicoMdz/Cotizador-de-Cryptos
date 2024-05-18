import {z} from "zod"
import { CurrencySchema, CryptoCurrencyResponseSchema, PairSchema, CrytoPriceSchema } from "../schema/crypto-schema";

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency= z.infer<typeof CryptoCurrencyResponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type CrytoPrice = z.infer<typeof CrytoPriceSchema>