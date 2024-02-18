import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/common/AuthentificationService';
import { TokenService } from 'src/app/common/TokenService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  public estConnecter: any[] = [];

  constructor(
    private serviceToken: TokenService,
    private service: AuthentificationService,
    private route: Router
    ) { }

  ngOnInit(): void {
   this.userAfiche()
  }

  toggleMenu() {
    if (this.menuTrigger && this.menuTrigger.menuOpen) {
      this.menuTrigger.closeMenu();
    } else if (this.menuTrigger) {
      this.menuTrigger.openMenu();
    }
  }


  public userAfiche() {
    if (this.serviceToken.getUser().token == null) {
      this.route.navigate(['']);
      console.log(this.serviceToken.getUser().userInfo);
    } else {
      this.route.navigate(['/login']);
      console.log(this.serviceToken.getUser().userInfo);
    }
    //VERIFICATION DU ROLE DE L'UTILISATEUR EN COUR POUR LUI AFFICHER OU PAS LE BOUTON ADMIN
  }

}
