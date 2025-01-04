import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SigninComponent } from './signin/signin.component';

export const appRoutes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component : SignupComponent},
  { path: 'userProfile', component: UserProfileComponent }
];
