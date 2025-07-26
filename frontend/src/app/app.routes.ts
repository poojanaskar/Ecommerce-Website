import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandComponent } from './components/manage/brand/brand.component';
import { BrandFormsComponent } from './components/manage/brand-forms/brand-forms.component';
import { ProductComponent } from './components/manage/product/product.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { CardComponent } from './components/card/card.component';
import { BannerComponent } from './components/banner/banner.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { FilterdProductsComponent } from './components/filterd-products/filterd-products.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { adminGuard } from './guards/admin.guard';


export const routes: Routes = [


              {
                    path: "",
                    component: HomeComponent        
              }
              ,
               {
                    path: "admin/categories",
                    component: CategoriesComponent  ,
                        canActivate: [adminGuard]      
              }
                 ,
               {
                    path: "admin/categories/add",
                    component: CategoryFormComponent    ,
                        canActivate: [adminGuard]   
              },
               {
                    path: "admin/categories/edit/:id",
                    component: CategoryFormComponent ,
                        canActivate: [adminGuard]      
              },
              {
                    path: "admin/brand",
                    component: BrandComponent  ,
                        canActivate: [adminGuard]     
              },
               {
                    path: "admin/brand/add",
                    component: BrandFormsComponent ,
                        canActivate: [adminGuard]     
              }
              ,
               {
                    path: "admin/brand/edit/:id",
                    component: BrandFormsComponent ,
                        canActivate: [adminGuard]     
              },
              {
                  path : "admin/product",
                  component: ProductComponent,
                      canActivate: [adminGuard]
              },
                {
                    path: "admin/product/add",
                    component: ProductFormComponent  ,
                        canActivate: [adminGuard]    
              }
              ,
                {
                    path: "admin/Product/edit/:id",
                    component: ProductFormComponent ,
                        canActivate: [adminGuard]     
              }
               ,
                {
                    path: "featureProduct",
                    component: FeaturedProductComponent      
              }
               ,
                {
                    path: "newProduct",
                    component: NewProductComponent     
              }
               ,
                {
                    path: "card",
                    component: CardComponent    
              }
              ,
                {
                    path: "banner",
                    component: BannerComponent   
              }
               
                ,
                {
                    path: "detailProduct/:id",
                    component: DetailProductComponent  
              }
               ,
                {
                    path: "filtered-products",
                    component: FilterdProductsComponent 
              }
                ,
                {
                    path: "register",
                    component: RegisterComponent
              }
               ,
                {
                    path: "login",
                    component: LoginComponent
              }
               ,
                {
                    path: "profile",
                    component: ProfileComponent
              },
                {
                    path: "admin",
                     component: AdminComponent,
                     canActivate: [adminGuard]
              }
              ,
                {
                    path: "wishList",
                    component: WishlistComponent
              }
               ,
                {
                    path: "cart",
                    component: CartComponent
              }
              ,
                {
                    path: "checkout",
                    component: CheckOutComponent
              }
];
