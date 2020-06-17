import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import  { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route : ActivatedRoute) {   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(data => {
      let token = (<any>data).token;
      console.log(token);
      console.log(data.userRole);
      console.log("Successfuly logged in!");
      console.log(this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);
    },
    error =>{
      console.log("Could not logged in!")
    });
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
