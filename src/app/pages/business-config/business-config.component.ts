import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AddressService } from '../../services/address.service';
import { AddressResult } from '../../interfaces/address-result';
import { Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BusinessFormKeys } from '../../../shared/enumerators';
import { BusinessService } from '../../services/business.service';
import { Business } from '../../interfaces/business.interface';
import { CpfValidator, CnpjValidator } from '../../../shared/custom-validator';


@Component({
  selector: 'app-business-config',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CardModule, DialogModule, ButtonModule, RippleModule, InputMaskModule, InputTextModule, MessagesModule, MessageModule, ToastModule],
  providers: [MessageService],
  templateUrl: './business-config.component.html',
  styleUrl: './business-config.component.scss'
})
export class BusinessConfigComponent {
  private accountService = inject(AccountService);
  private addressService = inject(AddressService);
  private businessService = inject(BusinessService);

  businessForm: FormGroup;
  businessDialog = false;
  public account: Account = {
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
    ConfigCompleted: false
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private messageService: MessageService) {
    this.accountService.Get().subscribe((result: Account) => {
      this.account = result;
    });

    this.businessForm = this.formBuilder.group({
      type: [''],
      name: ['', [Validators.required]],
      federalId: ['', [Validators.required, CnpjValidator]],
      zipCode: [''],
      address: [''],
      neighborhood: [''],
      state: [''],
      city: [''],
      addressComplement: [''],
      cellPhone: ['', [Validators.required]],
      adminName: ['', [Validators.required]],
      adminFederalId: ['', [Validators.required, CpfValidator]],
      adminEmail: ['', [Validators.required]]
    });
  }

  OpenBusinessDialog() {
    this.businessDialog = true;
  }

  ZipCodeBlur() {
    const zipCode = this.businessForm.get('zipCode')?.value;
    if (this.businessForm.get('zipCode')?.valid && zipCode.length) {
      console.log('buscar cep...', zipCode);
      this.addressService.GetByZipCode(zipCode).subscribe((result: AddressResult) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereço encontrado' });
        console.log(zipCode, "endereço buscado: ", result);
        this.businessForm.get('address')?.setValue(result.logradouro);
        this.businessForm.get('neighborhood')?.setValue(result.bairro);
        this.businessForm.get('state')?.setValue(result.estado);
        this.businessForm.get('city')?.setValue(result.localidade);
        this.businessForm.get('addressComplement')?.setValue(result.complemento);
      });
    }
  }

  businessFormSubmit() {
    if (this.businessForm.valid) {

      const newBusiness: Business = {
        type: this.businessForm.get('type')?.value,
        name: this.businessForm.get('name')?.value,
        federalId: this.businessForm.get('federalId')?.value,
        zipCode: this.businessForm.get('zipCode')?.value,
        address: this.businessForm.get('address')?.value,
        neighborhood: this.businessForm.get('neighborhood')?.value,
        state: this.businessForm.get('state')?.value,
        city: this.businessForm.get('city')?.value,
        addressComplement: this.businessForm.get('addressComplement')?.value,
        cellPhone: this.businessForm.get('cellPhone')?.value,
        adminName: this.businessForm.get('adminName')?.value,
        adminFederalId: this.businessForm.get('adminFederalId')?.value,
        adminEmail: this.businessForm.get('adminEmail')?.value
      } as Business;

      this.businessService.Create(newBusiness).subscribe((result: boolean) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Empresa Matriz cadastrada com sucesso' });
        this.account.ConfigCompleted = true;
        this.accountService.Update(this.account).subscribe((result: boolean) => {
          this.reloadPage();
          this.router.navigate(['/dashboard']);
        });
      });

    } else {
      const messages = this.getErrorMessageList(this.businessForm);
      this.messageService.addAll(messages);
    }
  }

  reloadPage(): void { window.location.reload(); }

  getErrorMessageList(formGroup: FormGroup): Message[] {
    const errors: Message[] = [];
    Object.keys(formGroup.controls).forEach(key => {
      const control = this.businessForm.get(key);
      if (control instanceof FormGroup) {
        errors.concat(this.getErrorMessageList(control));
      } else {
        if (control!.errors) {
          errors.push({ severity: 'error', summary: 'Campo Inválido', detail: `O campo ${this.getEnumValue(key as keyof typeof BusinessFormKeys)} é obrigatório` });
        }
      }
    });

    return errors;
  }

  getEnumValue(key: keyof typeof BusinessFormKeys): string {
    return BusinessFormKeys[key]
  }
}
