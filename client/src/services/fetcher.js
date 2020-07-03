class Fetcher {

  constructor() {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  addHeader(name, value) {
    this.headers[name] = value
  }

  get(url, customHeaders = {}) {
    return fetch(`${url}`, this.defaultRequestInit('get', customHeaders))
  }

  post(url, body = {}, customHeaders = {}) {

    return fetch(url, {
      ...this.defaultRequestInit('post', customHeaders),
      body: JSON.stringify(body)
    })
  }

  defaultRequestInit(method, customHeaders = {}): RequestInit {
    return {
      method,
      headers: {...this.headers, ...customHeaders},
      credentials: 'include'
    }
  }
}

const singletonInstance = new Fetcher();
Object.freeze(singletonInstance);

export default singletonInstance;