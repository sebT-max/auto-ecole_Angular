import { Component } from '@angular/core';
import {RoleSelectionComponent} from '../../../../role-selection/role-selection.component';

@Component({
  selector: 'app-home',
  imports: [RoleSelectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Correction ici
  standalone: true
})
export class HomeComponent {}
