export class Customer {
  constructor(opt: { id: number, name: string }) {
    this.id = opt.id;
    this.name = opt.name;
  }
  public id: number;
  public name: string;
  toString() {
    return `{ id: ${this.id}, name: ${this.name} }`;
  }
  isValid() {
    return this.id % 2 === 0;
  }
}