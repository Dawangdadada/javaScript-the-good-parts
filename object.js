//面对对象的程序设计
//理解对象
//创建对象
//工厂模式
//原型模式
function Person(){};
Person.prototype.name="Nicholas";
Person.prototype.age="29";
Person.prototype.job="Soft Engineer";
Person.prototype.sayName=function(){
	alert(this.name);
};
var person1=new Person();
person1.sayName();
var person2=new Person();
person2.sayName();
alert(person1.sayName==person2.sayName);//true
//prototype constructor [[Prototype]](__proto__)三者之间的关系
/*虽然无法访问到[[Prototype]],但是可以通过isPrototypeOf()方法来确定对象之间
是否存在这种关系*/
alert(Person.Prototype.isPrototypeOf(person1));//
alert(Person.Prototype.isPrototypeOf(person2));//
//Uncaught TypeError: Cannot read property 'isPrototypeOf' of undefined
    //at <anonymous>:11:23
    alert(object.getPrototypeOf(person1));

person1.name="Greg";
alert(person1.name);//Greg,来自实例
alert(person1.hasOwnProperty("name"));
delete person1.name;
alert(person1.hasOwnProperty("name"));
alert(person1.name)//Nicholas,来自原型
alert(person2.name);//Nicholas,来自原型
function hasPrototypeProperty(object,name){
	return !object.hasOwnProperty(name)&&(name in object);
}

//使用delete操作符可以完全删除实例属性,从而访问到原型中的属性
//hasOwnProperty()可以检测一个属性是存在于实例中还是存在于原型中
//原型链
function SuperType(){
	this.property=true;
};
SuperType.Prototype.getSuperValue=function(){
	return this.property;
};
function Subtype(){
	this.subproperty=false;
}
//继承了SuperType
Subtype.Prototype=new SuperType();
//object.keys()(对象所有可枚举的实例属性)和object.getOwnPropertyNames()(所有的实例属性)
function Person(){

};
Person.prototype.name="Nicholas";
Person.prototype.age=29;
Person.prototype.job="Software Engineer";
Person.prototype.sayName=function(){
	alert(this.name);
}
var p=new Person();
p.family="father";
var pkeys=Object.keys(p);
alert(pkeys);//family
var pKeys=Object.getOwnPropertyNames(p);
alert(pkeys);//family,感觉很奇怪，既然都是实例本身的属性，为什么红宝书上说可以替代for-in
//更简单的原型语法
function Person(){
};
Person.prototype={
	name:"Nicholas",
	age:29,
	job:"Software Engineer",
	sayName:function(){
		alert(this.name);
	}
};
alert(Person.prototype.constructor==Person);//false
var friend=new Person();
alert(friend instanceof Object);//true
alert(friend instanceof Person);//true
alert(friend.constructor==Person);//false
alert(friend.constructor==Object);//true
//如果constructor的值真的很重要，可以像下面这样特意将它设置回适当的位置
function Person(){};
Person.prototype={
	constructor:Person,
	name:"Nicholas",
	age:29,
	job:'Software Engineer',
	sayName:function(){
		alert(this.name);
	}
}
//但是以这种方式重设constructor属性会导致它的[[Enumerable]]特性被设置为true.默认情况下,原生的construcor属性是不可枚举的，因此试试Object.defineProperty()
function Person(){};
Person.prototype={
	constructor:Person,
	name:"Nicholas",
	age:29,
	job:'Software Engineer',
	sayName:function(){
		alert(this.name);
	}
};
//重设构造函数,只适用于ECMAScript5兼容的浏览器
Object.defineProperty(Person.prototype,"constructor",{
	enumerable:false,
	value:Person
});
var keys=Object.keys(Person.prototype);
alert(keys);//name,age,job,sayName
//原型的动态性，实例中的指针仅指向原型，而不指向构造函数
function Person(){};
var friend=new Person();
Person.prototype.sayHi=function(){
	alert("Hi");
};
friend.sayHi();//Hi
//重写整个原型对象
function Person(){};
var friend=new Person();
Person.prototype={
	constructor:Person,
	name:'Nicholas',
	age:29,
	job:"Software Engineer",
	sayName:function(){
		alert(this.name);
	}
	
};
 friend.sayName();//VM104:13 Uncaught TypeError: friend.sayName is not a function
//原生对象的原型
//给基本包装类型String添加一个startsWith()的方法
String.prototype.startsWith=function(text){
	return this.indexOf(text)==0;
};
var msg="Hello world!";
alert(msg.startsWith("Hello"));
//原型对象的问题
function Person(){};
Person.prototype={
	constructor:Person,
	name:"Nicholas",
	age:29,
	job:"Software Engineer",
	friends:["shelby","court"],
	sayName:function(){
		alert(this.name);
	}

};
var person1=new Person();
var person2=new Person();
person1.friends.push("van");
alert(person1.friends);//shelby,court,van
alert(person2.friends);//shelby,court,van
alert(person1.friends==person2.friends);//true
//组合使用构造函数模式和原型模式
function Person(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
    this.friends=["shelby","court"];
}
Person.prototype={
	constructor:Person,
	sayName:function(){
		alert(this.name);
	}
}
var person1=new Person("Nicholas",29,"Software Engineer");
var person2=new Person("Greg",27,"Doctor");
person1.friends.push("Van");
alert(person1.friends);//shelby,court,Van
alert(person2.friends);//shelby,court
alert(person1.friends===person2.friends);//false
alert(person1.sayName===person2.sayName);//true
//动态原型模式，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型
function Person(name,age,job){
	this.name=name;
	this.age=age;
	this.job=job;
	//方法
	if(typeof this.sayName!="function"){
		Person.prototype.sayName=function(){
			alert(this.name);
		}
	}
}
var friend=new Person("Nicholas",29,"Software Engineer");
friend.sayName();//'Nicholas'
//寄生构造函数模式
function Person(name,age,job){
	var o=new Object();
	o.name=name;
	o.age=age;
	o.job=job;
	o.sayName=function(){
		alert(this.name);
	}
	return o;
}
Person.prototype.sayHi=function(){
	alert("Hi");
}
 var friend=new Person("Nicholas",29,"Software Engineer");
 friend.sayName();
 friend.sayHi();// VM1985:16 Uncaught TypeError:friend.sayHi is not a function
//创建一个具有额外方法的特殊数组
function SpecialArray(){
	var values=new Array();
	values.push.apply(values,arguments);
	values.toPipedString=function(){
		return this.join("|");
	};
	return values;
}  
var colors=new SpecialArray("red","blue","green");
alert(colors.toPipedString()); //red|blue|green
alert(colors instanceof SpecialArray);//false
/*稳妥构造函数模式
新创建的对象实例不引用this,二是不使用new操作符来调用构造函数*/
function Person(name,age,job){
	var o=new Object();
	//添加方法
	o.sayName=function(){
		alert(name);
	}
	return o;
}
  var friend=Person("Nicholas",29,"Doctor");
  friend.sayName();//Nicholas
  