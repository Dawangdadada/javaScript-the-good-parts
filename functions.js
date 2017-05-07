/*函数,函数名通常是以动词为前缀的词组，通常函数的第一个字符为小写，像like_this()或者likeThis()*/

//1.函数调用,除了声明时定义的参数，还有this和arguments。
//方法调用模式
  var myobject={
  value:0,
  increment:function(inc){
  this.value+=typeof inc==="number"? inc:1;
  }
  };
  myobject.increment(2);
  console.log(myobject.value);//2
//2.函数调用模式(当一个函数并非一个对象的属性时,那么它就是被当做一个函数调用)
function add(a,b){
	return a+b;
}
var sum=add(2,4);
console.log(sum);
//以此模式调用函数时，通常不使用this关键字,不过"this"可以用来判断当前是否是严格模式,调用上下文是全局对象,然而在严格模式下是undefined;
 var strict=(function(){ return !this;}());
   myobject.double=function(){
   var that=this;
   var helper=function(){
   that.value=add(that.value,that.value);
   };
   helper();
   };
   myobject.double();
   console.log(myobject.value);
   //3.构造函数调用,如果在一个函数前面带上new来调用，那么背地里会创建一个连接到该函数的prototype成员的新对象,同时this会被绑定到那个新对象 
   //下面两个是一样的
   var o=new Object();
   var o=new Object;
   //创建一个名为Quo的构造器函数
   var Quo=function(string){
    this.status=string;
   };
   //给Quo的所有实例提供一个名为get_status的公共方法
   Quo.prototype.get_status=function(){
      return this.status;
   }
   //构造一个Quo实例。
   var myQuo=new Quo("confused");
   console.log(myQuo.get_status());//confused

//4.间接调用call()和apply();使任何函数都可以作为对象来用,apply接受2个参数，第一个是要绑定给this的值，第2个就是一个参数数组

//构造一个包含两个数字的数组，并将它们相加
var array=[3,4];
var sum=add.apply(null,array);
console.log(sum);
var statusObject={
  status:'A-OK'
};
//statusObject并没有继承自Quo.prototype但我们可以在statusObject上调
//用get_status方法，尽管statusObject并没有一个名为get_status的方法
var status=Quo.prototype.get_status.apply(statusObject);
console.log(status);

/*参数，当调用函数时传入的实参比函数声明时指定的形参个数要少，剩下的形参都将设置为undefined*/
 
 var o={
  add:1,
  bbb:'ok'
 };
 function getPropertyNames(o,/*option*/ a){
   a=a||[];
  for(var property in o)
    a.push(property);
  return a;
 }
 var value=getPropertyNames(o);
 console.log(a);
//arguments类数组
var sum=function(){
  var i=0,sum=0;
  for(i=0;i<arguments.length;i++)
    sum+=arguments[i];
  return sum;
}
console.log(sum(4,5,6,7));
//异常
var add=function(a,b){
  if(typeof a!=='number'||typeof b!=='number'){
    throw{
      name:'TypeError',
      message:'add needs number'

    };
  }
    return a+b;
}
//构造一个try_it函数，以不正确的方式调用之前的add函数
var try_it=function(){
  try{
    add("seven");
  }catch(e){
     console.log(e.name+'; '+e.message);
}
try_it();
//作为值的函数也就是不仅可以像传递参数一样把一个函数传递给另一个函数，
//而且可以将一个函数传递作为另一个函数的结果返回
function callSomeFunction(someFunction,someArgument){
      return someFunction(someArgument);
}
function add10(num){
  return num+10;
}
var result=callSomeFunction(add10,10);
alert(result);//20
//从一个函数中返回另外一个函数
function createComparisonFunction(prototyName){
  return function(object1,object2){
    var value1=object1[prototyName];
    var value2=object2[prototyName];
    if(value1<value2)
      return -1;
    else if(value1>value2)
      return 1;
    else 
      return 0;
  };
};
var data=[{name:"Zachaary",age:28},{name:"Nicholas",age:29}];
data.sort(createComparisonFunction("name"));
alert(data[0].name);
data.sort(createComparisonFunction("age"));
alert(data[0].name);

var a=[33,4,1111,222];
a.sort(function(a,b){return a-b;});//从小到大
console.log(a)
a.sort(function(a,b){return b-a;});//从大到小
//扩充类型的功能
Function.prototype.method=function(name,func){
  this.prototype[name]=func;
  return this;
}
Number.method('integer',function(){
  return Math[this]
})
//函数是对象，函数名是指针
function sum(num1,num2){
  return num1+num2;
}
alert(sum(10,10));
var anotherSum=sum;//使用不带括号的函数名是访问函数指针,而非调用函数
alert(anotherSum(10,10));
sum=null;
alert(anotherSum(10,10));
//没有重载
function addSomeNumber(num){
  return num+100;
}
function addSomeNumber(num){
  return num+200;
}
var result=addSomeNumber(100);
console.log(result);//300
//同名函数,等价于下面
var addSomeNumber=function(num){
  return num+100;
}
var addSomeNumber=function(num){
  return num+200;
}
/*函数内部属性(arguments和this),arguments对象有一个名叫callee的属性，该属性是一个指针
指向拥有这个arguments对象的函数
阶乘函数*/
function factorial(num){
  if(num<=1)
    return 1;
  else
    return num*factorial(num-1);
}
function factorial(num){
  if(num<=1)
    return 1;
  else
    return num*arguments.callee(num-1);
}
var trueFactorial=factorial;
factorial=function(){
  return 0;
}
alert(trueFactorial(5));//120
alert(factorial(5));//0
//函数的属性与方法(length:表示函数希望接收的参数和prototype)
//bind()方法:这个方法会创建一个函数的实例,其this值会被绑定到传给bind()函数的值
var color="red";
var o={ color:"blue"};
function saycolor() {
  alert(this.color);
}
var objectSayColor=saycolor.bind(o);
objectSayColor();//blue
//递归
/*在严格模式下，不能通过脚本访问arguments.callee,访问这个属性会导致错误。
不过可以使用命名函数表达式达成相同的结果*/
var factorial=(function f(num){
  if(num<=1)
    return 1;
  else
    return num*f(num-1);
});
alert(factorial(5));
/*闭包：指有权访问另一个函数作用域中的变量的函数。创建闭包的一个常见方式，
就是在一个函数内部创建另一个函数*/

function createComparisonFunction(prototyName){
  return function(object1,object2){
    var value1=object1[prototyName];
    var value2=object2[prototyName];
    if(value1<value2)
      return -1;
    else if(value1>value2)
      return 1;
    else 
      return 0;
  };
};

/*先理解一下作用域链。此外在局部作用域中定义的变量可以在局部环境中与全局
变量互换使用*/
var color='blue';
function changeColor(){
  if(color==='blue')
    color='red';
  else
    color='blue';
}
changeColor();
alert('color is now'+color);//red;
/*无论什么时候在函数访问一个变量时，就会从作用域链中搜索具有相应名字的变量。
一般来讲，当函数执行完毕后，局部对象就会被销毁，内存中仅保存全局对象作用域
(全局执行环境的变量对象),但是闭包的情况又有所不同。
/*闭包与变量：闭包只能取得包含函数中任何变量的最后一个值。闭包所保存的是整个变量对象而不是
某个特殊的值*/
function createFunctions(){
  var result=new.Array();
  for(var i=0;i<10;i++){
    result[i]=function(){
      return i;
    }
    return result;
  }
}
var result=createFunctions();
console.log(result[0]);
