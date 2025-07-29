import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
users = [
  {
    fullName: 'Jane Wambui',
    email: 'jane@example.com',
    accountNumber: 'PESA123456',
    balance: 50000
  },
  {
    fullName: 'James Otieno',
    email: 'james@example.com',
    accountNumber: 'PESA987654',
    balance: 12000
  }
  // You can load real data later from the backend
];

}
