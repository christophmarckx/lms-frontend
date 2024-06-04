import { CanActivateFn } from '@angular/router';
import {AuthenticationService} from "../services/authentication/authentication.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  console.log("ici");
  return authenticationService.getTokenAsPromise()
    .then(token => {
      return !!token
    })
    .catch((error) => {
      return authenticationService.loginUser(state.url)
        .then(() => true);
    });
};
