function sayMessage(m){
  console.log(arguments.length);// prints number of arguments passed
}
console.log(sayMessage.length); // functionName.length => number of arguments it accepts

sayMessage(1, 2, 3)

var p = {
  name: "Nicholas",
  sayName: function(){
    console.log(p.name); // tight coupling bw method and object. Won't be able to use other object
  }
}

function sayNameForAll(){
  console.log(this.name);
}

var p1 = {
  name: "Nicholas",
  sayName: sayNameForAll
};

var p2 = {
  name: "Greg",
  sayName: sayNameForAll  
}

var name = "Micheal"; // window object
p1.sayName(); // inside sayNameForAll, this is set to p1
p2.sayName(); // inside sayNameForAll, this is set to p2
sayNameForAll(); // inside sayNameForAll, this is set to window


// using call, allows us to manipulate the value of this when calling a function
// first parameter is the object to which this has to be set to
// subsequent arguments are arguments for function.

function saySomething(msg){
  console.log(msg + ": " + this.name)
};
var person1 = {
  name: "Nick"
};
var person2 = {
  name: "Greg"
}
var name = "Micheal"; // defined on global object
saySomething.call(person1, "hello"); // set this to person1
saySomething.call(person2, "msg2"); // set this to person2
saySomething.call(this, "global"); // set this to global 


// apply is same as call. except that it accepts an array of arguments as second argument.
var person3 = {
  name: "Sam"
}
saySomething.apply(person3, ['using apply person3'])

// detect properties
var person = {
  age: 12
}
if ("age" in person){
  // do something
}

if (person.hasOwnProperty("name")){
  // do something
}
// wrong way to detect properties
if (person.age){
  // only executes if person.age is truthy. which is not what you wanted
}

// delete property
var icecream = {
  name: 'butterscotch'
}
console.log("name in icecream: " + icecream.name)
console.log("is name present in icecream " + ("name" in icecream))

delete icecream.name
console.log("after deleting name in icecream..")
console.log("is name present in icecream " + icecream.hasOwnProperty("name"))


//i can add attribute any time
var obj1 = {
  attr1: "value1"
};

obj1.attr2 = "value2"

// to prevent enumeration. to prevent the property showing up when using for in loop
var man = {
  id: 12
}
console.log("is id enumerable " + man.propertyIsEnumerable("id"))

// make id non-enumerable
Object.defineProperty(man, "id", {
  enumerable: false
})
console.log("is id enumerable " + man.propertyIsEnumerable("id"))

// prevent deleting id
Object.defineProperty(man, "id", {
  configurable: false
})

delete man.id
console.log("does id exist " + man.hasOwnProperty("id"))

man.id = 666
console.log("man's id " + man.id)

// make property readonly
Object.defineProperty(man, "id", {
  writable: false
})

man.id = 1234
console.log("man's id is unchanged: " + man.id)


// by default writable, enumerable, configurable is true
var vacation = {
  name: 'honduras'
}
v = Object.getOwnPropertyDescriptor(vacation, 'name')
console.log(v)

// if you call Object.defineProperty writable, enumerable, configurable will be set to false, unless you specify otherwise
var readOnlyVacation = {};

Object.defineProperty(readOnlyVacation, 'name', {
  value: 'Honduras',
  configurable: true
})


console.log("after calling defineProperty ")
console.log(vacation.propertyIsEnumerable('name'))
v1 = Object.getOwnPropertyDescriptor(readOnlyVacation, 'name')
console.log(v1)

// once you set configurable = false, you CANNOT set it to true 
var obj1 = {
  _prop : "default",
  
  get prop(){
    return this._prop;
  }
}
obj1._prop = "random"


// setting read-onley property
var pers = {
  _name: "Nicholas tzovasky"
};

Object.defineProperty(pers, "name", {
  get: function(){
    console.log("reading name");
    return this._name;
  }
})

pers.name = "lo"
console.log(pers.name)

// prevent adding new properties
var closedObject = {
  desc: "I am a closed object. cannot add new properties"
}

Object.preventExtensions(closedObject);
closedObject.prop = "cannot assign this"
console.log("is prop in closedObject " + ("prop" in closedObject))


// if you seal an object you cannot add new properties, you cannot remove properties
// you can only read from and write to it.
var sealedObject = {
  name: "sealed object"
}
Object.seal(sealedObject)

// if you freeze an object you cannot add new properties, you cannot remove properteis
// you cannot write into properties. its a readonly locked pobject

var frozenObject = {
  name: "frozen object"
};
Object.freeze(frozenObject)


// constructor is a function that begins with capital letter
function Constructor(){
  
}

var obj = new Constructor();

// if you dont use new value of this inside the constructor will
// be the global this object. wihtout new Person is just a function
// without  return statment

// own property is given higher preference than the same property defined
// on the prototype


// read prototype chapter from 'principles of oop'