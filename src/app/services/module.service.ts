import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Module} from "../models/module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private urlString: string;

  constructor(private http: HttpClient) {
    this.urlString = `${environment.backendUrl}/modules`
  }

  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.urlString);
  }

}
