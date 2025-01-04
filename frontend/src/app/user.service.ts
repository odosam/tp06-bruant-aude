import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SigninResponse } from './signin/signinResponse';
import { environment } from '../environment/environment';

// Injectable pour que le service puisse être utilisé dans les composants
@Injectable({
  providedIn: 'root',
})
export class UserService {

  // L'URL de l'API Node.js (assurez-vous de l'adapter à ton backend)
  private apiUrl = 'http://localhost:3000/api/user';  // Remplacer par l'URL de ton API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les données utilisateur
  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  // Méthode pour mettre à jour les données utilisateur
  updateUserData(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, data);
  }

  public login(login: string, password: string): Observable<SigninResponse> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<SigninResponse>(
      environment.backendUserSignin,
      data,
      httpOptions
    );
  }
}
