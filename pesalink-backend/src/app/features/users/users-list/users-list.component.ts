// pesalink-frontend/src/app/features/users/users-list/users-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class UsersListComponent implements OnInit {
  users$!: Observable<User[]>;
  balanceThreshold = 100; // KES 100

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}


export interface User {
  id: number;
  name: string;
  email: string;
  account: {
    type: string;
    accountNumber: string;
    balance: number;
    accountType: string;
  };
}
