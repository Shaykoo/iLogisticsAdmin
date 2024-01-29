import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private login_Srv : AuthService,
              private formBuilder: FormBuilder,
              private router : Router) 
              { 
                this.loginForm = this.formBuilder.group({
                  username: new FormControl(undefined, Validators.required),
                  password: new FormControl(undefined, Validators.required)
                });  }

  ngOnInit(): void {
  }

  onFormSet(){

  }

  onUserAuthenticate(){
    const request = {
      userCode: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.login_Srv.login(request).subscribe((res:any)=>{
      if(res.data.length > 0){      
         const stafDetails = res.data[0];   
         console.log("Authenticated");
         localStorage.setItem('STAFF_CODE', stafDetails.STAFF_CODE)
         Swal.fire({
          title: 'Succesfully Logged In',
          icon: 'success',
          showConfirmButton: false,
          timer:2000
         }); 
         this.router.navigate(['./master-setup/routes']);
      }else{
         console.log("Denied");  
         Swal.fire({
          title: 'Invalid username or password. Please check',
          icon: 'error',
         });   
      }
    })
  }

  isFieldValid(field: string) {
    return (
      !this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched
    );
  }
}
