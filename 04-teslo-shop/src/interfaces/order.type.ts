export interface Order {
  id: string;
  subTotal: number;
  tax: number;
  itemsInOrder: number;
  isPaid: boolean;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactionId: string | null;
  OrderAddress: {
    name: string;
    lastName: string;
  } | null;
}
