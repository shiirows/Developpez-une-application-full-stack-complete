import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/common/ArticleService';
import { Article } from 'src/app/model/Articles';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {


  public articles: Article [] = [];

  constructor(
    private articleService: ArticleService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getArticle()
  }


  public getArticle() {
    this.articleService.getArticle().subscribe(
      (response: any) => {
        this.articles = response.article; // Extraire le tableau d'articles de la propriété "article" de la réponse JSON
        console.log(this.articles);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

public onCreateArticle(){
  this.router.navigate(['create-article']);
}


}
