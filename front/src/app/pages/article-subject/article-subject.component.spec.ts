import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSubjectComponent } from './article-subject.component';

describe('ArticleSubjectComponent', () => {
  let component: ArticleSubjectComponent;
  let fixture: ComponentFixture<ArticleSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
