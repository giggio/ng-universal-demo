import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from "../../services/customer.service";
import { Customer } from "../../models/customer";

@Component({
  selector: 'customers-view',
  template: `<h3>Customers: {{customers | async}}</h3>`
})
export class CustomersView implements OnInit {
  public customers: Promise<Customer[]>;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customers = this.customerService.get();
  }
}