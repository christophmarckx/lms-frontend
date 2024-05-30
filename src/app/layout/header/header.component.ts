import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../../service/authentication/authentication.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authenticationService = inject(AuthenticationService);
  title: string = "L.M.S.";
}
