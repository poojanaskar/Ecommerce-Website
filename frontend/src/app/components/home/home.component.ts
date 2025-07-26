import { Component } from '@angular/core';
// import { HeaderComponent } from '../header/header.component';
// import { FooterComponent } from '../footer/footer.component';
import { FeaturedProductComponent } from '../featured-product/featured-product.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { BannerComponent } from"../banner/banner.component"
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  imports: [BannerComponent,  FeaturedProductComponent , NewProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
