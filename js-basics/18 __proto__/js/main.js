'use strict';

const person = { alive: true };
const musician = { plays: true };

// older and newer way to set the ancestor
// musician.__proto__ = person;
Object.setPrototypeOf(musician, person);

console.log(musician);

console.log(musician.__proto__);
console.log(Object.getPrototypeOf(musician)); 

console.log(musician.__proto__ === Object.getPrototypeOf(musician));
console.log(person === musician.__proto__);

const guitarist = { // legacy code
    instrument: 'guitar',
    __proto__: musician 
}
console.log(guitarist);

/// ------------------------------

const car = {
    doors: 4,
    seats: 'vinyl',
    get seatMaterial() {
        return this.seats;
    },
    set seatMaterial(material) {
        this.seats = material;
    }
};

car.sounds = () => console.log('wrooom!');

const smallCar = {};
Object.setPrototypeOf(smallCar, car);
smallCar.doors = 2; // doesn't affect ancestor
console.log(smallCar); // {doors: 2}
smallCar.sounds(); // wrooom!

const luxuryCar = {};
Object.setPrototypeOf(luxuryCar, car);
luxuryCar.seatMaterial = 'leather';
console.log(luxuryCar); // {seats: 'leather'}
console.log(car); // {doors: 4, seats: 'vinyl'}

console.log(Object.keys(luxuryCar)); // ['seats']
for(let key in luxuryCar) {
    console.log(key); // seats // doors // seatMaterial
}
//// --------------------------------

// Object constructors
function Animal(species) { // yeah, this is object constructor.....
    this.species = species;
    this.eats = true;
}

Animal.prototype.walks = function() {
    return `A(n) ${this.species} is walking.`;
};

// Animal.talks = () => console.log('Grrrr'); // doesn't do a thing....
console.log(Animal);

const bear = new Animal('bear');
console.log(bear); // Animal {species: 'bear', eats: true}
console.log(bear.walks()); // A(n) bear is walking.

console.log(bear.__proto__); // {walks: ƒ, constructor: ƒ}
console.log(bear.__proto__ === Animal.prototype); // true

//-------------------------------------
// ES6 class inheritance

class Vehicle {
    constructor() {
        this.wheels = 4;
        this.motorized = true;
    }

    ready() { return 'Ready to go!'; }
}

class Motorcycle extends Vehicle {
    constructor() {
        super();
        this.wheels = 2;
    }

    wheelie() { return 'On one wheel now!' }
}

const bike = new Motorcycle();
console.log(bike);
for(let key in bike) console.log(key);
console.log(bike.ready());
console.log(bike.wheelie());

const truck = new Vehicle();
console.log(truck);
