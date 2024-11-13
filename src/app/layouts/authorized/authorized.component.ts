import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RippleModule, MenubarModule, AvatarModule, PanelMenuModule, BreadcrumbModule],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.scss'
})
export class AuthorizedComponent implements OnInit {
  private accountService = inject(AccountService);
  public account: Account = {
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
    ConfigCompleted: false
  };

  public items: MenuItem[] = [];
  public jobItems: MenuItem[] = [];
  public userItems: MenuItem[] = [];

  public bcItems: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void { // Initialization logic here
    this.accountService.Get().subscribe((result: Account) => {
      if (!result) {
        this.router.navigate(['']);
      }

      this.account = result;

      this.items = [
        {
          label: 'Config. da empresa',
          icon: 'pi pi-building',
          expanded: true,
          items: [
            {
              label: 'Minha empresa',
              icon: '',
              route: '/dashboard',
            },
            { label: 'Benefícios', icon: '', route: '', visible: this.account.ConfigCompleted ?? false },
            { label: 'Áreas', icon: '', route: '', visible: this.account.ConfigCompleted ?? false },
            { label: 'Cargos', icon: '', route: '', visible: this.account.ConfigCompleted ?? false },
            { label: 'Filiais', icon: '', route: '', visible: this.account.ConfigCompleted ?? false }
          ]
        },
        { label: 'Config. de sistema', icon: 'pi pi-objects-column', visible: this.account.ConfigCompleted ?? false, items: [] }
      ];

      this.jobItems = [
        {
          label: 'Gestão de vagas',
          icon: 'pi pi-briefcase',
          route: '',
        }
      ];

      this.userItems = [
        {
          label: 'Meu perfil',
          icon: 'pi pi-user-edit',
          route: '',
        },
        {
          label: 'Todos os usuários',
          icon: 'pi pi-users',
          route: '',
        }
      ];

      if (!this.account.ConfigCompleted) {
        this.router.navigate(['/dashboard/business-config']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    });

    this.bcItems = [
      { label: 'Configurações' },
      { label: 'Empresa' }
    ];

  }
}
