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

