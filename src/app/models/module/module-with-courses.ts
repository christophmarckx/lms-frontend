import {Course} from "../course/course";

export interface ModuleWithCourses {
  id: string;
  name: string;
  courses: Course[];
}
