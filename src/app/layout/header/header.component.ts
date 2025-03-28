import {Component, HostListener, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private readonly $_authService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  userConnected = this.$_authService.currentUser;
  role: string | undefined = '';

  constructor() {
    console.log(this.userConnected());
    //this.role = this.$_authService.currentUser()?.role.name;
    //console.log('ROLE : ', this.role);
  }

  showModal = false;
  showAnimation = false;

  toggleModal(event: Event) {
    event.stopPropagation(); // Empêche la fermeture immédiate
    if (!this.showModal) {
      this.showModal = true;
      setTimeout(() => {
        this.showAnimation = true;
      }, 100);
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.showAnimation = false;
    setTimeout(() => {
      this.showModal = false;
    }, 200);
  }

  selectType(type: string, event: Event) {
    event.stopPropagation(); // Empêche la fermeture immédiate en cliquant sur un bouton
    console.log(`Type sélectionné : ${type}`);
    this.closeModal();
  }

  // 🎯 Détection du scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }
  @HostListener('document:click')
  handleClickOutside() {
    if (this.showModal) {
      this.closeModal();
    }
  }

  logout() {
    this.$_authService.logout();
    this._router.navigate(['/']);
  }

  isScrolled = false;
}
