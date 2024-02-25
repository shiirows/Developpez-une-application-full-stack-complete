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

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
  }




}
