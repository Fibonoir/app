import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { iUser } from '../../interfaces/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users: iUser[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => (this.users = users));
    console.log(this.users);

  }
}

