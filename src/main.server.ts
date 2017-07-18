import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { Greeting } from './api/greeting';
import { Customers } from './api/customers';
import { enableProdMode } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toArray';
enableProdMode();
const app = express();
const port = 8000;
const baseUrl = `http://localhost:${port}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static('dist', { index: false }));

app.get('/api/greeting', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  const greeting = new Greeting();
  res.json(greeting.get());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.get('/api/customers', async (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  const customers = await new Customers().getAll();
  res.json(customers);
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.get('*', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.render('../dist/index', { req, res });
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(8000, () => {
  console.log(`Listening at ${baseUrl}`);
});