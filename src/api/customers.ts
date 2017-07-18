import { Customer } from "../models/customer";

export class Customers {
  getAll() {
    return Promise.resolve([
      new Customer({ id: 1, name: "Giovanni" }),
      new Customer({ id: 2, name: "Victor" })
    ]);
  }
}