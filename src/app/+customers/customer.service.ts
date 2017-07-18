import { Headers } from '@angular/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferHttp } from "../../modules/transfer-http/transfer-http";
import { TransferState } from "../../modules/transfer-state/transfer-state";
import { Customer } from "../../models/customer";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toArray';

@Injectable()
export class CustomerService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: TransferHttp, protected transferState: TransferState) {
  }

  async get() {
    if (isPlatformBrowser(this.platformId)) {
      const customers = <any[]>this.transferState.get('customers');
      if (customers) return customers.map(c => new Customer(c));
      return this.http.get('http://localhost:8000/api/customers')
        .map((data: Array<Customer>) => data.map(c => new Customer(c)))
        .toPromise();
    } else if (isPlatformServer(this.platformId)) {
      const { Customers } = await import("../../api/customers");
      const customers = await new Customers().getAll().toArray().toPromise();
      this.transferState.set('customers', customers);
      return customers;
    }
  }
}