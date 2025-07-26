import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {  withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor'
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])  // register your interceptor here
    )

  ],
};
