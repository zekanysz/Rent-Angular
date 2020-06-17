import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginStatus$ : Observable<boolean>;
  userName$ : Observable<string>;
  userRole$ :  Observable<string>;
  isAdmin$ :  Observable<boolean>;


  constructor(private authService: AuthService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.loginStatus$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isUserAdmin;

    this.userName$ = this.authService.currentUserName;
    this.userRole$ = this.authService.currentUserRole;
  }


  logout(){
    this.movieService.clearCache();
    this.authService.logout();
  }
}
