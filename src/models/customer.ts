export class Customer {
  constructor(opt: { id: Number, name: string }) {
    this.id = opt.id;
    this.name = opt.name;
  }
  public id: Number;
  public name: string;
  toString() {
    return `{ id: ${this.id}, name: ${this.name} }`;
  }
}