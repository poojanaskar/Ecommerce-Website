import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
baseUrl ="https://ecommerce-website-tnjq.onrender.com"
  constructor(private http :HttpClient) { }


  addToWishlist(userId: string, productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/wishlist/add`, { userId, productId });
  }

  removeFromWishlist(userId: string, productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/wishlist/remove`, { body: { userId, productId } });
  }
    getWishlist(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/wishlist/${userId}`);
  }
}
