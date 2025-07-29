// pesalink-frontend/src/app/core/services/user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API via GET', () => {
    const dummyUsers: User[] = [
      { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', account: { type: 'Savings', balance: 5000 } },
      { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', account: { type: 'Checking', balance: 99 } }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(${environment.apiBaseUrl}/users);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers); // Provide mock data as the response
  });
});