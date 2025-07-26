import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  
@Component({
  selector: 'app-profile',
  imports: [CommonModule ,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: boolean = false
  name: string = '';
  email: string = '';
  role: string = '';
token: string | null ="" ;
constructor(private auth : AuthService){

}

 ngOnInit( ){

  this.token = localStorage.getItem('authToken');
if (this.token) {
  this.user = true;
  const payload = JSON.parse(atob(this.token.split('.')[1]));
  console.log(payload); 
   this.name = payload.name;
        this.email = payload.email;
        this.role = payload.role;
}else{
  this.user = false
}
 }

 logOut(){
 
  this.auth.logout();
     this.user =false
    
  console.log("log out succes fullly")

}
}
