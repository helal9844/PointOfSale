import { Cashier } from "../Cashier";
import { OrderLine } from "./OrderLine";

export interface OrderHeader {
    sessionId: number;
    session?:Cashier;
    orderDate: Date;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    orderLines: OrderLine[];
  }