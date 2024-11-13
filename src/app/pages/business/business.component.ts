import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BusinessService } from '../../services/business.service';
import { Business } from '../../interfaces/business.interface';


@Component({
  selector: 'app-business',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss'
})
export class BusinessComponent {
  private businessService = inject(BusinessService);
  public business: Business = {} as Business;

  constructor() {
    this.businessService.Get().subscribe((result: Business) => {
      this.business = result;
    });
  }
}
