import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPatternValidator, getErrorMessageForControl } from '../../utils/form.validators';
import { LoginDto } from '@weight-journal-app/domain';
import { Subscription, finalize } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { snackBarUtil } from '../../utils/snack-bar.util';


@Component({
  selector: 'weight-journal-app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnDestroy{
  loginFormGroup: FormGroup;

  isButtonDisabled = true;
  invalidLogin = false;
  isLoginLoading = false;

  loginSubscription: Subscription | undefined;



  constructor( private formBuilder: FormBuilder, private authService: AuthService, private snackBarUtil: snackBarUtil, private cdRef: ChangeDetectorRef) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailPatternValidator]],
      password: ['', [Validators.required]],
    });

    // Subscribe to form group value changes, to update the state of the submit button
    this.loginFormGroup.valueChanges.subscribe(() => {
      this.isButtonDisabled = !this.loginFormGroup.valid;
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
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
    if (this.loginFormGroup.valid) {
      // Show loading indicator
      this.isLoginLoading = true;
      
      // Get form values
      const credentials = this.getCredentailsFromForm();
  
      // Subscribe to the register request
      // TODO: Remove the setTimeout() function
      setTimeout(() => {
      this.loginSubscription = this.authService.login(credentials)
      .pipe(
        finalize(() => {
          this.isLoginLoading = false; // Hide loading indicator when request completes
          this.cdRef.detectChanges(); // Trigger change detection if needed
        })
      )
      .subscribe({
        next: () => {
          this.snackBarUtil.openSuccessSnackBar('Login successful');
        },
        error: (e) => {
          this.snackBarUtil.openErrorSnackBar(
            e.error.message || 'Login failed'
          );
        },
        complete: () => {
          console.log('login request completed');
        },
      });
      }, 3000);
    }
  }

  private getCredentailsFromForm(): LoginDto {
    const credentials = {
      username: this.loginFormGroup.get('email')?.value,
      password: this.loginFormGroup.get('password')?.value,
    };
    return credentials;
  }
}
