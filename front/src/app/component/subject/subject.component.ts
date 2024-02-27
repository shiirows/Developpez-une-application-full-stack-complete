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
  @Input() themes: Subjects[] = [];

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
  }


  public addSubject(id : number){
    this.themeService.addSubject(id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
