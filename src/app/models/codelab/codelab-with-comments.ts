import {Comment} from "../comment/comment";

export interface CodelabWithComments {
  id: string,
  name: string,
  description: string,
  comments: Comment[]
}
