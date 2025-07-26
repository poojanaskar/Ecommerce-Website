import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product  ,ProductMatch} from '../../type/type';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CartService } from '../../services/cart.service';
import { cartArray } from '../../type/type';
@Component({
  selector: 'app-detail-product',
  imports: [CommonModule , CardComponent],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent {
constructor(private cartS : CartService,  private router : Router,private service : ProductService , private route : ActivatedRoute){}
id: string =''
userId: string =''
  product!:ProductMatch
selectedImage : string = ''
images:string []=[]
categoryName : string =''
categoryArray !: any
similarProducts !: any
token: string | null ="" ;
data: any 
 cartData:cartArray []=[] ; 

  ngOnInit(){

    
 this.token = localStorage.getItem('authToken');
if (this.token) {

  const payload = JSON.parse(atob(this.token.split('.')[1]));
  console.log(payload); 
   this.userId = payload.id;
      

}
  
    this.id =this.route.snapshot.paramMap.get('id') || ''

    this.service.getOneProductList(this.id).subscribe({
next : (res)=>{
console.log("res detail in product detail page " , res.data)
 this.product = res.data
this.images = res.data.images
this.selectedImage = res.data.images[0];
this.categoryArray = res.data;
this.categoryName = this.categoryArray.categoryID.name
console.log("this.categoryName " , this.categoryName )
 
if(this.categoryName ){
    this.service.getCategoeyProduct(this.categoryName).subscribe({
next :(res)=>{
  console.log(res,"category response checkit now")
  this.similarProducts= res.data
},
error:(err)=>{console.log(err," err category response checkit now") }
  

})
}
},
error :(err)=>{
  console.log("error " , err)
}
    })

  
  }
setImage(img:string){
this.selectedImage =img ;
}
addToCart(pid:string){
   if (!this.userId) {
      alert('Please log in to add products to the cart.');
      return;
    }
  console.log("id in detail page add to cart", pid)
   alert(`${this.product.name} added to cart!`);
   this.data= {productId:pid ,userId: this.userId  , quantity: 1} 
   this.cartS.postCart(this.data).subscribe({})


}
getTotalPrice(): number {
  return this.cartData.reduce((total, item) => {
    const price = item.productId.Price || 0;
    const qty = item.quantity || 1;
    return total + (price * qty);
  }, 0);
}
buyNow() {
   if (!this.userId) {
    alert('Please log in to buy products.');
    return;
  }
  alert(`Proceed to buy ${this.product.name}`);

  const data = {
    productId: this.product._id,
    userId: this.userId,
    quantity: 1
  };

  // First, add to cart via API
  this.cartS.postCart(data).subscribe(() => {
    // Fetch updated cart
    this.cartS.getCart(this.userId).subscribe((res: any) => {
      console.log(res , " cart response ")
this.cartData = res.cart.items;
  console.log(this.cartData , " this.cartData ")
 if (!this.cartData || this.cartData.length === 0) {
    alert('Your cart is empty!');
    return;
  }
      console.log(this.getTotalPrice() , "this.getTotalPrice()")
   const checkoutData = {
    cart: this.cartData,
    total: this.getTotalPrice()
  };
   console.log(checkoutData , "checkoutData")

        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

      this.router.navigate(['/checkout']);
    });
  });
}


}
