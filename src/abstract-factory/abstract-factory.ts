interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

interface AbstractProductA {
  useFullfunctionA(): string;
}

class ConcreteProductA1 implements AbstractProductA {
  public useFullfunctionA(): string {
    return 'The result of the product A1.';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public useFullfunctionA(): string {
    return 'The result of the product A2.';
  }
}

interface AbstractProductB {
  usefullFunctionB(): string;

  anotherUsefullFunctionB(collaborator: AbstractProductA): string
}

class ConcreteProductB1 implements AbstractProductB {
  public usefullFunctionB(): string {
    return 'The result of the product B1.';
  }

  public anotherUsefullFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.useFullfunctionA()
    return `The result of the B1 collaborating with the (${result})`
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public usefullFunctionB(): string {
    return 'The result of the product B2.';
  }

  public anotherUsefullFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.useFullfunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

function clientCode (factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefullFunctionB())
  console.log(productB.anotherUsefullFunctionB(productA))
}

console.log('Client: testing client code with the first factory type...')
clientCode(new ConcreteFactory1())

console.log('Client: testing client code with the second factory type...')
clientCode(new ConcreteFactory2())
