const { ConcreteFactory1, AbstractFactory } = require("../abstract-factory/abstract-factory")

describe('Abstract Factory Test', () => {
  test('Concrete Factory', async () => {
    // clientCode(new ConcreteFactory1())
    
    // expect(1)
    const factory = AbstractFactory

    function clientCode (factory) {
      const productA = AbstractFactory.createProductA();
      const productB = AbstractFactory.createProductB();
    
      console.log(productB.usefullFunctionB())
      console.log(productB.anotherUsefullFunctionB(productA))
    }
  })
})