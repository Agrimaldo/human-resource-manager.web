import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Tools } from './static-tools';

export function CpfValidator(subControl: AbstractControl) {
  const value: string = subControl.value;

  if (!value) {
    return undefined;
  }
  const isValidCPF = Tools.ValidateCPF(value);

  if (!isValidCPF) {
    return { invalidCpf: true };
  }

  return undefined;
}

export function CnpjValidator(subControl: AbstractControl) {
  const value: string = subControl.value;

  if (!value) {
    return undefined;
  }
  const isValidCNPJ = Tools.ValidateCNPJ(value);

  if (!isValidCNPJ) {
    return { invalidCnpj: true };
  }

  return undefined;
}
