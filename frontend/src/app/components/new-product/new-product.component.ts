import { Component } from '@angular/core';
import { NewproductService } from '../../services/newproduct.service';
import { CardComponent } from '../card/card.component';
import { newProduct } from '../../type/type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  imports: [CardComponent ,CommonModule],
    standalone: true,
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
newProductLIst :newProduct []=[]

  constructor(private service : NewproductService){

  }
ngOnInit(){
  this.service.getNewProduct().subscribe({
    next : (res)=>{
console.log("res" ,res)
this.newProductLIst  = res.data
    },error:(err)=>{
console.log("erreor " ,err)
    }
  })
}

}
