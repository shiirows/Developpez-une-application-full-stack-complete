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

  public articles: Article[] = [];
  private articleSubscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }

  public getArticle(): void {
    this.articleSubscription = this.articleService.getArticle().subscribe(
      (response: any) => {
        this.articles = response.article;

        // Trier les articles par date (les plus récents d'abord)
        this.articles.sort((a: Article, b: Article) => {
          const dateA = new Date(a.createdate);
          const dateB = new Date(b.createdate);
          return dateB.getTime() - dateA.getTime(); // Trie les articles du plus récent au plus ancien
        });
      },
      (error) => {
        // Gérer les erreurs
      }
    );
  }

  public onCreateArticle(): void {
    this.router.navigate(['create-article']);
  }
}
