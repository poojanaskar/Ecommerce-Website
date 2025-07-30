import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Category {
  _id: number;
  name: string;
}

interface CategoryApiResponse {
  success: boolean;
  data: Category[];
}
interface deleteCategory{
    success: boolean;
  data: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private BaseRule:string =  "https://ecommerce-website-tnjq.onrender.com" ;

  constructor(private http : HttpClient) {}
  getCategoryList(): Observable<CategoryApiResponse> {
   return this.http.get<CategoryApiResponse>(`${this.BaseRule}/category` )

  }

  addCategory(data:any){
    return this.http.post(`${this.BaseRule}/category/add` ,data)
  }


  updateCategory(  data:any,id:string| null){
    return this.http.put(`${this.BaseRule}/category/${id}` , data)
  }

  deleteCategory(id:string |null): Observable<deleteCategory>{
    console.log("is service" , id)
return this.http.delete<deleteCategory>(`${this.BaseRule}/category/delete/${id}`)
  }
}
