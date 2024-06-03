import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {UserRole} from "../../model/authentication/AuthenticatedUser";

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
