import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/common/AuthentificationService';
import { TokenService } from 'src/app/common/TokenService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  public estConnecter: any[] = [];

  private userSubscription: Subscription;

  constructor(
    private serviceToken: TokenService,
    private service: AuthentificationService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userAfiche();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    if (this.menuTrigger && this.menuTrigger.menuOpen) {
      this.menuTrigger.closeMenu();
    } else if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }

  public userAfiche() {
    this.userSubscription = this.serviceToken.getUser().subscribe(
      (user) => {
        if (user.token == null) {
          this.estConnecter = null;
          this.route.navigate(['']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
