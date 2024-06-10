import {Student} from "../student/student";

export interface Comment {
  id: string,
  codelabId: string,
  comment: string,
  student: Student
}
