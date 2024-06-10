import {Student} from "./student";

export interface StudentWithProgress {
  student: Student,
  actualProgression: number,
  totalProgression: number
}
