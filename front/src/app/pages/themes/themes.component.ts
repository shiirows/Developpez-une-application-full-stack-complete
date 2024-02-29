import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/common/SubjectService';
import { Subjects } from 'src/app/model/Subjects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>(); // Créez un sujet pour gérer la destruction des observables

  public ButtonSubscription: boolean = true;
  public ButtonDesubscribe: boolean = false;

  public themes: Subjects[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.getSubject();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Déclenchez la fin du sujet pour détruire les abonnements aux observables
    this.unsubscribe$.complete(); // Indiquez que le sujet est terminé
  }

  public getSubject():void {
    this.themeService
      .getSubject()
      .pipe(takeUntil(this.unsubscribe$)) // Utilisez takeUntil pour détruire l'abonnement lors de la destruction du composant
      .subscribe(
        (response: any) => {
          this.themes = response.subject;
        },
        (error) => {
        }
      );
  }
}
