import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {UserRole} from "../models/authentication/authenticated-user";

export const coachGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  return authenticationService.getTokenAsPromise()
    .then(token => {
      return token.role === UserRole.COACH
    })
    .catch((error) => {
      return authenticationService.loginUser(state.url)
        .then(() => true);
    });
};
