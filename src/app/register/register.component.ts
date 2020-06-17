import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import  { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;


  constructor(private fb: FormBuilder, private authService: AuthService) { }
  mustMatch(passwordControl : AbstractControl) : ValidatorFn{
    return (passwordConfirmControl : AbstractControl) : {[key: string] : boolean} | null =>{
      if(!passwordControl && !passwordConfirmControl){
        return null;
      }
      if(passwordConfirmControl.hasError && !passwordControl.hasError){
        return null;
      }
      if(passwordControl.value != passwordConfirmControl.value){
        return {'mustMatch' : true};
      }
      else{
        return null;
      }
    }
  }
  ngOnInit(): void {
    // this.registerForm = this.fb.group({
    //   email: ['', [Validators.required]],
    //   password: ['',[Validators.required]],
    //   passwordConfirm: ['', [Validators.required], this.mustMatch(this.password)]
    // });

    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.passwordConfirm = new FormControl('', [Validators.required,this.mustMatch(this.password)]);

    this.registerForm = this.fb.group({
      'email': this.email,
      'password' : this.password,
      'passwordConfirm': this.passwordConfirm
    })

  }



  register(){
    this.authService.register(this.registerForm.value).subscribe(data => {
      console.log(data);
    });
  }
  
  // get email(){
  //   return this.registerForm.get('email');
  // }

  // get password(){
  //   return this.registerForm.get('password');
  // }

  // get passwordConfirm(){
  //   return this.registerForm.get('passwordConfirm');
  // }
}
