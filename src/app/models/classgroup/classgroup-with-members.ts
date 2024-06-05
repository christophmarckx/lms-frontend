import {Student} from "../student/student";
import {Coach} from "../coach/coach";
import {Course} from "../course/course";

export interface ClassgroupWithMembers {
  id: string;
  name: string;
  course: Course;
  students : Student[];
  coaches : Coach[]
}
