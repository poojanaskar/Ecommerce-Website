import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { User} from "../type/type"

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 BASE_URL = 'https://ecommerce-website-tnjq.onrender.com'; 
  constructor(private http : HttpClient) { 
 }
 register(data:User){
  console.log("data register" , data)
return this.http.post(`${this.BASE_URL}/users/register` , data)
 }
}
