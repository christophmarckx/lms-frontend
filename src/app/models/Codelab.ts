import {Module} from "./Module";

export interface Codelab {
  id: string,
  name: string,
  description: string,
  module: Module
}
