import { Component } from '@angular/core';
import { ReactiveFormsModule , FormBuilder , FormGroup , Validators} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})

export class CategoryFormComponent {
  IsEdit : boolean = false
  id!:  string | null;
ngOnInit(){
     this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
        console.log('Editing Category with ID:', this.id);
        this.IsEdit = true;
    }
  
}

  iteamForm! : FormGroup;

  constructor( private fb : FormBuilder, private router :Router , private service :CategoryService , private route : ActivatedRoute ){
this.iteamForm = this.fb.group({
  name : ['' , Validators.required]
});
  }
  updateCategory(){
      if(this.iteamForm.valid){
    console.log("itemform" , this.iteamForm.value)
this.service.updateCategory(this.iteamForm.value ,this.id ).subscribe({
  next :(res)=>{
  
  this.router.navigate(["/admin/categories"]);
          console.log('Success:', res);
  },


  error:(err)=>{
     console.log(' not Success:', err);
  }

})
  }
  }
addItem(){
  if(this.iteamForm.valid){
    console.log("itemform" , this.iteamForm.value)
this.service.addCategory(this.iteamForm.value).subscribe({
  next :(res)=>{
  
  this.router.navigate(["/admin/categories"]);
          console.log('Success:', res);
  },


  error:(err)=>{
     console.log(' not Success:', err);
  }

})
  }
}


}
