/* eslint-disable class-methods-use-this */
import UserData from '../constants/types';
import { serverUrlApi } from '../constants/urlPath';
import { IOrderData } from './types/interfaces';

class ClientApi {
  baseURL: string;

  headers: object;

  constructor(baseURL: string, headers: object) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  checkResponse(response: Response) {
    const json = response.json();
    if (response.ok) {
      return json;
    }
    return json.then(Promise.reject.bind(Promise));
  }

  checkResponseWithoutJSON(response: Response) {
    if (response.ok) {
      return response;
    }
    return Promise.reject(response);
  }

  getProfile = (token: string | null = localStorage.getItem('JWT')) =>
    fetch(`${this.baseURL}/profile`, {
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

  getBucket = (token: string | null = localStorage.getItem('JWT')) =>
    fetch(`${this.baseURL}/bucket`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);

  updateProfile = (
    updateData: UserData,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/profile`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...updateData }),
    }).then(this.checkResponseWithoutJSON);

  removeItemFromBucket = (
    productId: string,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/bucket/items/${productId}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponseWithoutJSON);

  clearBucket = (token: string | null = localStorage.getItem('JWT')) =>
    fetch(`${this.baseURL}/bucket`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponseWithoutJSON);

  setOrderStatus = (
    status: 'COMPLETED' | 'PAYED',
    orderId: string,
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/orders/${orderId}?orderStatus=${status}`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkResponse);

  postOrder = (
    data: IOrderData[],
    token: string | null = localStorage.getItem('JWT')
  ) =>
    fetch(`${this.baseURL}/orders`, {
      method: 'POST',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify([...data]),
    }).then(this.checkResponse);
}

const clientApi = new ClientApi(`${serverUrlApi}/client`, {
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export default clientApi;
