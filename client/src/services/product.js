import Fetcher from './fetcher'
import { API_GET_PIZZAS } from '../constants'

export default class ProductService {

  async getPizzaList() {
    const response = await Fetcher.get(API_GET_PIZZAS);
    const parsedResponse = await response.json();

    return parsedResponse && parsedResponse.result ? parsedResponse.result : [];
  }
}