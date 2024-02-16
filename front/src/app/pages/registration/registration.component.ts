import { RegisterRequest } from '../../model/RegisterRequest';
import { AuthentificationService } from '../../common/AuthentificationService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSuccess } from '../../interfaces/authSuccess.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private service: AuthentificationService,
    private route: Router
  ) {}

  public userForm: FormGroup;
  public error: string;
  public erreur: boolean = false;
  public passwordconfirm : boolean = false;
  public passwordPatern : boolean = false
  public errorMessage : string;

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.userForm = this.formB.group(
      {
        username: ['', [Validators.maxLength(45), Validators.minLength(3)]],
        email: ['', [Validators.email]],
        password: ['',[Validators.minLength(8), Validators.maxLength(45), 
          Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
        passwordconfirm: ['',[Validators.minLength(8), Validators.maxLength(45),]],
      },
      {
        validator: this.verificationMatch('password', 'passwordconfirm'),
      }
    );
  }

  // custom validator to check that two fields match
  public verificationMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        this.passwordconfirm = true;
        this.errorMessage = "Les mots de passe doivent être identiques.";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(control.value)) {
        matchingControl.setErrors({ invalidPassword: true });
        this.passwordPatern = true;
        this.errorMessage = "Make sure it has a number, a lowercase letter, and a specific character.";
      } else {
        matchingControl.setErrors(null);
        this.passwordconfirm = false;
      }
    };
  }
  
  public onsubmit() {
    const username: string = this.userForm.get('username').value;
    const email: string = this.userForm.get('email').value;
    const password: string = this.userForm.get('password').value;

   // let registerRequest: RegisterRequest = new RegisterRequest(password, email, username);
const registerRequest = this.userForm.value as RegisterRequest
    this.service.signup(registerRequest).subscribe(
      // ne pas rediriger en cas d'erreur
      (data: AuthSuccess ) => {
        this.route.navigate(['/login']);
      },
      (error) => {
        this.error = error.error.message;
        this.erreur = true;
      }
    );
  }

  public navigateConnexion() {
    this.route.navigate(['/login']);
  }
}
