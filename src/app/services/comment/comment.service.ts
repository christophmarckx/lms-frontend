import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateComment} from "../../models/comment/create-comment";
import {Comment} from "../../models/comment/comment";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  urlString: string = `${environment.backendUrl}/codelabs`;
  http: HttpClient = inject(HttpClient);

  createCodelabComment(createComment: CreateComment, idCodeLab: string) : Observable<Comment> {
    return this.http.post<Comment>(`${this.urlString}/${idCodeLab}/comments`, createComment);
  }
}
