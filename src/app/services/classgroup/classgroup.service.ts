import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CreateClassgroup} from "../../models/CreateClassgroup";

@Injectable({
  providedIn: 'root'
})
export class ClassgroupService {

  private urlString: string;

  constructor(private http: HttpClient) {
    this.urlString = `${environment.backendUrl}/classgroups`
  }

  addClassgroup(classgroup: CreateClassgroup): Observable<any> {
    return this.http.post(this.urlString, classgroup);
  }
}
