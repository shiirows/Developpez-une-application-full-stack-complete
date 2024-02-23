import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/common/SubjectService';
import { Themes } from 'src/app/model/Subjects';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  public subjects: Themes [] = [];

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.getSubject()
  }

  public getSubject() {
    this.themeService.getSubject().subscribe(
      (response: any) => {
        this.subjects = response.subject; // Extraire le tableau d'articles de la propriété "article" de la réponse JSON
        console.log(this.subjects);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addSubject(id : number){
    this.themeService.addSubject(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getSubject();
      },
      (error) => {
        console.log(error);
      }
    );

  }


}
