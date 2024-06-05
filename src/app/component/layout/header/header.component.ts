import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import { UserRole } from '../../../models/authentication/authenticated-user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authenticationService = inject(AuthenticationService);
  title: string = "L.M.S.";
  protected readonly UserRole = UserRole;
}
