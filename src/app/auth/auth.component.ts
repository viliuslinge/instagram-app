import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';

type UserFields = 'name' | 'email' | 'password';
type FormErrors = {[u in UserFields]: string};

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  userForm: FormGroup;
  formErrors: FormErrors = {
    'name': '',
    'email': '',
    'password': ''
  };
  validationMessage = {
    'email': {
      'required': 'Email is required',
      'email': 'Email must be valid'
    },
    'name': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 3 chars long'
    },
    'password': {
      'required': 'Password is required',
      'pattern': 'Password must contain at least one letter and one number',
      'minlength': 'Password must be at least 6 chars long',
      'maxlength': 'Password cannot be longer than 40 chars'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private _aS: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.formBuilder.group(
      {
        'name': ['', [
          Validators.required,
          Validators.minLength(3)
        ]],
        'email': ['', [
          Validators.required,
          Validators.email
        ]],
        'password': ['', [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(40)
        ]]
      }
    );
    this.userForm.valueChanges.subscribe(
      (data) => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessage[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]}. `;
              }
            }
          }
        }
      }
    }
  }

  signUp() {
    this._aS.emailSignUp(
      this.userForm.value['email'],
      this.userForm.value['name'],
      this.userForm.value['password']
    );
  }

}
