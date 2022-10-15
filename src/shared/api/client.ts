class ClientApi {
  baseURL: string;

  headers: any;

  constructor(baseURL: string, headers: object) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  checkResponse(response: any) {
    const json = response.json();
    if (response.ok) {
      return json;
    }
    return json.then(Promise.reject.bind(Promise));
  }

  getProfile = (token: string | null = localStorage.getItem('JWT')) => {
    const url = this.baseURL;
    return fetch(`${this.baseURL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this.checkResponse);
  };
}

const clientApi = new ClientApi(
  'https://arbuziki.herokuapp.com/api/client',
  {}
);

export default clientApi;
