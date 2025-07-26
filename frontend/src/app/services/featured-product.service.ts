import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newProductResponse } from '../type/type';

@Injectable({
  providedIn: 'root'
})
export class FeaturedProductService {
baseUrl ="http://localhost:3000"
  constructor(private http : HttpClient) { }

getFeature():Observable<newProductResponse>{
 return this.http.get<newProductResponse>(`${this.baseUrl}/feature`)
}


}
