import { serverUrlApi } from '../constants/urlPath';

class Auth {
  baseURL: string;

  headers: object;

  constructor(baseURL: string, headers: object) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  checkResponse(response: Response) {
    const json = response.json();
    if (response.ok) {
      return json;
    }
    return json.then(Promise.reject.bind(Promise));
  }

  signup = (email: string, password: string, role: string) =>
    fetch(`${this.baseURL}/register`, {
      method: 'POST',
      headers: { ...this.headers },
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    }).then(this.checkResponse);

  signin = (email: string, password: string) =>
    fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: { ...this.headers },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this.checkResponse);
}

const authApi = new Auth(`${serverUrlApi}/auth`, {
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export default authApi;
