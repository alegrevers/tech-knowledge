class Prototype2 {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference2;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference2 {
  public prototype;

  constructor(prototype: Prototype2) {
      this.prototype = prototype;
  }
}

function clientCode() {
  const p1 = new Prototype2();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference2(p1);

  const p2 = p1.clone();

  if (p1.primitive === p2.primitive) {
      console.log('Primitive field values have been carried over to a clone. Yay!');
  } else {
      console.log('Primitive field values have not been copied. Booo!');
  }

  if (p1.component === p2.component) {
      console.log('Simple component has not been cloned. Booo!');
  } else {
      console.log('Simple component has been cloned. Yay!');
  }

  if (p1.circularReference === p2.circularReference) {
      console.log('Component with back reference has not been cloned. Booo!');
  } else {
      console.log('Component with back reference has been cloned. Yay!');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
      console.log('Component with back reference is linked to original object. Booo!');
  } else {
    // console.log("🚀 ~ file: prototype.ts ~ line 54 ~ p2.circularReference.prototype", p2.circularReference.prototype)
    // console.log("🚀 ~ file: prototype.ts ~ line 55 ~ p1.circularReference.prototype", p1.circularReference.prototype)
      console.log('Component with back reference is linked to the clone. Yay!');
  }
}

clientCode();