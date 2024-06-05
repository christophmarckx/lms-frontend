import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CreateClassgroup} from "../../models/CreateClassgroup";
import {Classgroup} from "../../models/Classgroup";
import {ClassgroupWithMembers} from "../../models/ClassgroupWithMembers";

@Injectable({
  providedIn: 'root'
})
export class ClassgroupService {

  private urlString: string;

  constructor(private http: HttpClient) {
    this.urlString = `${environment.backendUrl}/classgroups`
  }

  addClassgroup(classgroup: CreateClassgroup): Observable<CreateClassgroup> {
    return this.http.post<CreateClassgroup>(this.urlString, classgroup);
  }

  getClassgroup(id : string) : Observable<ClassgroupWithMembers> {
    return this.http.get<ClassgroupWithMembers>(this.urlString + '/' + id)
  }

  getAllClassgroupsForUserId(userId: string) {
    return this.http.get<Classgroup[]>(this.urlString + '?userId=' + userId)
  }
}
