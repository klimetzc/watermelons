class CategoriesApi {
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

  getCategories = () =>
    fetch(`${this.baseURL}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this.checkResponse);
}

const categoriesApi = new CategoriesApi(
  'https://develop--watermelons-rmr.netlify.app/api/categories',
  {}
);

export default categoriesApi;
