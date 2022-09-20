interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilder1 implements Builder {
  // private product: Product1;
  // error TS2564: Property 'product' has no initializer and is not definitely assigned in the constructor.
  private product: any;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product1();
  }

  public producePartA(): void {
    this.product.parts.push('PartA1');
  }

  public producePartB(): void {
    this.product.parts.push('PartB1');
  }

  public producePartC(): void {
    this.product.parts.push('PartC1');
  }

  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result
  }
}

class Product1 {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}\n`)
  }
}

class Director {
  // private builder: Builder;
  // error TS2564: Property 'builder' has no initializer and is not definitely assigned in the constructor.
  private builder: any;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

function builderClientCode (director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder)

  console.log('Standard basic product');
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  console.log('Standard full featured product');
  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  console.log('Custom Product');
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director()
builderClientCode(director)