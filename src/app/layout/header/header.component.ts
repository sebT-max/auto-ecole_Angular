import {Component, HostListener, inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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

  logout() {
    this.$_authService.logout();
    this._router.navigate(['/']);
}
  isScrolled = false;

  // 🎯 Détection du scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }

}
