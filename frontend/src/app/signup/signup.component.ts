import { Component, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone : true,
  imports : [CommonModule, ReactiveFormsModule]
})

export class SignupComponent {

  signupForm : FormGroup;

  @Output() signup = new EventEmitter<{ name : string ; email : string ; password : string ; confirmPassword : string}>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.passwordMatcher.bind(this)]]
  });

  }

// pour voir si les mdp correspondent
passwordMatcher(control: any): { [key: string]: boolean } | null {
  if (this.signupForm && control.value !== this.signupForm.get('password')?.value) {
    console.log("Password incorrect");
    return { 'passwordMismatch': true };
  }
  return null;
}

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup data:', this.signupForm.value);
      this.signup.emit(this.signupForm.value);

      this.signupForm.reset();

      this.router.navigate(['/user-profile']);
    }
    else{
      console.log('Form is not valid');
    
    }
  }
}
