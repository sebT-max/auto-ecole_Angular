import {Component, inject, OnInit} from '@angular/core';
import {StageService} from '../../services/stage.service';
import {StageDetailsModel} from '../../models/stage-details-model';
import {RouterLink} from '@angular/router';
import {StageDetailsComponent} from '../stage-details/stage-details.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-stage-all',
  imports: [
    RouterLink,
    StageDetailsComponent,
    NgIf
  ],
  templateUrl: './stage-all.component.html',
  styleUrl: './stage-all.component.scss'
})

export class StageAllComponent implements OnInit {
  stages: StageDetailsModel[] = [];
  selectedStage: StageDetailsModel | null = null;

  constructor(private _stageService: StageService) {}

  ngOnInit() {
    this._stageService.getAllStage().subscribe({
      next: (stages: StageDetailsModel[]) => {
        this.stages = stages;
      },
      error: (error: string) => console.error('Erreur de chargement:', error)
    });
  }

  selectStage(stage: StageDetailsModel) {
    // Toggle : si on clique à nouveau sur le même stage, on ferme les détails
    this.selectedStage = this.selectedStage?.id === stage.id ? null : stage;
  }

  closeDetails() {
    this.selectedStage = null; // Fermer les détails
  }
}
