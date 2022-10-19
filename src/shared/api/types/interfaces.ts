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
}

export interface IProductList {
  data: string;
}

export interface ICategory {
  id: number;
  title: string;
}
