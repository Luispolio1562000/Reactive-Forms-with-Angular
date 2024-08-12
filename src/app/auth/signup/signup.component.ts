import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of, repeat } from 'rxjs';

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}


/* (control: AbstractControl) => {
  const val1 = control.get('password')?.value;
  const val2 = control.get('confirmPassword')?.value;
  if (password === confirmPassword) {
    return null;
  }
  return { notEqual: true };
} */
function equalValues(controlName1: string, controlName2: string) {
return (control: AbstractControl) => {
  const val1 = control.get(controlName1)?.value;
  const val2 = control.get(controlName2)?.value;
  if (val1 === val2) {
    return null;
  }
  return { notEqual: true };
}
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [(control) => emailIsUnique(control)],
    }),

    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required],
      }),
    } , {validators:[equalValues('password', 'confirmPassword')]}),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  /* get passwordIsEqual() {
    const enteredPassword = this.form.value.password;
    const enteredRepeatPassword = this.form.value.confirmPassword;
    return enteredPassword === enteredRepeatPassword;
  } */

  onSubmit() {
    //console.log(this.form);
    const isAgree = this.form.controls.agree.value;
    if (this.form.invalid) {
      console.log('INVALID FORM');
      return;
    }
  }

  onReset() {
    this.form.reset();
  }
}
