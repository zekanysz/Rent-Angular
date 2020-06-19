import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserToRole } from '../classes/user-to-role';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  addRoleForm: FormGroup;
  addRoleToUserForm: FormGroup;

  userToRole: UserToRole;

  roles: string[] = [];
  roles$ : Observable<string[]>;

  users: string[] = [];
  users$ : Observable<string[]>;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.addRoleForm = this.fb.group({
      newrole: [''],
    });

    this.addRoleToUserForm = this.fb.group({
      user: [''],
      role: [''],
    });

    this.roles$ = this.userService.getRoles();

    this.roles$.subscribe(result => {
      this.roles = result;
      console.log(this.roles);
    });

    this.users$ = this.userService.getUsers();

    this.users$.subscribe(result => {
      this.users = result;
      console.log(this.users);
    });
  }

  addRole(){
    this.userService.addRole(this.addRoleForm.value.newrole);

    this.roles$ = this.userService.getRoles();

    this.roles$.subscribe(result => {
      this.roles = result;
    });

    this.addRoleForm.reset();
  }

  addRoleToUser(){
    this.userToRole = new UserToRole(this.addRoleToUserForm.value.user, this.addRoleToUserForm.value.role);

    this.userService.addRoleToUser(this.userToRole);

    this.addRoleToUserForm.reset();
  }
}
