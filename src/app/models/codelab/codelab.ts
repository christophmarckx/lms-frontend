import {Module} from "../module/module";
import {CodelabProgress} from "./codelab-progress";

export interface Codelab {
  id: string,
  name: string,
  description: string,
  module: Module,
  progress: CodelabProgress
}
