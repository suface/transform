

  transform<h1\><br />  
===================================  
  
 移动端轻量动画函数 <h2\><br />  
-----------------------------------  

    
### 参数说明  <h3\><br /> 

    
###  properties json(css3 属性)  或者 string(css3动画名称)<br /> 
 
/*properties json(css3 属性)  或者 string(css3动画名称)
* transform(elem, properties)
* transform(elem, properties, ease)
* transform(elem, properties, ease, delay)
* transform(elem, properties, ease, callback, delay)
* transform(elem, properties, callback)
* transform(elem, properties, callback, delay)
* transform(elem, properties, duration )
* transform(elem, properties, duration, ease)
* transform(elem, properties, duration, delay)
* transform(elem, properties, duration, callback)
* transform(elem, properties, duration, callback,delay)  
* transform(elem, properties, duration, ease, delay)
* transform(elem, properties, duration, ease, callback)  
* transform(elem, properties, duration, ease, callback,delay)
 */ 
<br /> 
  
### example：
  <h4\><br /> 
     var that=document.getElementById("element");
<br /> 

###  var i=10;
 properties为 json 类型 <h2\><br /> 
    var json={translate3d:'100px,10px,0',left:'1em',opacity:0.5,perspective:'400px', width:'200px', rotateY:'30deg'}

  

  transform(that,json);<br /> 
  transform(that, json,'ease')<br /> 
  transform(that, json,'ease',1000*i)<br /> 
  transform(that, json,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)<br /> 
  
  transform(that, json,function(){ this.innerHTML='结束回调'+this.innerHTML;})<br /> 
  transform(that, json,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)<br /> 
  
  transform(that, json,600) <br /> 
  transform(that, json,600,'ease')<br /> 
  transform(that, json,600,1000*i) ;<br /> 
  transform(that, json,600,function(){ this.innerHTML='结束回调'+this.innerHTML;}) ; <br /> 
  transform(that, json,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i) ;<br /> 
  
  transform(that, json,600,'ease',1000*i)<br /> 
  transform(that, json,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;}) ;<br /> 
  transform(that, json,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i) ;<br /> 
  transform(that, json,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},-100*i) ; ////css3 transition-delay 支持负数 直接进入到时间点
  
<br /> <br /> 

###  properties为 keyframes <h2\><br /> 

@-webkit-keyframes keyframesName{<br /> 
    0%{ -webkit-transform:translateX(0)}<br /> 
    100%{-webkit-transform:translateX(180px); opacity: .3 }<br /> 
} <br /> 
@keyframes keyframesName{<br /> 
    0%{ transform:translateX(0)} <br /> 
    100%{transform:translateX(180px) ;opacity: .3}<br /> 
}
<br /> 

	var keyframes='keyframesName'; <br /> 
	transform(that, keyframes)<br /> 
	transform(that, keyframes,'ease')<br /> 
	transform(that, keyframes,'ease',1000*i)<br /> 
	transform(that, keyframes,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)<br /> 
	
	transform(that, keyframes,function(){ this.innerHTML='结束回调'+this.innerHTML;})<br /> 
	transform(that, keyframes,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)<br /> 
	
	transform(that, keyframes,600) <br /> 
	transform(that, keyframes,600,ease')<br /> 
	transform(that, keyframes,600,1000*i) ;<br /> 
	transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;}) ; <br /> 
	transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i) ;<br /> 
	
	transform(that, keyframes,600,'ease',1000*i)<br /> 
	transform(that, keyframes,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;}) ;<br /> 
	transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},1020*i) ;<br /> 
	transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},-20*i) ; //css3 animation-delay 支持负数 直接进入到时间点
<br /> 

