import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/token.model';
import { RegisterFormModel } from '../models/register-form.model';
import { Observable, tap } from 'rxjs';
import { LoginFormModel } from '../models/login-form.model';
import { UserFormModel } from '../models/user-form.model';
import { UserResponseModel } from '../models/user-response.model';
import {CompanyRegisterFormModel} from '../models/company-register-form-model';
import {API_URL} from '../../../core/constants/api-constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
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

  constructor() {
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      this.currentUser.set(JSON.parse(localStorageUser));
    }
    this.loadUserRoles();
  }

  register(user: RegisterFormModel) {
    return this._httpClient.post<number>(`${API_URL}users/register`, user);
  }

  entrepriseRegister(entreprise: CompanyRegisterFormModel) {
    return this._httpClient.post<number>(`${API_URL}company/register`, entreprise);
  }

  login(user: LoginFormModel) {
    return this._httpClient.post<TokenModel>(`${API_URL}users/login`, user).pipe(
      tap((resp: TokenModel | null): void => {
        if (resp) {
          this.currentUser.set(resp);
          localStorage.setItem('currentUser', JSON.stringify(resp));
        }
      }),
    );
  }

  getUserById(id: number): Observable<UserResponseModel> {
    return this._httpClient.get<UserResponseModel>(`${API_URL}user/${id}`);
  }

  getMe(): Observable<UserResponseModel> {
    return this._httpClient.get<UserResponseModel>(`${API_URL}user/me`);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }

  getUsers(): Observable<UserResponseModel[]> {
    return this._httpClient.get<UserResponseModel[]>(`${API_URL}/user/all`);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Vérifie si un token est présent
    return !!token; // Retourne `true` si le token existe, sinon `false`
  }
}
