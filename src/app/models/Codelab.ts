import {Module} from "./module"
export interface Codelab {
  id: string,
  name: string,
  description: string,
  module: Module
}
