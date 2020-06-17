import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + '/Identity/Login';
  private registerPath = environment.apiUrl + '/Identity/Register';

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userName = new BehaviorSubject<string>(localStorage.getItem('userName'));
  private userRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));
  private isAdmin = new BehaviorSubject<boolean>(this.checkIfAdmin());
  private token = new BehaviorSubject<string>(localStorage.getItem('token'));

  constructor(private http: HttpClient, private router : Router) { }

  login(data): Observable<any>{
    return this.http.post<any>(this.loginPath, data).pipe(
      map(result => {
        if(result){
          // The order is important 
          localStorage.setItem('userRole', result.userRole);
          this.userRole.next(localStorage.getItem('userRole'));
          this.isAdmin.next(this.checkIfAdmin());
          localStorage.setItem('token', result.token);
          this.token.next(result.token);
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('userName', result.userName);
          this.userName.next(localStorage.getItem('userName'));
        }
        return result;
      })
    );
  }

  logout(){
    this.loginStatus.next(false);
    this.isAdmin.next(this.checkIfAdmin());
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.setItem('loginStatus', '0');
    localStorage.setItem('isAdmin', '0');
    this.router.navigate(['/Login']);
    console.log("Logged out successfuly!");
  }


  checkLoginStatus() : boolean{
    var loginCookie = localStorage.getItem("loginStatus");
    if(loginCookie == "1"){
      return true;
    }else{
      return false;
    }
  }

  checkIfAdmin() : boolean{
    var isAdmin = localStorage.getItem("userRole");
    if(isAdmin == "Admin"){
      localStorage.setItem('isAdmin', '1');
      return true;
    }else{
      localStorage.setItem('isAdmin', '0');
      return false;
    }
  }

  get isLoggedIn(){
    return this.loginStatus.asObservable();
  }

  get isUserAdmin(){
    return this.isAdmin.asObservable();
  }

  get currentUserName(){
    return this.userName.asObservable();
  }

  get currentUserRole(){
    return this.userRole.asObservable();
  }

  get currentToken(){
    return this.token.asObservable();
  }

  register(data): Observable<any>{
    return this.http.post(this.registerPath, data);
  }

  getToken(){
    return localStorage.getItem('token'); 
  }
}
