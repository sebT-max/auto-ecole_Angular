import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.scss'
})
export class RoleSelectionComponent implements OnInit {
  private roleModal!: bootstrap.Modal;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const modalElement = document.getElementById('roleModal');
    if (modalElement) {
      this.roleModal = new bootstrap.Modal(modalElement, {});
    }
  }

  openModal() {
    this.roleModal?.show();
  }

  selectRole(role: string) {
    if (role === 'CLIENT') {
      this.router.navigate(['/auth/user/register']); // Redirection vers particuliers
    } else if (role === 'ENTREPRISE') {
      this.router.navigate(['/auth/company/register']); // Redirection vers entreprises
    }
  }
}
