import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ManageMoviesComponent } from './manage-movies/manage-movies.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
  { path: 'Home', component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'Movies', loadChildren: () => import ('./movies/movies.module').then(m => m.MoviesModule)},
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component:  RegisterComponent },
  { path: 'ManageMovies', component:  ManageMoviesComponent },
  { path: 'ManageUsers', component:  ManageUsersComponent },
  { path: '**', redirectTo:'/Home' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
