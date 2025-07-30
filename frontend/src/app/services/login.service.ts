import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login ,LoginResponse  } from "../type/type"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

 BASE_URL = 'https://ecommerce-website-tnjq.onrender.com'; 
  constructor(private http : HttpClient) { 
 }
 login(data:login):Observable<LoginResponse >{
  console.log("data register" , data)
return this.http.post<LoginResponse >(`${this.BASE_URL}/profile/login` , data)
 }
}
