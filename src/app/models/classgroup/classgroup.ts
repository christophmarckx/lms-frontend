import {Course} from "../course/course";

export interface Classgroup {
  id: string;
  name: string;
  course: Course;
}
