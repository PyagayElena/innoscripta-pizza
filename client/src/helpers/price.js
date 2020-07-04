import { CURRENCY, CURRENCY_SIGN } from '../constants'

export default function NumberToPrice (value, currency) {
  // 0.89 - exchange rate on 07.05.2020
  const price = currency === CURRENCY.dollar ? value : value * 0.89;
  return `${CURRENCY_SIGN[currency]}${price.toFixed(2)}`
}