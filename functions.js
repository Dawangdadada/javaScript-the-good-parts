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
}
try_it();
