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
  discontinued?: boolean;
  imageUrls?: string[] | null;
  preorder?: {
    priceWithoutDiscount: number;
    preorderCurrentQuantity: number;
    preorderExpectedQuantity: number;
    preorderEndsAt: string;
  };
}

export type IProductKeys = keyof IProduct;

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
  preorder?: {
    priceWithoutDiscount: number;
    preorderCurrentQuantity: number;
    preorderExpectedQuantity: number;
    preorderEndsAt: string;
  };
  idCategory: number;
}
export interface OrderData {
  id: number;
  created: string;
  changed: string;
  status: string;
  sum: number;
  sellerName: string;
}
export interface IOrderData {
  id: number;
  among: number;
}

export interface IErr {
  data?: {
    message?: string;
    status?: number;
  };
}

export interface IUserData {
  role: string;
  accessToken: string;
}

export interface IOrderProduct {
  productId: number;
  amount: number;
  price: number;
  productTitle: string;
}

export interface IOrderProducts {
  id: number;
  created: string;
  changed: string;
  status: string;
  sum: number;
  sellerName: string;
  orderItemDtoList: IOrderProduct[];
}

export interface ISellerOrderProducts {
  id: number;
  address: string;
  created: string;
  changed: string;
  clientName: string;
  orderStatus: string;
  sum: number;
  sellerName: string;
  orderItemDtoList: IOrderProduct[];
}

export interface IProductPost {
  title: string;
  description: string;
  techDescription: string;
  price: string;
  currency: 'USD' | 'RUB' | 'CNY' | 'EUR';
  images?: string[];
  categoryId: string;
  imageUrls: string[] | [];
  priceWithoutDiscount?: string;
  preorderExpectedQuantity?: string;
  preorderEndsAt?: string | null;
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
  email: string;
  companyEmail: string;
}

export interface ISellerPatch {
  name: string;
  country: string;
  email: string;
  companyEmail: string;
  address: string;
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
export type ISellerOrderKeys = keyof ISellerOrder;

export interface IOrderDataForUser {
  id: number;
  created: string;
  changed: string;
  status: string;
  sum: number;
  sellerName: string;
}
