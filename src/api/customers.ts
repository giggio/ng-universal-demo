import { Customer } from "../models/customer";
import { from } from 'rxjs/observable/from';

export class Customers {
  getAll() {
    return from([
      new Customer({ id: 1, name: "Giovanni" }),
      new Customer({ id: 2, name: "Victor" })
    ]);
  }
}