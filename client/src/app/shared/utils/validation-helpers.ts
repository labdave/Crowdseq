import { FormControl, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export function checkFormControlInvalid(form: FormGroup, formControlName: string, errorCode: string): boolean {
  return (form.controls[formControlName].dirty &&
    !isNullOrUndefined(form.controls[formControlName].errors) &&
    form.controls[formControlName].errors[errorCode]);
}

export function MatchCurrentPassword(FC: FormControl, currentPassword: string) {
  const password = FC.value;
  if (password !== currentPassword) {
    FC.setErrors({ MatchCurrentPassword: true });
  } else {
    return null;
  }
}

export function emailRegex(): RegExp {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
