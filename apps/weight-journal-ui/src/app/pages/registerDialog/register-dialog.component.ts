import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import {
  birthDateValidator,
  emailPatternValidator,
  getErrorMessageForControl,
  passwordMatchValidator,
  passwordPatternValidator,
} from '../../utils/form.validators';
import { AuthService } from '../../services/auth/auth.service';
import { Role, User } from '@weight-journal-app/domain';
import { snackBarUtil } from '../../utils/snack-bar.util';

//custom type for error messages this is an arrow function

@Component({
  selector: 'weight-journal-app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
  registerFormGroup!: FormGroup;

  isButtonDisabled = true;
  isRegisterLoading = false;
  private formChangesSubscription: Subscription | undefined;
  private passwordChangesSubscription: Subscription | undefined;
  private reigsterSubscription: Subscription | undefined;

  // The constructor is used to create the form group and subscribe to its value changes

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBarUtil: snackBarUtil,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
    if (this.passwordChangesSubscription) {
      this.passwordChangesSubscription.unsubscribe();
    }

    if (this.reigsterSubscription) {
      this.reigsterSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, emailPatternValidator]],
      password: ['', [Validators.required, passwordPatternValidator]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required, passwordMatchValidator]],
      birthDate: ['', [Validators.required, birthDateValidator]],
    });

    // Subscribe to form group value changes, to update the state of the submit button
    this.formChangesSubscription =
      this.registerFormGroup.valueChanges.subscribe(() => {
        this.isButtonDisabled = !this.registerFormGroup.valid;
      });

    // Subscribe to password value changes to update the password confirmation control
    // This is done to trigger the validation of the password confirmation control
    const passwordControl = this.registerFormGroup.get('password');
    if (passwordControl) {
      this.passwordChangesSubscription = passwordControl.valueChanges
        .pipe(debounceTime(500))
        .subscribe(() => {
          const passwordConfirmControl =
            this.registerFormGroup.get('passwordConfirm');
          if (passwordConfirmControl) {
            passwordConfirmControl.updateValueAndValidity();
          }
        });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////  ERROR MESSAGES GETTERS /////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  // The methods below are used to display the error messages for each form control
  getEmailErrorMessage() {
    return getErrorMessageForControl(this.registerFormGroup, 'email', 'Email');
  }

  getPasswordErrorMessage() {
    return getErrorMessageForControl(
      this.registerFormGroup,
      'password',
      'Password'
    );
  }

  getFirstNameErrorMessage() {
    return getErrorMessageForControl(
      this.registerFormGroup,
      'firstName',
      'First name'
    );
  }

  getLastNameErrorMessage() {
    return getErrorMessageForControl(
      this.registerFormGroup,
      'lastName',
      'Last name'
    );
  }

  getPasswordConfirmErrorMessage() {
    return getErrorMessageForControl(
      this.registerFormGroup,
      'passwordConfirm',
      'Password confirmation'
    );
  }

  getBirthDateErrorMessage() {
    return getErrorMessageForControl(
      this.registerFormGroup,
      'birthDate',
      'Birth date'
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////  FORM SUBMISSION  ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  register() {
    if (this.registerFormGroup.valid) {
      //show loading indicator
      this.isRegisterLoading = true;
      //get form values
      const user = this.createUserFromForm();

      // Subscribe to the register request

      this.reigsterSubscription = this.authService.register(user).subscribe({
        next: () => {
          this.snackBarUtil.openSuccessSnackBar('Registration successful');
        },
        error: (e) => {
          this.snackBarUtil.openErrorSnackBar(
            e.data
          );
          console.log(e);
        },
        complete: () => {
          this.isRegisterLoading = false;
          this.cdRef.detectChanges();
        },
      });
    }
  }

  private createUserFromForm(): User {
    const email = this.registerFormGroup.get('email')?.value;
    const password = this.registerFormGroup.get('password')?.value;
    const firstName = this.registerFormGroup.get('firstName')?.value;
    const lastName = this.registerFormGroup.get('lastName')?.value;
    const birthdate = this.registerFormGroup.get('birthDate')?.value;
    const roles = [Role.USER];
    const user: User = {
      email,
      password,
      firstName,
      lastName,
      birthdate,
      roles,
    };
    return user;
  }
}
