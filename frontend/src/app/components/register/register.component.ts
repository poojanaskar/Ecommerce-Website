import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 registerForm!: FormGroup;
  message: string = '';


  constructor(private router : Router,private fb: FormBuilder, private service : RegisterService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['user']  // default role (can also select "admin" manually for testing)
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {

    this.service.register(this.registerForm.value).subscribe({
      next : (res)=>{ 
        console.log("res in register" , res)
        this.router.navigate(['/login'])

      },error :(err)=>{
     console.log("err in register" , err)
      }
    })
    }
  }
}
