import { Customer } from "../models/customer";
import { of } from 'rxjs/observable/of';

export class Customers {
  getAll() {
    return of([
      new Customer({ id: 1, name: "Giovanni" }),
      new Customer({ id: 2, name: "Victor" })
    ]);
  }
}