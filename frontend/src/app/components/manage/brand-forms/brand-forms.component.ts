import { Component } from '@angular/core';
import { ReactiveFormsModule , FormBuilder , FormGroup , Validators} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand-forms',
 imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './brand-forms.component.html',
  styleUrl: './brand-forms.component.scss'
})
export class BrandFormsComponent {
IsEdit : boolean = false;
id: any
BrandForm! : FormGroup 
constructor(private route : ActivatedRoute , private fb : FormBuilder , private  service : BrandService , private router : Router){
  this.BrandForm = this.fb.group({
    name : ["" , Validators.required]
  })
}
ngOnInit(){
  this.route.params.subscribe(params =>{
this.id = params['id']
  })
  if(this.id){
    console.log(this.id)
    this.IsEdit = true;
    console.log("  this.IsEdit ",  this.IsEdit )
  }
}

addItem(){
this.service.addBrand(this.BrandForm.value).subscribe({
  next:(res)=> {
    console.log(res.data)
    success: true 

  },
  error:(err)=>{
    console.log(err)

  }
  
})
this.router.navigate(['/admin/brand'])

}

updateBrand(){
  this.service.updateBrand(this.id , this.BrandForm.value).subscribe({
next : (res)=>{
console.log(res)
}, error : (err)=>{
console.log(err)
}
  })
  this.router.navigate(['/admin/brand'])
}

}
