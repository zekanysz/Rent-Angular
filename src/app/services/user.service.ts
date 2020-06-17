import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private addRolePathUrl = environment.apiUrl + '/User/AddRole/';
  private addRoleToUserPathUrl = environment.apiUrl + '/User/AddRoleToUser';
  private getAllRolesUrl = environment.apiUrl + '/User/AllRoles';
  private getAllUsersUrl = environment.apiUrl + '/User/AllUsers';


  roles$ : Observable<string[]>;
  users$ : Observable<string[]>;

  constructor(private http: HttpClient) { }

  addRole(role){
    return  this.http.post(this.addRolePathUrl + role, null);
  }

  addRoleToUser(userToRole){
    return  this.http.post(this.addRoleToUserPathUrl, userToRole);
  }

  getRoles() : Observable<string[]>{
    if(!this.roles$){
      this.roles$ = this.http.get<string[]>(this.getAllRolesUrl).pipe(shareReplay());
    }
    return this.roles$;
  }

  getUsers() : Observable<string[]>{
    if(!this.users$){
      this.users$ = this.http.get<string[]>(this.getAllUsersUrl).pipe(shareReplay());
    }
    return this.users$;
  }

}
