class SellerApi {
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

  getProfile = (token: string | null = localStorage.getItem('JWT')) =>
    fetch(`${this.baseURL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this.checkResponse);
}

const sellerApi = new SellerApi(
  'https://arbuziki.herokuapp.com/api/seller',
  {}
);

export default sellerApi;
