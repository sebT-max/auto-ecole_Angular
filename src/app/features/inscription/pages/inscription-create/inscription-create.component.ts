import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StageService } from '../../../stage/services/stage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { InscriptionService } from '../../inscription-services';
import { InscriptionFormModel } from '../../models/inscription-form.model';
import { TokenModel } from '../../../auth/models/token.model';
import { Observable, of } from 'rxjs';
import { StageDetailsModel } from '../../../stage/models/stage-details-model';

@Component({
  selector: 'app-inscription-create',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './inscription-create.component.html',
  styleUrl: './inscription-create.component.scss'
})
export class InscriptionCreateComponent {
  private readonly _stageService: StageService = inject(StageService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _inscriptionService: InscriptionService = inject(InscriptionService);

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  inscriptionCreationForm!: FormGroup;

  currentUser: WritableSignal<TokenModel | null> = signal<TokenModel | null>(null);
  stageId!: number;  // Stage ID est maintenant un nombre

  constructor() {
    this.inscriptionCreationForm = this._fb.group({
      dateDeInscription: ['', Validators.required],
      codePromo: [null, Validators.required]
    });

    // Charger l'utilisateur à partir du localStorage
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      this.currentUser.set(JSON.parse(localStorageUser));
    }

    // Supposons que vous récupérez le stageId de la route (paramètres d'URL)
    const stageIdFromRoute = this._router.url.split('/').pop(); // Exemple : récupérer l'ID depuis l'URL
    if (stageIdFromRoute) {
      this.stageId = Number(stageIdFromRoute); // Convertir l'ID en nombre
    }
  }

  handleInscription() {
    console.log('Inscription Create', this.inscriptionCreationForm.value);

    if (this.inscriptionCreationForm.invalid) {
      return;
    }

    // Accéder à la valeur du signal currentUser() et créer l'objet d'inscription
    const currentUserValue = this.currentUser();
    if (!currentUserValue) {
      console.error('Utilisateur non trouvé');
      return;
    }

    const inscriptionData: InscriptionFormModel = {
      userId: currentUserValue.id,  // Accéder à la valeur du signal currentUser
      stageId: this.stageId,
      date: this.inscriptionCreationForm.value.dateDeInscription,
      codePromo: this.inscriptionCreationForm.value.codePromo || ''
    };

    this._inscriptionService.createInscription(inscriptionData).subscribe({
      next: (resp: InscriptionFormModel): void => {
        this._router.navigate(['/stages/all']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }}
