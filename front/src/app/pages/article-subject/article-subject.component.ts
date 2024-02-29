import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/common/ArticleService';
import { Article } from 'src/app/model/Articles';

@Component({
  selector: 'app-article-subject',
  templateUrl: './article-subject.component.html',
  styleUrls: ['./article-subject.component.scss']
})
export class ArticleSubjectComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  private articleSubscription: Subscription;
  public articles: Article [] = [];

  ngOnInit(): void {
    this.getArticle();
  }

  public getArticle():void {
    this.articleSubscription = this.route.params.subscribe((params: ParamMap) => {
      if (params['id']) {
        this.articleService.getArticleByTheme(params['id']).subscribe(
          (response: any) => {
            this.articles = response.article;
          },
          (error) => {
            this.router.navigate(['/']);
          }
        );
      }
    });
  }

}
