// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { iUserRegData } from '../../interfaces/user-reg-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(100)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(form: FormGroup): null | object {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const userData: iUserRegData = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Registration successful!');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error(error);
        this.notificationService.showError('Registration failed. Please try again.');
      },
    });
  }
}
