import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../../common/AuthentificationService';
import { TokenService } from '../../common/TokenService';

@Component({
  selector: 'app-connexion',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {
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

  private signinSubscription: Subscription;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.signinSubscription) {
      this.signinSubscription.unsubscribe();
    }
  }

  public initForm():void {
    this.loginForm = this.formB.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  public onSubmit():void {
    let email: string = this.loginForm.get('email').value;
    let password: string = this.loginForm.get('password').value;

    this.signinSubscription = this.service.signin(email, password).subscribe(
      (param: any) => {
        this.tokenService.saveUser(param);
        this.tokenService.saveToken(param.token);
        window.location.reload();
        this.route.navigate(['/articles']);
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
