import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Coach} from "../../models/coach/coach";

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  http = inject(HttpClient);
  ulrString: string;
  authenticationService = inject(AuthenticationService);
  constructor() {
    this.ulrString = `${environment.backendUrl}/coaches`;
  }

  getAllCoaches(): Observable<Coach[]> {
    return this.http.get<Coach[]>(this.ulrString);
  }
}
