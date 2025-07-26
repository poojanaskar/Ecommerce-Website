import { Component } from '@angular/core';
import { FeaturedProductService } from '../../services/featured-product.service';
import { CardComponent } from '../card/card.component';
import { newProduct } from '../../type/type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-featured-product',
  imports: [CardComponent, CommonModule],
  templateUrl: './featured-product.component.html',
  styleUrl: './featured-product.component.scss'
})
export class FeaturedProductComponent {
newProductLIst :newProduct []=[]
    constructor(private service : FeaturedProductService){
  
    }

    ngOnInit(){
  this.service.getFeature().subscribe({
    next : (res)=>{
console.log("res" ,res)
this.newProductLIst  = res.data
    },error:(err)=>{
console.log("erreor " ,err)
    }
  })
}

}
