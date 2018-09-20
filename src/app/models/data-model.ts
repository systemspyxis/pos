export class Product {
  ProductID: String;
  ProductSize: String;
  ProductDescription: String;
  UnitType: String;
  BuyPrice: number;
  SellPrice: number;
  ProductCount: number;
}
export class User {
  UserID: String;
  UserName: String;
  FirstName: String;
  LastName: String;
  Email: String;
  Password: String;
}
export class OrderItem {
  Product: String;
  ProductID:String;
  Price: number;
  Quantity: number;
  Subtotal: number;
  BuyPrice: number;
  ProductCount: number;
}
export class PaymentMethod {
  name: string;
  amount: number;
  options: string[];
  disabled: boolean;
}
export class CustomerOrder {
  Items: OrderItem[];
  TotalItems: number;
  Discount: number;
  TotalPayable: number;
  PaymentMethods: PaymentMethod[];
  PaymetNote: string;
  CustomerId: string;
  OrderStatus: string;
  PaidStatus: string;
  TransactionRef: string;
  ServedBy: string;
  OrderID:string;
  OpenTime: Date;
  CloseTime: Date;
  Balance:number;
}
export class Sale {
  SaleID: string;
  ProductID: string;
  SellPrice: number;
  BuyPrice: number;
  Count: number;
  SellDate: Date;
}
export class UserDetails {
  UserNane: string;
  Email: string;
  Name: string;
  exp: number;
  iat: number;
}
export class TokenResponse{
  token:string;
}