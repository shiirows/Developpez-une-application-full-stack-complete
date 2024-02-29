import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/common/ArticleService';
import { ThemeService } from 'src/app/common/SubjectService';
import { ArticleRequest } from 'src/app/model/ArticleRequest';
import { Subjects } from 'src/app/model/Subjects';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit, OnDestroy {

  private themeSubscription: Subscription;
  private articleSubscription: Subscription;

  constructor(    
    private formB: FormBuilder,
    private route: Router,
    private themeService: ThemeService,
    private articleservice: ArticleService
  ) { }

  public articleForm: any;
  public subjects: Subjects [] = [];
  public selectedSubject: any;

  ngOnInit(): void {
    this.initForm();
    this.getSubject();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }

  public getSubject():void {
    this.themeSubscription = this.themeService.getSubject().subscribe(
      (response: any) => {
        this.subjects = response.subject;
      },
      (error) => {
      }
    );
  }

  onSubjectChange(event: any):void {
    this.selectedSubject = event.target.value;
  }

  public initForm():void {
    this.articleForm = this.formB.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
        ],
      ],
    });
  }

  public onSubmit():void{
    const titre : string = this.articleForm.get('title').value;
    const content : string = this.articleForm.get('content').value;
    const idSubject = this.selectedSubject;

    let articleRequest : ArticleRequest = new ArticleRequest(idSubject, content, titre);

    this.articleSubscription = this.articleservice.createArticle(articleRequest).subscribe(
      (response: any) => {
        this.route.navigate(['/articles']);
      },
      (error) => {
      }
    );
  }
}
