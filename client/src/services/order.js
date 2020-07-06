import Fetcher from './fetcher';
import { API_GET_HISTORY, API_POST_ORDER } from '../constants';

export default class OrderService {

  async getHistory(userId) {
    const response = await Fetcher.get(API_GET_HISTORY(userId));
    const parsedResponse = await response.json();

    return parsedResponse && parsedResponse.result ? parsedResponse.result : [];
  }

  async makeOrder(order) {
    const response = await Fetcher.post(API_POST_ORDER, order);
    const parsedResponse = await response.json();

    return parsedResponse && parsedResponse.result ? parsedResponse.result : null;
  }
}