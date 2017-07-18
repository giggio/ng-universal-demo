export class Greeting {
  constructor(opt: any = {}) {
    this.name = opt.name;
    this.greeting = opt.greeting;
  }
  public greeting: string;
  public name: string;
  toString() {
    return `${this.greeting} ${this.name}`;
  }
}