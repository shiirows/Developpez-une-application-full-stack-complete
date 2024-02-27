import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ThemeService } from 'src/app/common/SubjectService';
import { UserService } from 'src/app/common/UserService';
import { Subjects } from 'src/app/model/Subjects';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private formB: FormBuilder,
    private userService : UserService,
    private subjectService : ThemeService
  ) { }

  public themes: Subjects[] = [];
  public user: User 
  public userForm: any;
  public ButtonSubscription: boolean = false;
  public ButtonDesubscribe: boolean = true;
  
  ngOnInit(): void {
    this.initForm();
this.getUser();
this.getFavorite();
  }

  public initForm() {
    this.userForm = this.formB.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.email,
        ],
      ],
    });
  }

  public getUser() {
this.userService.getUser().subscribe(
  (response: any) => {
    this.user = response; // Extraire le tableau d'articles de la propriété "article" de la réponse JSON
    console.log(this.user);
  },
  (error) => {
    console.log(error);

  }
);

  }

  public getFavorite() {
    this.subjectService.getFavoris().subscribe(
      (response: any) => {
        this.themes = response.subscription; // Extraire le tableau d'articles de la propriété "article" de la réponse JSON
        console.log(this.themes);
      },
      (error) => {
        console.log(error);

      }
    );
  }


public onSubmit() {
console.log(this.userForm.value);

const username : string = this.userForm.get('username').value;
const email : string = this.userForm.get('email').value;

let user = new User(email, username );

this.userService.updateUser(user).subscribe(
  (response: any) => {
    console.log(response);
  },
  (error) => {
    console.log(error);

  }     
);
  }

  public deconnexion () {
    
    

  }


}
