import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { Product } from '../../type/type';
import { ArrayProvideServiceService } from '../../services/array-provide-service.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-filterd-products',
  imports: [CommonModule,CardComponent,FormsModule],
  templateUrl: './filterd-products.component.html',
  styleUrl: './filterd-products.component.scss'
})
export class FilterdProductsComponent {
   category :any[] = []
   Brand :any[] = []
    name : string =''
    Brname : string =''
   isShow : boolean = false
  categoryName: Product []=[]
  categorylist: Product []=[]
  productlist: Product []=[]
    categoryProName : any[] = []
     sortOrder: string = '';
     isCollapsed = false;
constructor(  private br : BrandService, private router : Router,private prodservice : ProductService ,private cat: CategoryService  ,private service : ArrayProvideServiceService){

}
  ngOnInit(){
    
this.categoryName =this.service.getData()
console.log("hey check ",this.categoryName)

  
    this.prodservice.getOneProductByName().subscribe({
next :(res)=>{
    console.log("dekh")
     this.productlist= res.data
     console.log("brandlist" , this.productlist)
     this.categoryName = [...this.productlist]

} ,
error:(err)=>{
  console.log(err)
}
    })

    


  

  }

 getCategoryProductList(event : Event) {

 
  this.name= (event.target as HTMLSelectElement).value;
  console.log("Filtering by category:", this.name);
 this.categoryProName = this.categorylist.filter(prod =>
    prod.categoryID?.name?.toLowerCase().trim() === this.name.toLowerCase().trim()
  );
  if(this.categoryProName.length ===0){
    this.isShow = true
  }
  console.log("Filtered Products:", this.categoryProName);
  // this.service.setData( this.categoryProName)
  this.categoryName =this.service.getData();

   
}


onBrandChange(event: Event){

  this.Brname= (event.target as HTMLSelectElement).value;
  console.log("Filtering by Brand:", this.Brname);
this.applyFilter()
}

onCategoryChange(event: Event){

  this.name= (event.target as HTMLSelectElement).value;
  console.log("Filtering by Brand:", this.name);
  this.applyFilter()

}
 onSortChange(event: Event) {
    this.sortOrder = (event.target as HTMLSelectElement).value;
    this.applyFilter();
  }

  applyFilter() {
    this.categoryName = this.productlist.filter(prod => {
      const matchesCategory = this.name 
        ? prod.categoryID?.name?.toLowerCase() === this.name.toLowerCase()
        : true;

      const matchesBrand = this.Brname 
        ? prod.BrandID?.name?.toLowerCase() === this.Brname .toLowerCase()
        : true;
 this.service.setData(this.categoryName);
      return matchesCategory && matchesBrand;
    });
     if (this.sortOrder === 'low') {
      this.categoryName.sort((a, b) => a.Price - b.Price);
    } else if (this.sortOrder === 'high') {
      this.categoryName.sort((a, b) => b.Price - a.Price);
    }
}

   toggleSidebar() {
  this.isCollapsed = !this.isCollapsed;
}

clearFilters() {
  this.name= '';
  this.Brname = '';
  this.sortOrder = '';
  this.categoryName = [...this.productlist];  // Reset products
}

}