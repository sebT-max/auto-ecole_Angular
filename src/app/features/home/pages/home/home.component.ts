import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Correction ici
  standalone: true
})
export class HomeComponent {
}
