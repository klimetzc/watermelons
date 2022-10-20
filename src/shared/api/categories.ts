import { serverUrlApi } from '../constants/urlPath';

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

  getCategory = (categoryId: string) =>
    fetch(`${this.baseURL}/${categoryId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this.checkResponse);

  getProducts = (categoryId: string) =>
    fetch(`${this.baseURL}/${categoryId}/items`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this.checkResponse);

  getProduct = (categoryId: string, productId: string) =>
    fetch(`${this.baseURL}/${categoryId}/items/${productId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this.checkResponse);

  addToBucket = (
    categoryId: string,
    productId: string,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/${categoryId}/items/${productId}/bucket`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
}

const categoriesApi = new CategoriesApi(`${serverUrlApi}/categories`, {});

export default categoriesApi;
