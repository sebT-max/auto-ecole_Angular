import {HttpClient} from '@angular/common/http';
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

  createInscription(inscription: InscriptionFormModel) {
    return this._httpClient.post<InscriptionFormModel>(`${API_URL}inscriptions/create`, inscription);
  }
  getClientInscriptions(): Observable<InscriptionFormModel[]> {
    return this._httpClient.get<InscriptionFormModel[]>(`${API_URL}inscriptions/me`);
  }
}

