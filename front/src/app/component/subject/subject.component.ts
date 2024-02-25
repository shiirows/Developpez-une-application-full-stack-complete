import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/common/SubjectService';
import { Subjects } from 'src/app/model/Subjects';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  public subjects: Subjects [] = [];

  @Input() ButtonSubscription: boolean;
  @Input() ButtonDesubscribe: boolean;

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
