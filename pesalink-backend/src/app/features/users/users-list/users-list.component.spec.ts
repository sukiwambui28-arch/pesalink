// pesalink-frontend/src/app/features/users/users-list/users-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UsersListComponent } from './users-list.component';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { RouterTestingModule } from '@angular/router/testing';

// Mock UserService
class MockUserService {
  getUsers() {
    const dummyUsers: User[] = [
      { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', account: { type: 'Savings', balance: 5000 } },
      { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', account: { type: 'Checking', balance: 99 } }
    ];
    return of(dummyUsers); // Return an observable of the mock data
  }
}

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: UserService, useClass: MockUserService } // Provide the mock service
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of users in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Leanne Graham');
    expect(rows[1].textContent).toContain('Ervin Howell');
  });

  it('should apply the low-balance class to users with balance < 100', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const lowBalanceRow = compiled.querySelector('tbody tr:nth-child(2)');
    expect(lowBalanceRow?.classList.contains('low-balance')).toBeTrue();
  });
});