import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Product} from '../../type/type'
import { WishListService } from '../../services/wish-list.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  wishlist: string[] = [];
    userId: string | null = null;
  isWishlisted: boolean = false;
    @Output() removedFromWishlist = new EventEmitter<string>();
  constructor(private router : Router , private wishlistService: WishListService, ){

  }
@Input() item : any
id: string =''
token: string | null ="" ;
 userWishlist: string[] = [];  
takeID(data: string){
console.log("id card" , data)
this.id = data
this.router.navigate([`detailProduct/${this.id}`])

}
ngOnInit(){
 this.token = localStorage.getItem('authToken');
if (this.token) {

  const payload = JSON.parse(atob(this.token.split('.')[1]));
  console.log(payload); 
   this.id = payload.id;
      

}

this.wishlistService.getWishlist( this.id).subscribe({
next : (res)=>{
console.log("yeeeeeeeeeee" ,res)
 this.userWishlist = res.wishlist.productsId.map((p: any) => p._id || p); 
 console.log("yeeeeeeeeeee userWishlist" ,this.userWishlist)
}


})

}

isWishlistedCheck(id:string) {
  return this.userWishlist.includes(id); 
}


toggleWishlist(event: Event, product: Product) {
  event.stopPropagation();

  if (!this.id) {
    alert('Please log in to use the wishlist.');
    return;
  }

  if (this.isWishlistedCheck(product._id)) {
   
    this.userWishlist = this.userWishlist.filter(pId => pId !== product._id);
   this.removedFromWishlist.emit(product._id);
    // Remove from backend
    this.wishlistService.removeFromWishlist(this.id, product._id).subscribe({
      error: () => {
        // Revert if API fails
        this.userWishlist.push(product._id);
      }
    });
  } else {
    // Optimistically update UI
    this.userWishlist.push(product._id);

    // Add to backend
    this.wishlistService.addToWishlist(this.id, product._id).subscribe({
      error: () => {
        // Revert if API fails
        this.userWishlist = this.userWishlist.filter(pId => pId !== product._id);
      }
    });
  }
}

}

  
