import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Classgroup} from "../../models/classgroup/classgroup";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlString: string = `${environment.backendUrl}/users`;
  private readonly http: HttpClient = inject(HttpClient);

  getAllClassgroupsForUserId(userId: string) {
    return this.http.get<Classgroup[]>(this.urlString + '/' + userId + '/classgroups');
  }
}
