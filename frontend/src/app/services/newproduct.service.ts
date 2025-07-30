import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  newProductResponse } from '../type/type';
@Injectable({
  providedIn: 'root'
})
export class NewproductService {
baseUrl ="https://ecommerce-website-tnjq.onrender.com"
  constructor(private http : HttpClient) { }

getNewProduct():Observable<newProductResponse>{
 return this.http.get<newProductResponse>(`${this.baseUrl}/newProduct`)
}


}
