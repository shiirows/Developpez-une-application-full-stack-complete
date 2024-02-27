import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/Articles';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(
    private route: Router,
  ) { }

  @Input() articles: any = [];

  ngOnInit(): void {
  }

  public getArticle(id: number) {
    this.route.navigate(['/article-detail', id]);
  }

}
