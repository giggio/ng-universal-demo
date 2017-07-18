import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { Greeting } from "../../models/greeting";
import { CustomerService } from "../../services/customer.service";
import { Customer } from "../../models/customer";

@Component({
  selector: 'home-view',
  template: `<h3>{{subs | async}}</h3>
             <div>Customers: {{ip | async}}</div>`
})
export class HomeView implements OnInit {
  public ip: Promise<Customer[]>;
  public subs: Observable<Greeting>;

  constructor(private http: TransferHttp, private ipService: CustomerService) {}

  ngOnInit() {
    this.subs = this.http.get('http://localhost:8000/api/greeting').map(data => {
      return new Greeting(data);
    });
    this.ip = this.ipService.get();
  }
}