import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

//how to use
// Step 1: Add a new error key and error message function om tje valdatioErrorMessages object
// The key should be a unique identifier for the validation error
// example customErrorKey: (value) => `${value} is not valid`

// Step 2: Create a new custom validator function for the new validation
// Implement your custom validation logic inside the validator function
// Return an object with the error key from step 1 and the value 'true' when the validation fails
// Example: return { customErrorKey: true };

// Step 3: Use the new custom validator in the form group definition in the constructor of the component
// Add the new customValidator to the form control's validators array
// Example: password: ['', [Validators.required, passwordPatternValidator]]

// Step 4: Update the HTML template to display the error message for the new validation
// You can use the 'getErrorMessageForControl' function to get the error message for the new control in your template
//   HTML --> example: <mat-error>{{ GetEmailErrorMessage }}</mat-error>
//   TS file --> getEmailErrorMessage() {
//     return getErrorMessageForControl(this.FormGroup, 'email', 'Email');
//   }





// Type for the error message function
type ErrorMessageFunction = (value?: string) => string;

// Object to store the error message functions
export const validationErrorMessages: { [key: string]: ErrorMessageFunction } =
  {
    // Add a new error key and error message function here
    required: (value) => `${value} is required`,
    emailPattern: () => `Invalid email format`,
    invalidDate: () => 'Invalid date format',
    futureDate: () => `Date cannot be in the future`,
    oldDate: () =>
      `Date is too far in the past, please check the date`,
    passwordMismatch: () => 'Passwords do not match',
    passwordPattern: () =>
      'Password must be 8 to 30 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character',
  };

// Function to get the error message for a specific control in the FormGroup
export const getErrorMessageForControl = (
  formGroup: FormGroup,
  controlName: string,
  value: string
): string => {
  const control = formGroup.get(controlName);
  // Check if the control is invalid and has been touched or dirty
  if (control?.invalid && (control.touched || control.dirty)) {
    // Loop through the error keys in validationErrorMessages
    for (const errorKey of Object.keys(validationErrorMessages)) {
      // Check if the control has the current error key
      if (control.hasError(errorKey)) {
        // Get the corresponding error message function from validationErrorMessages object
        const errorMessageFunc = validationErrorMessages[errorKey];
        // Call the error message function with the provided value and return the error message
        return errorMessageFunc(value);
      }
    }
  }

  // Return an empty string if there are no validation errors or the control is untouched/clean
  return '';
};

// Custom validator that checks if the password and passwordConfirm fields match
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

// Custom validator that checks if the birth date is valid
export const birthDateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const currentDate = new Date();
  const selectedDate = new Date(control.value);

  // Check if the selected date is a valid date
  if (isNaN(selectedDate.getTime())) {
    return { invalidDate: true };
  }

  // Check if the selected date is not in the future
  if (selectedDate > currentDate) {
    return { futureDate: true };
  }

  // Check if the selected date is not too far in the past (e.g., not before 100 years from the current date)
  const maxAllowedDate = new Date(
    currentDate.getFullYear() - 100,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  if (selectedDate < maxAllowedDate) {
    return { oldDate: true };
  }

  return null; // Date is valid
};

// Custom validator that checks if the email is valid
export const emailPatternValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(control.value) ? null : { emailPattern: true };
};

// Custom validator that checks if the password is valid (min 8 characters, 1 uppercase, 1 lowercase, 1 special character)
export const passwordPatternValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(control.value) ? null : { passwordPattern: true };
};