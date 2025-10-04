import { Component, ElementRef, ViewChild, inject, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../service/login-sevice';

@Component({
  selector: 'user-login',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css'],
  imports: [
    ReactiveFormsModule
   ]
})
export class LoginComponent  {
  private formBuilder = inject(FormBuilder);

  public Login_Service = inject(LoginService);

  
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();  
    //強制把整個表單標記為 touched。
    
    if (this.loginForm.invalid) return;

    let {username,password} = this.loginForm.value;

    if(username && password){
        this.Login_Service.login({username: username! , password: password! } );
        this.loginForm.reset();
    }
    
  }
}


