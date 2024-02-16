import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../common/AuthentificationService';
import { TokenService } from '../../common/TokenService';

@Component({
  selector: 'app-connexion',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  constructor(
    private formB: FormBuilder,
    private service: AuthentificationService,
    private tokenService: TokenService,
    private route: Router
  ) {}

  public messageError?: string;
  public erreur: boolean = false;
  public loginForm: any;
  public roles: string[] = [];

  ngOnInit(): void {
    this.initForm();

    if (this.tokenService.getUser().userInfo != null) {
      this.route.navigate(['']);
    }
  }

  public initForm() {
    this.loginForm = this.formB.group({
      email: ['mazoyeralexdandre@hotmail.fr', [Validators.required, Validators.minLength(3)]],
      passwordUser: [
        'test!31',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  public onSubmit() {
    let email: string = this.loginForm.get('email').value;
    let password: string = this.loginForm.get('passwordUser').value;

    // APPEL AU SERVICE POUR FAIRE APPAEL AU BACK POUR VERIFIER L'UTILISATEUR
    this.service.signin(email, password).subscribe(
      (param: any) => {
        this.tokenService.saveUser(param);
        //ENREGISTREMENT DU TOKEN DANS LE STORAGE
console.log(param.token);
        this.tokenService.saveToken(param.token);
        console.log(this.tokenService.getUser().user);
        window.location.reload();
      },
      (error) => {
        this.erreur = true;
      }
    );
  }
 public navigateInscription() {
    this.route.navigate(['/inscription']);
  }
}
