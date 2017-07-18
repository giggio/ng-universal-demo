import { Headers, Http } from '@angular/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TransferState } from "../../modules/transfer-state/transfer-state";
import { Customer } from "../../models/customer";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toArray';

@Injectable()
export class CustomerService {
  constructor( @Inject(PLATFORM_ID) private platformId: Object, private http: Http, protected transferState: TransferState) {
  }

  async get() {
    let customers: Customer[];
    if (isPlatformBrowser(this.platformId)) {
      let customersObjects = <any[]>this.transferState.get('customers');
      if (customersObjects) return customersObjects.map(c => new Customer(c));
      customers = await this.http.get('http://localhost:8000/api/customers')
        .map(data => (<Array<any>>data.json()).map(c => new Customer(c)))
        .toPromise();
    } else if (isPlatformServer(this.platformId)) {
      const { Customers } = await import("../../api/customers");
      customers = await new Customers().getAll();
    }
    this.transferState.set('customers', customers);
    return customers;
  }
}