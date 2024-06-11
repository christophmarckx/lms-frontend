import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../../models/module/module";
import {ModuleWithCourses} from "../../models/module/module-with-courses";
import {ModuleHierarchy} from "../../models/module/module-hierarchy";
import {environment} from '../../../environments/environment.development';

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

  getModuleHierarchy(): Observable<ModuleHierarchy[]> {
    return this.http.get<ModuleHierarchy[]>(this.urlString + "/hierarchy");
  }

  getModuleById(moduleId: string): Observable<ModuleWithCourses> {
    return this.http.get<ModuleWithCourses>(this.urlString + "/" + moduleId);
  }

  createModule(createModule : any) : Observable<any> {
    return this.http.post(this.urlString, createModule);
  }

}
