import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/common/ArticleService';
import { CommentService } from 'src/app/common/CommentService';
import { Article } from 'src/app/model/Articles';
import { Comment } from 'src/app/model/Comment';
import { CommentRequest } from 'src/app/model/CommentRequest';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  constructor(
    private articleService: ArticleService,
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private formB: FormBuilder
  ) {}

  public afficheArticle: any;
  public afficheComment: any[];
  public commentForm: any;
  private articleSubscription: Subscription;
  private commentSubscription: Subscription;

  ngOnInit(): void {
    this.getArticle();
    this.getComment();
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

  public getArticle():void {
    this.articleSubscription = this.route.params.subscribe((params: ParamMap) => {
      if (params['id']) {
        this.articleService.getArticleById(params['id']).subscribe(
          (article: Article) => {
            this.afficheArticle = article;
          },
          (error) => {
            this.router.navigate(['/']);
          }
        );
      }
    });
  }

  public getComment():void {
    this.commentSubscription = this.route.params.subscribe((params: ParamMap) => {
      if (params['id']) {
        this.commentService.getAllCommente(params['id']).subscribe(
          (comment: any) => {
            this.afficheComment = comment;
          },
          (error) => {
            this.router.navigate(['/']);
          }
        );
      }
    });
  }

  public initForm():void {
    this.commentForm = this.formB.group({
      comment: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public onSubmit():void {
    const comment: string = this.commentForm.get('comment').value;
    const idArticle = this.afficheArticle.id;
    this.commentService.addComment(comment, idArticle).subscribe(
      (response: any) => {
        this.getComment();
      },
      (error) => {
      }
    );
  }
}
