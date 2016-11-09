 
/* http://www.cnblogs.com/surfaces

   * @param properties 为 {} 或者 string ；如果 properties= string 为animation- name   
   
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

    //使用示例如下：
     transform(elem,{translateX:'150px',left:'1em',opacity:0.2,perspective:'400px', rotateY:'40deg'},600,'linear',
     function(){  console.log('transition结束回调') },200) ; 
     transform(elem, keyframesName,600,'linear',function(){  console.log('animation结束回调') },200) ; 
*/


;(function(window,document,undefined){
var prefix = function() {
  var div = document.createElement('div');//建立临时DIV容器
  var cssText = '-webkit-transition:all .1s;-moz-transition:all .1s; -Khtml-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
  div.style.cssText = cssText;
  var style = div.style;
  var dom='';
  if (style.webkitTransition) {
	  dom ='webkit';
  }else if (style.MozTransition) {
    dom='moz';
  }else  if (style.khtmlTransition) {
    dom='Khtml';
  }else  if (style.oTransition) {
    dom='o';
  }else  if (style.msTransition) {
    dom='ms';
  }
 
  div=null; ////去掉不必要的数据存储，便于垃圾回收 

  if(dom){////style.transition 情况
	  return {
		dom: dom,
		lowercase: dom,
		css: '-' + dom + '-',
		js: dom[0].toUpperCase() + dom.substr(1)
	  }; 
  }else{
	  return false
 }
}();
 

var transitionEnd = function() {
			var el = document.createElement("div");
			var transEndEventNames = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd",
				msTransition: "MSTransitionEnd",
				transition: "transitionend"
			};
			for (var name in transEndEventNames) {
				if (el.style[name] !== undefined) {
					return transEndEventNames[name]
				}
			}
			el = null;
			return false
		}();



// 动画结束事件名
    var animationEnd = (function() {
        var eleStyle = document.createElement('div').style;
        var verdors = ['a', 'webkitA', 'MozA', 'OA', 'msA'];
        var endEvents = ['animationend', 'webkitAnimationEnd', 'animationend', 'oAnimationEnd', 'MSAnimationEnd'];
        var animation;
        for (var i = 0, len = verdors.length; i < len; i++) {
            animation = verdors[i] + 'nimation';
            if (animation in eleStyle) {
                return endEvents[i];
            }
        }
        return 'animationend';
    }());


var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i; //变形检测

var dasherize=function (str) {  //将字符串格式化成-拼接的形式,一般用在样式属性上，比如border-width
    return str.replace(/::/g, '/') //将：：替换成/
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') //在大小写字符之间插入_,大写在前，比如AAAbb,得到AA_Abb
    .replace(/([a-z\d])([A-Z])/g, '$1_$2') //在大小写字符之间插入_,小写或数字在前，比如bbbAaa,得到bbb_Aaa
    .replace(/_/g, '-') //将_替换成-
    .toLowerCase(); //转成小写
  }




function transform(obj,properties, duration, ease, callback, delay){
	
	
	  if (!obj) {return;}
	  
	  
	//参数修正
	  
	  if( typeof duration == 'undefined' ){  //transform(obj,properties)
        duration =400;
        ease ='linear';
		callback=undefined;
		delay=undefined;
       }
    
    if( typeof duration == 'string' ){//transform(obj,properties,ease)   //transform(obj,properties,ease,delay)    //transform(obj,properties,ease,callback,delay) 
	
		if(typeof ease=='number'){
	    delay=ease;
		callback=undefined;
		}
        
		if(typeof ease=='function'){
		delay=callback;
	    callback=ease;
		}
		
	    ease = duration;
        duration = 400;	
    }
	else if(typeof duration == 'function'){//transform(obj,properties,callback)   //transform(obj,properties,callback,delay)
	    
	    if(typeof ease=='number'){
			delay=ease 
		}
        callback = duration;
        duration = 400;
        ease = 'linear';
    }
	else if(typeof duration == 'number'){//transform(obj,properties,duration)
        
		
		if(typeof ease == 'undefined'){//transform(obj,properties,duration)
            ease = 'linear';
        }
		
        else if(typeof ease == 'string'){//transform(obj,properties,duration,ease) 
		
            ease = ease;
        }
		
		else if(typeof ease == 'function'){  //transform(obj,properties,duration,callback)   
		   
			if(typeof callback == 'number'){//transform(obj,properties,duration,ease,delay)
			delay=callback;
		   }
			 
            callback = ease;
            ease = 'linear';
		
        }
		
		else if(typeof ease == 'number'){  //transform(obj,properties,duration,delay)
            delay = ease;
			ease = 'linear';
        }
		

		if(typeof callback == 'number'){//transform(obj,properties,duration,ease,delay)
			delay=callback;
			callback=undefined;

		}
    }
	
	//console.log(duration+'duration   '+ease+'  ease    '+callback+'  callback  '+delay+'delay')
	
      delay = (typeof delay == 'number') ? delay :0;   // delay 设置 delay:'none'也可以
	//参数修正
	
	var endEvent=transitionEnd;
	var nowTransition=prefix.js+'Transition';
	var nowTransform=prefix.js+'Transform';
	var prefixcss=prefix.css;
	if(!prefix.js){
		nowTransition='transition';
	    nowTransform='transform';
		prefixcss='';  //-webkit-transition >> transition  
	}
	
	var transitionProperty, transitionDuration, transitionTiming, transitionDelay;//过渡
	var animationName, animationDuration, animationTiming,animationDelay;
	var key, cssValues = {}, cssProperties, transforms = "";    // transforms 变形   cssValues设置给DOM的样式
	var transform;     //变形
    var cssReset = {};
	var css='';
	var cssProperties = [];
	
	

	   transform = prefixcss + 'transform';
	   cssReset[transitionProperty = prefixcss + 'transition-property'] =
	   cssReset[transitionDuration = prefixcss + 'transition-duration'] = 
	   cssReset[transitionTiming   = prefixcss + 'transition-timing-function'] = 
	   cssReset[transitionDelay    = prefixcss + 'transition-delay'] =
	   cssReset[animationName      = prefixcss + 'animation-name'] =
	   cssReset[animationDuration  = prefixcss + 'animation-duration'] = 
	   cssReset[animationTiming    = prefixcss + 'animation-timing-function'] =
	   cssReset[animationDelay     = prefixcss + 'animation-delay'] = '';
	  
	  
	 if (typeof properties == 'string') {   // keyframe animation
    
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 'ms'
      cssValues[animationTiming] = (ease || 'linear')
	  cssValues[animationDelay] = (delay) + 'ms'
     
	    endEvent=animationEnd;
    } else {     // CSS transitions
	   endEvent=transitionEnd;
	   
	   
      for (key in properties){
       //如果设置 的CSS属性是变形之类的
       if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
       else cssValues[key] = properties[key], cssProperties.push(dasherize(key))
	 } //for end 
       if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
	   
       if (duration > 0 && typeof properties === 'object') {
         cssValues[transitionProperty] = cssProperties.join(', ')
         cssValues[transitionDuration] = duration + 'ms'
         cssValues[transitionTiming] = (ease || 'linear')
		 cssValues[transitionDelay] = (delay) + 'ms'
       }
     
	 
	}
            
         
		 for(var attr in cssValues){
			 css += dasherize(attr) + ':' + cssValues[attr]+ ';';			
		}	
		
				
		
		// trigger page reflow so new elements can animate
      //强制  主动触发页面回流，刷新DOM，让接下来设置的动画可以正确播放
      //更改 offsetTop、offsetLeft、 offsetWidth、offsetHeight；scrollTop、scrollLeft、scrollWidth、scrollHeight；clientTop、clientLeft、clientWidth、clientHeight；getComputedStyle() 、currentStyle（）。这些都会触发回流。回流导致DOM重新渲染，平时要尽可能避免，但这里，为了动画即时生效播放，则主动触发回流，刷新DOM。
		
		obj.clientLeft;
		
		
		
		//console.log(css);
		obj.style.cssText=obj.style.cssText+';'+css;	

    	  
		if(!callback){  return } //没有回调函数 return
      

	    var fired = false;
		var handler = function (event) {
			    if (typeof event !== 'undefined') {
                  if(event.target !== event.currentTarget){ fired=true; return; }// makes sure the event didn't bubble from "below"    event.currentTarget指向事件所绑定的元素，而event.target始终指向事件发生时的元素
				 }
				  
				 callback && callback.apply(obj,arguments);
				 fired=true;

				 obj.removeEventListener(endEvent,arguments.callee,false);	
        };
          
		  if(obj.addEventListener){
	       obj.addEventListener(endEvent, handler,false)
		  }
		
		
		if(!endEvent||duration<=0){ //没有  @1 transitionEnd 事件    或者@2 duration为0，即浏览器不支持动画的情况  直接执行动画结束，执行回调。    
             setTimeout(function(){
             handler();
             });
            return;
          }
            
         
       
         setTimeout(function(){//绑定过事件还做延时处理，是transitionEnd在older Android phones不一定触发
                if(fired) return
                  handler()
        },parseInt((duration + delay) + 25));
		
		   							  
}//end

   window.transform=transform;

})(window,document);