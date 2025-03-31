/*
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TokenModel} from '../auth/models/token.model';
import {StageDetailsModel} from '../stage/models/stage-details-model';
import {API_URL} from '../../core/constants/api-constant';
import {InscriptionFormModel} from './models/inscription-form.model';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private _httpClient: HttpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const userData = localStorage.getItem('currentUser');
    const token = userData ? JSON.parse(userData).token : null;

    if (!token) {
      console.error('⚠️ Aucun token trouvé dans localStorage');
      return new HttpHeaders(); // Retourne des headers vides pour éviter une erreur
    }

    // Vérifier si le token est bien unique
    const authHeader = `Bearer ${token}`;
    console.log('Authorization Header:', authHeader); // Debug

    return new HttpHeaders().set('Authorization', authHeader);
  }



  createInscription(inscription: InscriptionFormModel) {
    return this._httpClient.post<InscriptionFormModel>(
      `${API_URL}inscriptions/create`,
      inscription,
      { headers: this.getAuthHeaders() }
    );
  }

  getClientInscriptions(): Observable<InscriptionFormModel[]> {
    return this._httpClient.get<InscriptionFormModel[]>(
      `${API_URL}inscriptions/me`,
      { headers: this.getAuthHeaders() } // Ajoute les headers ici
    );
  }
}
*/

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../core/constants/api-constant';
import { InscriptionFormModel } from './models/inscription-form.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _authService: AuthService = inject(AuthService);

  createInscription(inscription: InscriptionFormModel) {
    return this._httpClient.post<InscriptionFormModel>(
      `${API_URL}inscriptions/create`,
      inscription,
      this._authService.getAuthOptions()
    );
  }

  getClientInscriptions(): Observable<InscriptionFormModel[]> {
    return this._httpClient.get<InscriptionFormModel[]>(
      `${API_URL}inscriptions/me`,
      this._authService.getAuthOptions()
    );
  }
  getAllInscriptions(): Observable<InscriptionFormModel[]> {
    return this._httpClient.get<InscriptionFormModel[]>(
      `${API_URL}inscriptions/all`,
      this._authService.getAuthOptions()
    );
  }
}

