import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; // Importez l'opérateur takeUntil pour gérer la destruction de l'observable
import { ThemeService } from 'src/app/common/SubjectService';
import { UserService } from 'src/app/common/UserService';
import { Subjects } from 'src/app/model/Subjects';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>(); // Créez un sujet pour gérer la destruction de l'observable

  constructor(
    private formB: FormBuilder,
    private userService: UserService,
    private subjectService: ThemeService,
    private route: Router
  ) {}

  public themes: Subjects[] = [];
  public user: User;
  public userForm: any;
  public ButtonSubscription: boolean = false;
  public ButtonDesubscribe: boolean = true;

  ngOnInit(): void {
    this.initForm();
    this.getUser();
    this.getFavorite();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Déclenchez la fin du sujet pour détruire les abonnements
    this.unsubscribe$.complete(); // Indiquez que le sujet est terminé
  }

  public getUser():void {
    this.userService
      .getUser()
      .pipe(takeUntil(this.unsubscribe$)) // Utilisez takeUntil pour détruire l'abonnement lors de la destruction du composant
      .subscribe(
        (response: User) => {
          this.user = response;
          this.userService
            .getUser()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user) => {
              this.userForm.patchValue({
                username: user.username,
                email: user.email,
              });
            });
        },
        (error) => {}
      );
  }

  public getFavorite():void {
    this.subjectService
      .getFavoris()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response: any) => {
          this.themes = response.subscription;
        },
        (error) => {}
      );
  }

  public initForm():void {
    this.userForm = this.formB.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        '',
        [Validators.required, Validators.minLength(4), Validators.email],
      ],
    });
  }

  public onSubmit() :void{
    const username: string = this.userForm.get('username').value;
    const email: string = this.userForm.get('email').value;

    if (email == this.user.email && username == this.user.username) {
      alert("Aucune modification n'a été apportée.");
      return;
    }

    if (email !== this.user.email) {
      const confirmChangeEmail = confirm(
        "Changer d'adresse e-mail vous déconnectera. Voulez-vous continuer ?"
      );
      if (!confirmChangeEmail) {
        return;
      }

      setTimeout(() => {
        alert('Adresse e-mail changée. Vous êtes maintenant déconnecté.');
        this.deconnexion();
      }, 2000);
    }

    let user = new User(email, username);

    this.userService
      .updateUser(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response: any) => {
          this.user = response;
        },
        (error) => {
          // Gérer les erreurs
        }
      );
  }

  public deconnexion():void {
    window.sessionStorage.clear();
    window.location.reload();
    this.route.navigate(['']);
  }
}
