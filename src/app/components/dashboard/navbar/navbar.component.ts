import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../interfaces/menu';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  nombreUsuario: string | null = null;

  constructor(private _menuServices: MenuService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarMenu();
    this.nombreUsuario = this.authService.getUsuarioLogueado();
  }

  cargarMenu() {
    this._menuServices.getMenu().subscribe(data => {
      this.menu = data;
    });
  }

  onLogout() {
    this.authService.logout(); 
  }
}
