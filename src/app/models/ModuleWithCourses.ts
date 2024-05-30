import {Course} from "./Course";

export interface ModuleWithCourses {
  id: string;
  name: string;
  courses: Course[];
}
