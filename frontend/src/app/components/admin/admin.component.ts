import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-admin',
  imports: [RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  totalProducts:number =0
  category:number =0
  Brand:number =0
  constructor( private brand :BrandService, private cat: CategoryService  ,private service:ProductService , ){
  }

  ngOnInit(){
     this.service.getOneProductByName().subscribe({
    next: (res) => {
      console.log("Products from API", res.data);
      this.totalProducts = res.data.length;  // Count number of products
    },
    error: (err) => {
      console.log("Error fetching products", err);
    }
  });

    this.cat.getCategoryList().subscribe({
    next: (res)=>{
this.category = res.data.length
console.log("this.category",this.category)
    }

   
  })
  this.brand.getBrand().subscribe({
   next: (res)=>{
this.Brand = res.data.length
console.log("this.category",this.category)
    }
  })


  }
 
}
