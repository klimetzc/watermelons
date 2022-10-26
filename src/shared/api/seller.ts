import { serverUrlApi } from '../constants/urlPath';
import { IProductPost, ISellerPatch } from './types/interfaces';

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
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);

  updateProfile = (
    data: ISellerPatch,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/profile`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data }),
    }).then(this.checkResponse);

  getProducts = (token: string | null = localStorage.getItem('JWT')) =>
    fetch(`${this.baseURL}/products`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);

  getOrders = (token: string | null = localStorage.getItem('JWT')) =>
    fetch(`${this.baseURL}/orders`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);

  getOrder = (
    orderId: string,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);

  postProduct = (
    data: IProductPost,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/products`, {
      method: 'POST',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data }),
    }).then(this.checkResponse);

  deleteProduct = (
    productId: string,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);

  setOrderStatus = (
    status: 'SHIPPED',
    orderId: string,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/orders/${orderId}/${status}`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);
}

const sellerApi = new SellerApi(`${serverUrlApi}/seller`, {
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export default sellerApi;
