
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { cartArray } from '../../type/type';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-check-out',

  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss' , 
  imports: [CommonModule, ReactiveFormsModule],

})
export class CheckOutComponent implements OnInit {
  cartItems: cartArray[] = [];
  total: number = 0;
  userId: string = "";
  shippingForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cartS: CartService
  ) {}

  ngOnInit() {
    const state: any = this.router.getCurrentNavigation()?.extras.state;
  console.log('State received on checkout:', state);  // Debug log

  if (state) {
    this.cartItems = state.cart || [];
    this.total = state.total || 0;
    localStorage.setItem('checkoutData', JSON.stringify(state));
  } else {
    const saved = localStorage.getItem('checkoutData');
    console.log('Fallback data from localStorage:', saved);  // Debug log
  if (state) {
    this.cartItems = state.cart || [];
    this.total = state.total || 0;
    localStorage.setItem('checkoutData', JSON.stringify(state));
  } else {
    // Fallback if page is refreshed
    const saved = localStorage.getItem('checkoutData');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.cartItems = parsed.cart || [];
      this.total = parsed.total || 0;
    }
  }
  }

    // Decode userId from token
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.id;
    }

    // Create Reactive Form for shipping details
    this.shippingForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  placeOrder() {
    console.log("this.shippingForm.valid", this.shippingForm.invalid)
    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      alert('order placed Succesfullt');
      return;
    }

    const order = {
      userId: this.userId,
      items: this.cartItems,
      total: this.total,
      shippingDetails: this.shippingForm.value
    };

    this.cartS.placeOrder(order).subscribe({
      next: (res) => {
        alert('Order placed successfully!');
        console.log('Order Response:', res);
        localStorage.removeItem('checkoutData');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Order placed successfully!');
      }
    });
  }
}
