import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 interface BrandApiResponse{
 success: boolean;
  data: brand[];
  }
  interface brand{
     "_id": string,
            "name": string
           
  }
   interface addBrand{
      success: boolean;
  data: string;
           
  }
@Injectable({
  providedIn: 'root'
})
export class BrandService {
 
baseUrl ="https://ecommerce-website-tnjq.onrender.com"
  constructor( private http : HttpClient) { }

  deleteBrand(id:string){
    return this.http.delete(`${this.baseUrl}/brand/${id}`)
  }
  getBrand(): Observable<BrandApiResponse>{
    return this.http.get<BrandApiResponse>(`${this.baseUrl}/brand`)
  }

  addBrand(name : string):Observable<addBrand>{
    console.log("name" ,name)
    return this.http.post<addBrand>(`${this.baseUrl}/brand/add` , name)
  }

  updateBrand(id: string ,data:any){
return this.http.put(`${this.baseUrl}/brand/update/${id}` , data )
  }
}
