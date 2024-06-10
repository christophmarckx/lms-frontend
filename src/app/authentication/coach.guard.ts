import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication/authentication.service";
import {UserRole} from "../models/authentication/authenticated-user";
import {firstValueFrom} from "rxjs";

export const coachGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  return firstValueFrom(authenticationService.getAuthenticatedUserAsObservable())
    .then(user => user.role === UserRole.COACH)
    .catch(() => false)
};
