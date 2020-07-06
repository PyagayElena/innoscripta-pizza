import Fetcher from './fetcher';
import {
  API_USER_LOGIN,
  API_USER_REGISTRATION,
  API_UPDATE_USER,
  API_GET_USER
} from '../constants';

export default class UserService {

  async register(params) {
    const response = await Fetcher.post(API_USER_REGISTRATION, params);
    const parsedResponse = await response.json();

    return parsedResponse && parsedResponse.result ? parsedResponse.result : null;
  }

  async login(params) {
    const response = await Fetcher.post(API_USER_LOGIN, params);
    const parsedResponse = await response.json();

    if (!parsedResponse || parsedResponse.status !== 200) {
      return null;
    }

    const token = parsedResponse.result ? parsedResponse.result.token : null;
    if (!!token) {
      localStorage.setItem('token', token);
    }

    const userId = parsedResponse.result ? parsedResponse.result.id : null;
    if (userId) {
      localStorage.setItem('userId', userId)
    }

    return parsedResponse.result;
  }

  async getUserInfo(userId) {
    const response = await Fetcher.get(API_GET_USER(userId));
    const parsedResponse = await response.json();

    return parsedResponse && parsedResponse.result ? parsedResponse.result : null;
  }

  async updateUser(user) {
    const response = await Fetcher.post(API_UPDATE_USER, user);
    const parsedResponse = await response.json();

    return parsedResponse && parsedResponse.result ? parsedResponse.result : null;
  }

  async silentAuthorize() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!!token && !!userId) {
      return await this.getUserInfo(userId);
    } else {
      return null;
    }
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }
}