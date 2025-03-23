import { Branch } from "./SalesOrders/Branches";

export interface User {
    userName: string;
    password: string;
    role: string;
    token: string;
    branches?: { $values: Branch[] };
  }