import { RegisterRequest } from '../../model/RegisterRequest';
import { AuthentificationService } from '../../common/AuthentificationService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSuccess } from '../../interfaces/authSuccess.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private service: AuthentificationService,
    private route: Router
  ) {}

  public inscriptionForm: FormGroup;
  public error: string;
  public erreur: boolean = false;
  public passwordconfirm : boolean = false;
  public passwordPatern : boolean = false
  public errorMessage : string;

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.inscriptionForm = this.formB.group(
      {
        username: ['', [Validators.maxLength(45), Validators.minLength(3)]],
        email: ['', [Validators.email]],
        password: ['',[Validators.minLength(8), Validators.maxLength(45), 
          Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
        passwordconfirm: ['',[Validators.minLength(8), Validators.maxLength(45),]],
      }
    );
  }


  
  public onSubmit() {
    const username: string = this.inscriptionForm.get('username').value;
    const email: string = this.inscriptionForm.get('email').value;
    const password: string = this.inscriptionForm.get('password').value;

    let registerRequest: RegisterRequest = new RegisterRequest(password, email, username);
//const registerRequest = this.inscriptionForm.value as RegisterRequest
    this.service.signup(registerRequest).subscribe(
      // ne pas rediriger en cas d'erreur
      (data: AuthSuccess ) => {
        this.route.navigate(['']);
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