import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateComment} from "../models/create-comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  http: HttpClient = inject(HttpClient);

  createCodelabComment(createComment: CreateComment): void {
    console.log("implement me ", createComment.comment);
  }
}
