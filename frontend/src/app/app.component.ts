import { Component } from '@angular/core';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports : [SignupComponent]
})
export class AppComponent {
  // Méthode pour gérer les données émises par le formulaire
  handleSignup(formData: any): void {
    console.log('Received signup data:', formData);
    // Tu peux utiliser ces données pour les envoyer à un service ou les afficher
  }
 }

