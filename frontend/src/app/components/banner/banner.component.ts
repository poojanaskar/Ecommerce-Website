import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, CarouselModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
 baneerImage  :string[]= ["https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/6/23/c3beb3ae-6895-458f-b1e0-f97becf05c5d1750618551514-Desktop-Banner--2---1-.png" ,
  "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.jpg" ,
  "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg"]

  customOptions: OwlOptions = {
    loop: true,
     autoplay: true, 
     autoplayTimeout: 4000,  
       animateIn: 'fadeIn',      // <--- Fade in effect
  animateOut: 'fadeOut',    // <--- Fade out effect
  smartSpeed: 1000,   
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}
