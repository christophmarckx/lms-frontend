import {FormGroup, ValidatorFn} from '@angular/forms';

export function confirmPasswordValidator(passwordKey: string, confirmPasswordKey: string) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[passwordKey];
    const confirmPassword = formGroup.controls[confirmPasswordKey];

    console.log(password);
    if (password.errors) {
      return;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({mismatch: true});
    }
    else {
      confirmPassword.setErrors(null);
    }
  }
}
