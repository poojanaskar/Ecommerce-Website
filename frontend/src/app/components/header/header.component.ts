import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product ,ProductMatch} from '../../type/type';
import { Router } from '@angular/router';
import { ArrayProvideServiceService } from '../../services/array-provide-service.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [CommonModule , RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

  showDropdown: boolean = false
  isLogin: boolean = false
   searchString:string =''
  category :any[] = []
  categoryName : Product[] = []
  searchArray : ProductMatch[] = []
  searchedArray  : ProductMatch[] = []
  categoryProName : any[] = []
constructor ( private auth : AuthService,private prodService : ArrayProvideServiceService,private cat: CategoryService  ,private service : ProductService , private router : Router ){}
 product!:Product 
 
  menuOpen = false;
ngOnInit(){
this.isLogin=this.auth.isLoggedIn()
  
     this.service.getOneProductByName().subscribe({
next : (res)=>{
console.log("res detail  " , res)
this.categoryName = res.data
console.log("res.data  " , res.data)
console.log("res.data  " , this.category)
// this.category = res.data


},
error :(err)=>{
  console.log("error  name" , err)
}
    })
  this.cat.getCategoryList().subscribe({
    next: (res)=>{
this.category = res.data
console.log("this.category",this.category)
    }
  })

}
 toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
onKeyPress(event:KeyboardEvent){
   const input = event.target as HTMLInputElement;
   this.searchString = input.value;  

  console.log('User pressed:',  this.searchString);
  this.service. getProduct().subscribe({
    next : (res)=>{
    
      this.searchArray= res.data
        console.log(  this.searchArray,"rs of product")
    },
    error:(err)=>{
         console.log(err,"no res of product")
    }
  })

    this.searchedArray = this.searchArray.filter((item: any) =>
        item.name.toLowerCase().includes(this.searchString)
      );
      if(this.searchedArray.length > 0 && this.searchString){
        this.showDropdown = true ;
      }else{
         this.showDropdown = false;
      }
         console.log( this.searchedArray ,"rs of productthis.searchedArray ")
}
getCategoryProductList(name: string) {
  console.log("Filtering by category:", name);

 this.categoryProName = this.categoryName.filter(prod =>
    prod.categoryID?.name?.toLowerCase().trim() === name.toLowerCase().trim()
  );
  this.prodService.setData( this.categoryProName)
    this.router.navigate(['/filtered-products'])
  console.log("Filtered Products:", this.categoryProName);
}

detailPageOPne(id:string){
  console.log("id detail page" , id)
 this.router.navigate([`detailProduct/${id}`])
}


logIn(){
  this.router.navigate(['/login'])
}

goToProfile(){
  this.router.navigate(['/profile'])
}
}
