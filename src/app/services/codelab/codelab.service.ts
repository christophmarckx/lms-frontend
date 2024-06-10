import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateCodelab} from "../../models/codelab/create-codelab";
import {Codelab} from "../../models/codelab/codelab";
import {UpdateCodelab} from "../../models/codelab/update-codelab";
import {CodelabProgress} from "../../models/codelab/codelab-progress";
import {environment} from '../../../environments/environment';

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

  updateCodelab(codelabId: string, updateCodelab: UpdateCodelab): Observable<Codelab> {
    return this.http.put<Codelab>(this.urlString + '/' + codelabId, updateCodelab);
  }

  updateCodelabProgress(codelabId: string, codelabProgress: CodelabProgress): Observable<Codelab> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Codelab>(this.urlString + '/' + codelabId + '/progress', "\"" + codelabProgress + "\"", {headers});
  }
}
