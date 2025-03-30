import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {StageDetailsModel} from '../../features/stage/models/stage-details-model';
import {StageService} from '../../features/stage/services/stage.service';
import {Router} from '@angular/router';
import {InscriptionService} from '../../features/inscription/inscription-services';
import {InscriptionFormModel} from '../../features/inscription/models/inscription-form.model';
import {CommonModule, DatePipe, NgClass} from '@angular/common';
import {TokenModel} from '../../features/auth/models/token.model';

@Component({
  selector: 'app-client-dashboard',
  imports: [
    NgClass,
    DatePipe,
    CommonModule
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent implements OnInit {
  private readonly _inscriptionService = inject(InscriptionService);
  inscriptions: InscriptionFormModel[] = [];

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions(): void {
    this._inscriptionService.getClientInscriptions().subscribe({
      next: (inscriptions) => {
        this.inscriptions = inscriptions;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des inscriptions', err);
      }
    });
  }

}
