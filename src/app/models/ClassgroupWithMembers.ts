import {Classgroup} from "./Classgroup";
import {Student} from "../model/student/Student";
import {Course} from "./Course";
import {Coach} from "../model/coach/Coach";

export interface ClassgroupWithMembers {
  id: string;
  name: string;
  course: Course;
  students : Student[];
  coaches : Coach[]
}
