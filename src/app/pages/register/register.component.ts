import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, InputTextModule, CardModule, PasswordModule, MessagesModule, MessageModule, ButtonModule, CheckboxModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  accountForm: FormGroup;
  private accountService = inject(AccountService);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.accountForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      checkAccept: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')!.value === formGroup.get('passwordConfirm')!.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.accountForm.valid) {
      console.log('Form Submitted', this.accountForm.value);
      const data: Account = { name: this.accountForm.get('name')!.value, email: this.accountForm.get('name')!.value } as Account;
      this.accountService.Create(data).subscribe((result: boolean) => {
        console.log(result, 'Conta adicionada com sucesso');
        this.router.navigate(['/dashboard']);
      });

    } else {
      console.log('Form is invalid', this.accountForm.errors);
    }
  }
}
