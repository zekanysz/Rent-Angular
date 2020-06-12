import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['',[Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    });
  }

  register(){
    this.authService.register(this.registerForm.value).subscribe(data => {
      console.log(data);
    });
  }
  
  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get passwordConfirm(){
    return this.registerForm.get('passwordConfirm');
  }
}
