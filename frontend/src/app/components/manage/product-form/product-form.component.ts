import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  isEdit :boolean = false
  id: string | null = '';
  productForm!: FormGroup;
  categoryName: { id: string; name: string }[] = [];
  category: any[] = [];
  brandName: { id: string; name: string }[] = [];
  Brand: any[] = [];
  productOne :any []= []
  oneProductDatshow:any
  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private catservice: CategoryService,
    private brs: BrandService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['', Validators.required],
      categoryID: [, Validators.required],
      BrandID: [, Validators.required],
      images: this.fb.array([this.fb.control('', Validators.required)]),
      Price: ['', Validators.required],
      discount: ['', Validators.required],
      isNewProduct : [false],
      isFeature : [false]

    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id', this.id);
    if(this.id){
this.isEdit = true;


this.service.getOneProductList(this.id).subscribe({
  next : (res)=>{

this.oneProductDatshow = res.data
console.log("get one product" ,this.oneProductDatshow );

this.productForm.patchValue({
   name: this.oneProductDatshow.name,
      description: this.oneProductDatshow.description,
      shortDescription:this.oneProductDatshow.shortDescription,
      categoryID: this.oneProductDatshow.categoryID._id,
      BrandID:this.oneProductDatshow.BrandID._id,
      // images: this.fb.array([this.fb.control('', Validators.required)]),
      Price: this.oneProductDatshow.Price,
      discount:  this.oneProductDatshow.discount,
        isNewProduct : this.oneProductDatshow.isNewProduct,
      isFeature : this.oneProductDatshow.isFeature
})
const imagesArray = this.productForm.get('images') as FormArray;
imagesArray.clear(); // clear previous

this.oneProductDatshow.images.forEach((img: string) => {
  imagesArray.push(this.fb.control(img, Validators.required));
});

  },
  error: (err)=>{
    console.log("get one product" ,err);
  }
})
    }




    this.catservice.getCategoryList().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.category = res.data;
        this.categoryName = this.category.map((data) => {
          return { name: data.name, id: data._id };
        });
        console.log('categoryName', this.categoryName);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
    this.brs.getBrand().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.Brand = res.data;
        this.brandName = this.Brand.map((data) => {
          return { name: data.name, id: data._id };
        });
        // console.log('BrandName', this.Brand);
      },
      error: (err) => {
        // console.log('err', err);
      },
    });
  }
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

 

  

  addProductForm() {
    console.log(this.productForm.value);
    this.service.addProduct(this.productForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.navigate(['/admin/product']);
  }
  addImageField() {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeImageField(index: number) {
    if (this.images.length > 1) {
      this.images.removeAt(index);
    }
  }
  updateProductForm(){
if(this.productForm.valid){
    this.service.updateProduct(this.id , this.productForm.value).subscribe({

    })
  }}
}
