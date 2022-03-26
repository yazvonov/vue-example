export default class CurrencyService {
  // Get random dollar currency from 20 to 80
  getDollarCurrency(): number {
    return Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  }
}
