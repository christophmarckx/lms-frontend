export interface Module {
  id: string;
  name: string;
  parentModule?: Module | null;
}
