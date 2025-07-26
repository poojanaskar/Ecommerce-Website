import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {cart , cartArray } from "../../type/type"
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
token: string | null ="" ;
id: string  ="" ;
price :number =0
product!: cartArray 
constructor(private cartS: CartService , private router : Router) {}
  cartData:cartArray []=[] ; 

ngOnInit(){

 this.token = localStorage.getItem('authToken');
if (this.token) {

  const payload = JSON.parse(atob(this.token.split('.')[1]));
  console.log(payload); 
   this.id = payload.id;
      

}

  this.cartS.getCart( this.id).subscribe({
next : (res)=>{

  console.log(res , " cart response ")
this.cartData = res.cart.items;
// this.product = this.cartData



 console.log(this.cartData , " cart response storage ")

}, error:(err)=>{
  console.log(err)
}
  })
}
 increaseQuantity(index: number) {
    const item = this.cartData[index];
    item.quantity = (item.quantity || 1) + 1;

    this.cartS.updateQuantity(this.id, item.productId._id, item.quantity!)
      .subscribe(() => console.log("Quantity increased in backend"));
  }

  decreaseQuantity(index: number) {
    const item = this.cartData[index];
    if ((item.quantity || 1) > 1) {
      item.quantity = (item.quantity || 1) - 1;

      this.cartS.updateQuantity(this.id, item.productId._id, item.quantity!)
        .subscribe(() => console.log("Quantity decreased in backend"));
    }
  }

getTotalPrice(): number {
  return this.cartData.reduce((total, item) => {
    const price = item.productId.Price || 0;
    const qty = item.quantity || 1;
    return total + (price * qty);
  }, 0);
}
goToCheckout() {
  console.log('CartData before navigating:', this.cartData); // Debug

  if (!this.cartData || this.cartData.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const checkoutData = {
    cart: this.cartData,
    total: this.getTotalPrice()
  };

  // Save for fallback
  localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

  // Navigate with state
  this.router.navigate(['/checkout'], { state: checkoutData });
}



}
