import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { AuthentificationService } from '../common/AuthentificationService';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthentificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthentificationService', ['signup']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule], // Import the necessary modules for the form
      providers: [
        FormBuilder,
        { provide: AuthentificationService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    });

    authServiceSpy = TestBed.inject(AuthentificationService) as jasmine.SpyObj<AuthentificationService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.userForm.get('username')).toBeTruthy();
    expect(component.userForm.get('lastname')).toBeTruthy();
    expect(component.userForm.get('firstname')).toBeTruthy();
    expect(component.userForm.get('email')).toBeTruthy();
    expect(component.userForm.get('password')).toBeTruthy();
    expect(component.userForm.get('passwordconfirm')).toBeTruthy();
  });

  it('should navigate to login on successful signup', () => {
    const testUserData = {
      username: 'testuser',
      lastname: 'Test',
      firstname: 'User',
      email: 'test@example.com',
      password: 'Test@123',
    };

    authServiceSpy.signup.and.returnValue(of(testUserData));

    component.onsubmit();

    expect(authServiceSpy.signup).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.error).toBeFalsy();
    expect(component.erreur).toBeFalsy();
  });

  it('should set error message on signup failure', () => {
    const errorMessage = 'Signup failed';
    authServiceSpy.signup.and.returnValue(throwError({ error: { message: errorMessage } }));

    component.onsubmit();

    expect(authServiceSpy.signup).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.error).toEqual(errorMessage);
    expect(component.erreur).toBeTruthy();
  });

  // Add more test cases to cover other scenarios and validations
});
