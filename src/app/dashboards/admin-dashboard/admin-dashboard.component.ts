import {Component, inject, OnInit} from '@angular/core';
import {InscriptionService} from '../../features/inscription/inscription-services';
import {StageService} from '../../features/stage/services/stage.service';
import {InscriptionFormModel} from '../../features/inscription/models/inscription-form.model';
import {StageDetailsModel} from '../../features/stage/models/stage-details-model';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {API_URL} from '../../core/constants/api-constant';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit  {
  private readonly _inscriptionService = inject(InscriptionService);
  private readonly _stageService = inject(StageService);

  inscriptions: InscriptionFormModel[] = [];
  stagesDetails: { [key: number]: StageDetailsModel } = {}; // Stocke les détails des stages

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions(): void {
    this._inscriptionService.getAllInscriptions().subscribe({
      next: (inscriptions) => {
        console.log("Inscriptions récupérées :", inscriptions);
        this.inscriptions = inscriptions;
        this.loadStagesDetails(); // Charger les détails des stages après avoir récupéré les inscriptions
      },
      error: (err) => {
        console.error('Erreur lors du chargement des inscriptions', err);
      }
    });
  }
  viewFile(fileName: string) {
    window.open(`${API_URL}inscriptions/file/${fileName}`, '_blank');
  }
  loadStagesDetails(): void {
    this.inscriptions.forEach(inscription => {
      if (inscription.stageId != null && !this.stagesDetails[inscription.stageId]) {
        console.log(`Chargement des détails du stage ${inscription.stageId}`);
        this._stageService.getStageById(inscription.stageId).subscribe({
          next: (stage) => {
            console.log(`Détails du stage ${inscription.stageId} récupérés:`, stage);
            this.stagesDetails[inscription.stageId!] = stage; // "!" pour TypeScript
          },
          error: (err) => {
            console.error(`Erreur lors du chargement du stage ${inscription.stageId}`, err);
          }
        });
      }
    });
  }
}


