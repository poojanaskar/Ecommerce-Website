import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CartResponse } from "../type/type"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
baseUrl ="https://ecommerce-website-tnjq.onrender.com"
  constructor(private http : HttpClient) { }

  getCart(id:string):Observable<CartResponse >{
    return this.http.get<CartResponse >(`${this.baseUrl}/cart/${id}`)
  }

  postCart(data:any){
    return this.http.post(`${this.baseUrl}/cart/add` , data)
  }
  updateQuantity(userId: string, productId: string, quantity: number) {
  return this.http.put(`${this.baseUrl}/cart/${userId}/${productId}`, { quantity });
}

   deleteCart(id:string , pId :string){
    return  this.http.delete(`${this.baseUrl}/cart/${id}/${pId}` )
   }

   placeOrder(order: any) {
  return this.http.post(`${this.baseUrl}/cart/order`, order);
}

}










