import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPatternValidator, getErrorMessageForControl } from '../../utils/form.validators';


@Component({
  selector: 'weight-journal-app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  loginFormGroup: FormGroup;

  isButtonDisabled = true;
  invalidLogin = false;
  isLoginLoading = true;



  constructor( private formBuilder: FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailPatternValidator]],
      password: ['', [Validators.required]],
    });

    // Subscribe to form group value changes, to update the state of the submit button
    this.loginFormGroup.valueChanges.subscribe(() => {
      this.isButtonDisabled = !this.loginFormGroup.valid;
    });
  }


  /////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////  ERROR MESSAGES GETTERS /////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  // The methods below are used to display the error messages for each form control
  getEmailErrorMessage() {
    return getErrorMessageForControl(this.loginFormGroup, 'email', 'Email');
  }

  getPasswordErrorMessage() {
    return getErrorMessageForControl(this.loginFormGroup, 'password', 'Password');
  }


  /////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////  FORM SUBMIT HANDLER ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  login(){
    this.isLoginLoading = true;
    setTimeout(() => {
      this.isLoginLoading = false;
    }, 2000);

      this.invalidLogin = true;
  }
}
