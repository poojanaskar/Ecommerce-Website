import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProductResponseApi} from '../type/type'
interface productResponse {
  success : boolean ,
  data : product[]
}

interface OneproductResponse {
  success : boolean ,
  data : product
}

interface product {
  
   _id: string;
  name: string;
  description: string;
  shortDescription: string;
  categoryID: string;
  BrandID: string;
  images: string[];
  Price: number;
  discount: number;
}

interface addProduct{
  
   
  name: string;
  description: string;
  shortDescription: string;
  categoryID: string;
  BrandID: string;
  images: string[];
  Price: number;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  
baseUrl ="https://ecommerce-website-tnjq.onrender.com"
  constructor(private http:HttpClient ) { }


  getProduct():Observable<productResponse>{
return this.http.get<productResponse>(`${this.baseUrl}/product`)


  }
  
  getCategoeyProduct(name:string):Observable<productResponse>{
    console.log("incoming name",name)
return this.http.get<productResponse>(`${this.baseUrl}/diffrent/${name}`)


  }

addProduct(data:any):Observable<addProduct>{
  return this.http.post<addProduct>(`${this.baseUrl}/product/add` ,data)
}
  deleteProduct(id:string){
   return this.http.delete(`${this.baseUrl}/product/${id}`)
  }

  getOneProductList(id:string):Observable<OneproductResponse>{
    console.log(id)
    return  this.http.get<OneproductResponse>(`${this.baseUrl}/product/${id}`)
  }

   getOneProductByName():Observable<ProductResponseApi>{
   
    return  this.http.get<ProductResponseApi>(`${this.baseUrl}/categoryName/name`)
  }
  updateProduct(id:string| null,data:any){
    return this.http.patch(`${this.baseUrl}/product/update/${id}` , data)
  }
}
