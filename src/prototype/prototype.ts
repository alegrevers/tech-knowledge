class Prototype { 
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    clone.circularReference = {
      ...this.circularReference,
      prototye: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();

  if (p1.primitive === p2.primitive) {
    console.log('Primitive field values have been carried over to a clone. Yay!');
  } else {
    console.log('Primitive field values have not been copied. Boo!');
  }

  if (p1.component === p2.component) {
    console.log('Simple component has not been cloned. Booo!');
  } else {
    console.log('Simple component has been cloned. Yay!');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('Component with back reference has not been cloned. Boo!');
  } else {
    console.log('Component with back reference has been cloned. Yay!');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    // console.log("🚀 ~ file: prototype.ts ~ line 54 ~ p2.circularReference.prototype", p2.circularReference.prototype)
    // console.log("🚀 ~ file: prototype.ts ~ line 55 ~ p1.circularReference.prototype", p1.circularReference.prototype)
    console.log('Component with back reference is linked to original object. Booo!');
  } else {
    console.log('Component with back reference is linked to the clone. Yay!');
  }
}

clientCode();

// 🚀 ~ file: prototype.ts ~ line 54 ~ p2.circularReference.prototype {
//   primitive: 245,
//   component: 2022-10-19T00:52:46.834Z,
//   circularReference: ComponentWithBackReference {
//     prototype: Prototype {
//       primitive: 245,
//       component: 2022-10-19T00:52:46.834Z,
//       circularReference: [Circular]
//     }
//   }
// }
// 🚀 ~ file: prototype.ts ~ line 55 ~ p1.circularReference.prototype Prototype {
//   primitive: 245,
//   component: 2022-10-19T00:52:46.834Z,
//   circularReference: ComponentWithBackReference { prototype: [Circular] }
// }

