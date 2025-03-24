import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserFormModel} from '../../models/user-form.model';

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
  userFormModel!: UserFormModel;

  constructor() {
    this.companyRegisterForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.minLength(6)]],
      telephone: [null, [Validators.required]]
    });
  }
}
