import { Authority } from "./Authority.model";
import { Role } from "./Role.model";

export type User = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: Role[];
};
