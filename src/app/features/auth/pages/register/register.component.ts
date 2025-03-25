import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserFormModel } from '../../models/user-form.model';
import {RegisterFormModel} from '../../models/register-form.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly $_authService: AuthService = inject(AuthService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  registerForm: FormGroup;
  registerFormModel!: RegisterFormModel;

  constructor() {
    this.registerForm = this._formBuilder.group({
      gender: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  handleCompagnyRegisterFormSubmit(): void {
    if(this.registerForm.invalid){
      console.log("formulaire invalide");
      return;
    }

    this.registerFormModel = {
      lastname: this.registerForm.get('nom')!.value,
      firstname: this.registerForm.get('prénom')!.value,
      email: this.registerForm.get('email')!.value,
      password: this.registerForm.get('password')!.value,
      password_confirmation: this.registerForm.get('password_confirmation')!.value,
      gender:this.registerForm.get('sexe')!.value,
      birthdate:this.registerForm.get('date de naissance')!.value,
      telephone: this.registerForm.get('telephone')!.value
    };
    console.log('EntrepriseRegisterFormModel', this.registerForm);

    this.$_authService.register(this.registerFormModel).subscribe({
      next: (datas:number) => {
        console.log('Création du user réussie, voici son Id :', datas);
        this._router.navigate(['auth/login']);
      },
      error: (err: Error) => {
        if(err){
          console.log("Erreur d'enregistrement");
          console.log(err);
        }
      },
    });
  }}

