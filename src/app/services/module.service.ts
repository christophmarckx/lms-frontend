import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Module} from "../models/module";
import {CreateModule} from "../models/CreateModule";

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

  createModule(createModule : any) : Observable<any> {
    console.log(createModule)
    return this.http.post(this.urlString, createModule);
  }

}
