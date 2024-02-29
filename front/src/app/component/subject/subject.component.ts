import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { ThemeService } from 'src/app/common/SubjectService';
import { Subjects } from 'src/app/model/Subjects';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  public subjects: Subjects [] = [];
  public response: String;
  public showTemporaryMessage: boolean = false;
  public temporaryMessage: string = "";

  @Input() ButtonSubscription: boolean;
  @Input() ButtonDesubscribe: boolean;
  @Input() themes: Subjects[] = [];

  constructor(
    private themeService: ThemeService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  public addSubject(id : number):void{
    this.themeService.addSubject(id).subscribe(
      (response: any) => {
        this.response = response.body;
        this.showTemporaryMessage = true;
        this.temporaryMessage = "Le user s'est bien abonné.";
        timeout(1000);
      },
      (error) => {
      }
    );
  }
  

  public deleteSubject(id : number):void{
    this.themeService.deleteSubject(id).subscribe(
      (response: any) => {
        timeout(1000);
        window.location.reload();
      },
      (error) => {
      }
    );
  }

  public getArticle(id: number):void {
    this.route.navigate(['/article-subject', id]);
  }


}
