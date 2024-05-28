import {FormGroup, ValidatorFn} from '@angular/forms';

export function repeatPasswordValidator(passwordKey: string, repeatPasswordKey: string) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[passwordKey];
    const repeatPassword = formGroup.controls[repeatPasswordKey];

    console.log(password);
    if (password.errors) {
      return;
    }

    if (password.value !== repeatPassword.value) {
      repeatPassword.setErrors({mismatch: true});
    }
    else {
      repeatPassword.setErrors(null);
    }
  }
}
