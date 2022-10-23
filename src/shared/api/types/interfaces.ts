export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  quantityOfBuying: number;
  checked: boolean;
  image: string | number | null;
  idCategory: number;
}

export interface IProductWithCount extends IProduct {
  count: number;
}

export interface IProductFull {
  id: number;
  title: string;
  description: string;
  techDescription: string;
  price: number;
  currency: string;
  rating: number;
  quantityOfBuying: number;
  checked: boolean;
  images: string[] | number[] | null;
  idCategory: number;
}

export interface IProductPost {
  title: string;
  description: string;
  techDescription: string;
  price: string;
  currency: 'USD' | 'RUB' | 'CNY' | 'EUR';
  images?: string[];
}

export interface IProductList {
  data: string;
}

export interface ICategory {
  id: number;
  title: string;
}

export interface Seller {
  id: number;
  name: string;
  country: string;
  completedOrders: number;
  rating: number;
  charge: number;
  balance: number;
  holdBalance: number;
  currency: string;
}

export interface ISellerPatch {
  name: string;
  country: string;
  email: string;
}

export interface ISellerOrder {
  id: number;
  created: string;
  changed: string;
  sum: number;
  address: string;
  orderStatus: string;
  clientName: string;
}
