import { Meta } from "./meta";

export type Attribute = {
  id: string;
  name: string;
  createdAt: string;
  labelIds: string[];
  deleted: boolean;
};

export type AttributesResponse = {
  data: Attribute[];
  meta: Meta;
};
