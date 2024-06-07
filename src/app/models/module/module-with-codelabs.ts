import {Codelab} from "../codelab/codelab";

export interface ModuleWithCodelabs {
  id: string,
  name: string,
  modules: ModuleWithCodelabs[],
  codelabs: Codelab[]
}
