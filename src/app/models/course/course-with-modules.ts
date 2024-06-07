import {ModuleWithCodelabs} from "../module/module-with-codelabs";

export interface CourseWithModules {
  id: string,
  name: string,
  description: string,
  modules: ModuleWithCodelabs[];
}
