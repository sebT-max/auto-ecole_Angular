import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {TokenModel} from '../../auth/models/token.model';
import {API_URL} from '../../../core/constants/api-constant';
import {StageDetailsModel} from '../models/stage-details-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService{
  private _httpClient: HttpClient = inject(HttpClient);
  private userRoles: string[] = [];

  private loadUserRoles(): void {
    // Ici, tu devrais récupérer les rôles de l'utilisateur depuis le token ou l'API
    // Simulons des rôles récupérés après connexion
    const storedRoles = localStorage.getItem('roles'); // Exemple avec localStorage
    this.userRoles = storedRoles ? JSON.parse(storedRoles) : [];
  }
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }
  currentUser: WritableSignal<TokenModel | null> = signal<TokenModel | null>(
    null,
  );

  constructor(){
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      this.currentUser.set(JSON.parse(localStorageUser));
    }
    this.loadUserRoles();
}
  createStage(stage:StageDetailsModel){
      return this._httpClient.post<StageDetailsModel>(`${API_URL}stages/create`,stage);
  }
  getAllStage(): Observable<StageDetailsModel[]> {
    return this._httpClient.get<StageDetailsModel[]>(`${API_URL}stages/all`);
  }
  getStageById(stageId:number): Observable<StageDetailsModel> {
    return this._httpClient.get<StageDetailsModel>(`${API_URL}stages/${stageId}`);
  }
  getFilteredStages(searchTerm: string): Observable<StageDetailsModel[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this._httpClient.get<StageDetailsModel[]>(`${API_URL}stages/search`, { params });
  }

}

