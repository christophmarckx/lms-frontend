import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Codelab} from "../models/Codelab";
import {Observable} from "rxjs";
import {CreateCodelab} from "../models/CreateCodelab";

@Injectable({
  providedIn: 'root'
})
export class CodelabService {
  http: HttpClient = inject(HttpClient);
  urlString: string = `${environment.backendUrl}/codelabs`;

  createCodelab(createCodelab: CreateCodelab): Observable<CreateCodelab> {
    return this.http.post<CreateCodelab>(this.urlString, createCodelab);
  }
}
