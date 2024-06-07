import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateCodelab} from "../../models/codelab/create-codelab";
import {environment} from "../../../environment/environment";
import {Codelab} from "../../models/codelab/codelab";
import {CodelabProgress} from "../../models/codelab/codelab-progress";

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

  updateCodelab(codelabId: string, codelabProgress: CodelabProgress): Observable<Codelab> {
    console.log(codelabProgress)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(this.http.put<Codelab>(this.urlString + '/' + codelabId + '/progress', codelabProgress, {headers}));
    return this.http.put<Codelab>(this.urlString + '/' + codelabId + '/progress', "\"" + codelabProgress + "\"", {headers});
  }
}
