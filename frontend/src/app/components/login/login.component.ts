import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 loginForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder,  private router: Router , private service : LoginService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
   this.service.login(this.loginForm.value).subscribe({
      next : (res)=>{ 
            localStorage.setItem('authToken', res.token); 
      console.log('Token saved:', res.token);
      this.router.navigate(["/"])
      },error :(err)=>{
     console.log("err in register" , err)
      }
    })
    
    }
  }
}
