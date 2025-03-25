import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserFormModel} from '../../models/user-form.model';
import {EntrepriseRegisterFormModel} from '../../models/entreprise-register-form-model';

@Component({
  selector: 'app-company-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.scss'
})
export class CompanyRegisterComponent {

  private readonly $_authService: AuthService = inject(AuthService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  companyRegisterForm: FormGroup;
  EntrepriseRegisterFormModel!: EntrepriseRegisterFormModel;

  constructor() {
    this.companyRegisterForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.minLength(6)]],
      telephone: [null, [Validators.required]]
    });
  }
  handleCompagnyRegisterFormSubmit(): void {
    if(this.companyRegisterForm.invalid){
      console.log("formulaire invalide");
      return;
    }
    this.EntrepriseRegisterFormModel = {
      name: this.companyRegisterForm.get('name')!.value,
      email: this.companyRegisterForm.get('email')!.value,
      password: this.companyRegisterForm.get('password')!.value,
      password_confirmation: this.companyRegisterForm.get('password_confirmation')!.value,
      telephone: this.companyRegisterForm.get('telephone')!.value
    };
    console.log('EntrepriseRegisterFormModel', this.EntrepriseRegisterFormModel);

    this.$_authService.entrepriseRegister(this.EntrepriseRegisterFormModel).subscribe({
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
  }
}
