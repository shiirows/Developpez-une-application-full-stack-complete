import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/common/SubjectService';
import { Subjects } from 'src/app/model/Subjects';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  public ButtonSubscription: boolean = true;
  public ButtonDesubscribe: boolean = false;

  public themes: Subjects [] = [];

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.getSubject()
  }

  public getSubject() {
    this.themeService.getSubject().subscribe(
      (response: any) => {
        this.themes = response.subject; // Extraire le tableau d'articles de la propriété "article" de la réponse JSON
        console.log(this.themes);
      },
      (error) => {
        console.log(error);
      }
    );
  }




}
