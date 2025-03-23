export interface Cashier {
    cashierUser: string;
    startTime: Date;
    endTime?: Date | null;
    isActive: boolean;
    sessionTotal: number;
  }
  