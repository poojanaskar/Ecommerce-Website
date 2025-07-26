export interface newProduct {
              _id: string;
  name: string;
  shortDescription: string;
  description: string;
  BrandID: string;
  categoryID: string;
  Price: number;
  discount: number;
  images: string[];
  isFeature: boolean;
  isNewProduct: boolean;
  __v: number;} 


  export interface newProductResponse {
              data : newProduct[],
              success: boolean
  }

export interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  Price: number;
  discount: number;
  images: string[];
  categoryID:  {
    _id: string;
    name: string;
  };
  BrandID: { _id: string; name: string };
  isFeature?: boolean;     
  isNewProduct?: boolean;   
  __v?: number;
}

export interface ProductMatch {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  Price: number;
  discount: number;
  images: string[];
  categoryID:  string;
  BrandID?: string ;
  isFeature?: boolean;     
  isNewProduct?: boolean;   
  __v?: number;
}

 export interface ProductResponseApi{

    data : Product[],
              success: boolean
 }

 export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

 export interface login {

  email: string;
  password: string;

}

export interface LoginResponse {
  success: boolean;
  status: number;
  message: string;
  token: string;
}


export interface CartResponse {
  cart: cart;  
}
export interface cart {
  
createdAt:string ;
items :cartArray[];
updatedAt: string;
userId: string
__v: number
_id: string


}

export interface cartArray {
  productId: {
    _id: string;
    name: string;
    discount: number;
    Price: number;
    images: string[];
  };
  quantity?: number; 
}








