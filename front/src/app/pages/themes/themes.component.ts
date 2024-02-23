import { Component, OnInit } from '@angular/core';
import { themes } from 'src/app/model/Themes';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  public themes: themes [] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
