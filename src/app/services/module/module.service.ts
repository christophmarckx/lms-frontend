import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Module} from "../../models/Module";
import {CreateModule} from "../../models/CreateModule";
import {ModuleWithCourses} from "../../models/ModuleWithCourses";

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

  getModuleById(moduleId: string): Observable<ModuleWithCourses> {
    return this.http.get<ModuleWithCourses>(this.urlString + "/" + moduleId);
  }

  createModule(createModule : any) : Observable<any> {
    return this.http.post(this.urlString, createModule);
  }

}
