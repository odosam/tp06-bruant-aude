import { Component, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { SigninResponse } from './signinResponse';



@Component({
  selector: 'app-Signin',
  templateUrl: './Signin.component.html',
  styleUrls: ['./Signin.component.css'],
  standalone : true,
  imports : [CommonModule, ReactiveFormsModule],
  providers : [UserService]
})

export class SigninComponent {

  SigninForm : FormGroup;

  @Output() Signin = new EventEmitter<{ email : string ; password : string }>();

  constructor(
    private formBuilder: FormBuilder,
  
    private router: Router,
    private userService : UserService
  ) {
    this.SigninForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  }

  onSubmit() {
    if (this.SigninForm.valid) {
      const {email,password} = this.SigninForm.value ;

      this.userService.login(email,password).subscribe(
        (res: SigninResponse) => {
          this.SigninForm.reset();
          localStorage.setItem('token', res.accessToken);
          this.router.navigate(['/userProfile']);
        },
        (err) => {
          console.error(err);
        }
      );
    }
    else{
      console.log('Account is not valid');
    
    }
  }
}
