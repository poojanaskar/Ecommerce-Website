import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../services/wish-list.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist',
    imports: [CommonModule, CardComponent ,RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  userId: string = '';
  wishlistProducts: any[] = [];
  loading: boolean = true;

  constructor(private wishlistService: WishListService) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.id;
      this.loadWishlist();
    } else {
      this.loading = false;
    }
  }

  loadWishlist() {
    this.loading = true;
    this.wishlistService.getWishlist(this.userId).subscribe({
      next: (res) => {
        if (res.success && res.wishlist) {
          this.wishlistProducts = res.wishlist.productsId;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  removeProductFromUI(productId: string) {
  this.wishlistProducts = this.wishlistProducts.filter(p => p._id !== productId);
}
}








