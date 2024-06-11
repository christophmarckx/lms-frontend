import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {UserRole} from "../models/authentication/authenticated-user";
import {firstValueFrom} from "rxjs";

export const coachGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);

  return authenticationService.getTokenAsPromise()
    .then(token => {
      if (token) {
        return authenticationService.getAuthenticatedUser()?.role === UserRole.COACH
      }
      return false;
    })
    .catch((error) => {
      return authenticationService.loginUser(state.url)
        .then(() => authenticationService.getAuthenticatedUser()?.role === UserRole.COACH);
    });
};
