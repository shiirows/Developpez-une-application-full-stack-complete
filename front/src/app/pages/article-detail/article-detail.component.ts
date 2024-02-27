import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleService } from 'src/app/common/ArticleService';
import { CommentService } from 'src/app/common/CommentService';
import { Article } from 'src/app/model/Articles';
import { Comment } from 'src/app/model/Comment';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private commentService: CommentService,
    private routes: Router,
    private route: ActivatedRoute,
  ) { }

  public afficheArticle: any
  public afficheComment: any[] 

  ngOnInit(): void {
    this.getArticle();
    this.getComment();
  }

  public getArticle() {
    this.route.params.subscribe((params: ParamMap) => {
      
      if (params['id']) { // Vérifie si this.articleId est défini avant de continuer
        this.articleService.getArticleById(params['id']).subscribe(
          (article: Article) => {
            this.afficheArticle = article;
            console.log(this.afficheArticle);
          },
          (error) => {
            this.routes.navigate(['/']);
          }
        );
      }
    });
  }

  public getComment() {
    this.route.params.subscribe((params: ParamMap) => {
        
        if (params['id']) { // Vérifie si this.articleId est défini avant de continuer
          this.commentService.getAllCommente(params['id']).subscribe(
            (comment: any) => {
              this.afficheComment = comment;
              console.log(this.afficheArticle);
            },
            (error) => {
              this.routes.navigate(['/']);
            }
          );
        }

    });
 }


}