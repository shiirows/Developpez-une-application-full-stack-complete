import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/common/ArticleService';
import { Article } from 'src/app/model/Articles';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  public articles: Article [] = [];
  private articleSubscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }

  public getArticle() {
    this.articleSubscription = this.articleService.getArticle().subscribe(
      (response: any) => {
        this.articles = response.article;
        console.log(this.articles);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onCreateArticle() {
    this.router.navigate(['create-article']);
  }
}
