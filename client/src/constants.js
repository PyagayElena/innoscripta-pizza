export const CURRENCY = {
  dollar: 'usd',
  euro: 'eur'
};

export const CURRENCY_SIGN = {
  usd: '$',
  eur: '€'
};

// API paths
export const API = '/api/v1';
export const API_GET_PIZZAS = `${API}/products/pizza`;
export const API_GET_USER = (userId) => `${API}/user/${userId}`;
export const API_UPDATE_USER = `${API}/user/update`;
export const API_GET_HISTORY = (userId) => `${API}/orders/${userId}`;
export const API_POST_ORDER = `${API}/order`