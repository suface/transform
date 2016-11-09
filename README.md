 transform 函数支持如下
 
   properties json(css3 属性)  或者 string(css3动画名称)
   
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

 
 example：
 var that=document.getElementById("element");
 
json 类型
 var json={translate3d:'100px,10px,0',left:'1em',opacity:0.5,perspective:'400px', width:'200px', rotateY:'30deg'}

  transform(that,json);
  transform(that, json,'ease')
  transform(that, json,'ease',1000*i)
  transform(that, json,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)
                     
  transform(that, json,function(){ this.innerHTML='结束回调'+this.innerHTML;})
  transform(that, json,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)
                     
  transform(that, json,600) 
  transform(that, json,600,'ease')
  transform(that, json,600,1000*i) ;
  transform(that, json,600,function(){ this.innerHTML='结束回调'+this.innerHTML;}) ; 
  transform(that, json,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i) ;
                     
  transform(that, json,600,'ease',1000*i)
  transform(that, json,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;}) ;
  transform(that, json,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i) ;
  transform(that, json,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},-100*i) ; ////css3 transition-delay 支持负数 直接进入到时间点
  
  或者 string 类型
  @-webkit-keyframes keyframesName{
    0%{ -webkit-transform:translateX(0)}
    100%{-webkit-transform:translateX(180px); opacity: .3 }
} 
@keyframes keyframesName{
    0%{ transform:translateX(0)}
    100%{transform:translateX(180px) ;opacity: .3}
}

  var keyframes='keyframesName';
      transform(that, keyframes)
      transform(that, keyframes,'ease')
      transform(that, keyframes,'ease',1000*i)
      transform(that, keyframes,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)
                     
      transform(that, keyframes,function(){ this.innerHTML='结束回调'+this.innerHTML;})
      transform(that, keyframes,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i)
                     
      transform(that, keyframes,600) 
      transform(that, keyframes,600,ease')
      transform(that, keyframes,600,1000*i) ;
      transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;}) ; 
      transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},1000*i) ;
                     
      transform(that, keyframes,600,'ease',1000*i)
      transform(that, keyframes,600,'ease',function(){ this.innerHTML='结束回调'+this.innerHTML;}) ;
      transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},1020*i) ;
      transform(that, keyframes,600,function(){ this.innerHTML='结束回调'+this.innerHTML;},-20*i) ; //css3 animation-delay 支持负数 直接进入到时间点
