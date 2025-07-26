import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterdProductsComponent } from './filterd-products.component';

describe('FilterdProductsComponent', () => {
  let component: FilterdProductsComponent;
  let fixture: ComponentFixture<FilterdProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterdProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterdProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
