import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StageService } from '../../../stage/services/stage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { InscriptionService } from '../../inscription-services';
import { InscriptionFormModel } from '../../models/inscription-form.model';
import { TokenModel } from '../../../auth/models/token.model';
import { Observable, of } from 'rxjs';
import { StageDetailsModel } from '../../../stage/models/stage-details-model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-inscription-create',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './inscription-create.component.html',
  styleUrls: ['./inscription-create.component.scss']
})
export class InscriptionCreateComponent implements OnInit {
  private readonly _stageService: StageService = inject(StageService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _inscriptionService: InscriptionService = inject(InscriptionService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  inscriptionCreationForm!: FormGroup;

  currentUser: WritableSignal<TokenModel | null> = signal<TokenModel | null>(null);
  stageId!: number;  // Stage ID est maintenant un nombre
  stageDetails: StageDetailsModel | null = null; // Stage details

  stageTypes = [
    { value: 'VOLONTAIRE', label: 'Volontaire' },
    { value: 'PROBATOIRE', label: 'Probatoire' },
    { value: 'TRIBUNAL', label: 'Tribunal' }
  ];

  ngOnInit(): void {
    // Charger l'utilisateur depuis le localStorage
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      this.currentUser.set(JSON.parse(localStorageUser));
    }

    // Récupérer l'ID du stage depuis l'URL
    const stageIdFromRoute = this._router.url.split('/').pop();
    if (stageIdFromRoute) {
      this.stageId = Number(stageIdFromRoute); // Convertir l'ID en nombre
      // Charger les détails du stage avec l'ID
      this._stageService.getStageById(this.stageId).subscribe({
        next: (stage: StageDetailsModel) => {
          this.stageDetails = stage;
        },
        error: (err) => {
          console.error('Erreur lors du chargement du stage', err);
        }
      });
    }

    // Créer le formulaire de création d'inscription
    this.inscriptionCreationForm = this._fb.group({
      userId: ['', Validators.required],
      stageId: ['', Validators.required],
      stageType: ['', Validators.required],
      dateDeInscription: ['', Validators.required],
      // codePromo: [null, Validators.required]
    });
  }

  handleInscription(): void {
    console.log('Inscription Create', this.inscriptionCreationForm.value);

    if (this.inscriptionCreationForm.invalid) {
      return;
    }

    const currentUserValue = this.currentUser();
    if (!currentUserValue) {
      console.error('Utilisateur non trouvé');
      return;
    }

    // Créer les données d'inscription à envoyer
    const inscriptionData: InscriptionFormModel = {
      userId: currentUserValue.id,  // Utilisation du signal currentUser
      stageId: this.stageId,
      stageType: this.inscriptionCreationForm.value.stageType,  // Récupérer le type de stage

      date: this.inscriptionCreationForm.value.dateDeInscription
      // codePromo: this.inscriptionCreationForm.value.codePromo || ''
    };

    // Soumettre l'inscription via le service
    this._inscriptionService.createInscription(inscriptionData).subscribe({
      next: (resp: InscriptionFormModel) => {
        // Redirection après inscription réussie
        this._router.navigate(['/stages/all']);
      },
      error: (err) => {
        console.error('Erreur lors de la création de l\'inscription', err);
      }
    });
  }
}
