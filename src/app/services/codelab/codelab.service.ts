import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateCodelab} from "../../models/codelab/create-codelab";
import {environment} from "../../../environments/environment";
import {Codelab} from "../../models/codelab/codelab";

@Injectable({
  providedIn: 'root'
})
export class CodelabService {
  http: HttpClient = inject(HttpClient);
  urlString: string = `${environment.backendUrl}/codelabs`;

  createCodelab(createCodelab: CreateCodelab): Observable<CreateCodelab> {
    return this.http.post<CreateCodelab>(this.urlString, createCodelab);
  }

  getCodelab(codelabId: string): Observable<Codelab> {
    return this.http.get<Codelab>(this.urlString + '/' + codelabId);
  }

  getAllCodelabs() {
    return this.http.get<Codelab[]>(this.urlString);
  }
}
