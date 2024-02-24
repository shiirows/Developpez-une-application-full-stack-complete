import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/common/ArticleService';
import { ThemeService } from 'src/app/common/SubjectService';
import { ArticleRequest } from 'src/app/model/ArticleRequest';
import { Subjects } from 'src/app/model/Subjects';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

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

  public getSubject() {
    this.themeService.getSubject().subscribe(
      (response: any) => {
        this.subjects = response.subject; // Extraire le tableau d'articles de la propriété "article" de la réponse JSON
        console.log(this.subjects);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubjectChange(event: any) {
    this.selectedSubject = event.target.value;
    // Use this.selectedSubject to access the ID of the selected subject
    console.log('Selected subject ID:', this.selectedSubject);
  }



  public initForm() {
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

  public onSubmit(){

    const titre : string = this.articleForm.get('title').value;
    const content : string = this.articleForm.get('content').value;
    const idSubject = this.selectedSubject;

    let articleRequest : ArticleRequest = new ArticleRequest(idSubject, content, titre);
    console.log(articleRequest);
    this.articleservice.createArticle(articleRequest).subscribe(
      (response: any) => {
        console.log(response);
        this.route.navigate(['/articles']);
      },
      (error) => {
        console.log(error);
      }
    );
  

  }

}
