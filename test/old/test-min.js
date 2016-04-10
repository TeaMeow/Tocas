var Tocas=function(){var $,EmptyArray=[],Slice=EmptyArray.slice,Filter=EmptyArray.filter,Queue=[],tocas={},isArray=Array.isArray||function(Obj){return Obj instanceof Array},isObject=function(Obj){return Obj instanceof Object},isEmptyOrWhiteSpace=function(Str){return str===null||str.match(/^\s*$/)!==null},dropzoneNumber=0;function Compact(Array){return Filter.call(Array,function(Item){return Item!=null})}tocas.Init=function(Selector,Context){var Dom;if(typeof Selector=="string"){if(Selector[0]=="<")return tocas.Fragment(Selector);
Selector=Selector.trim();if(typeof Context!="undefined")return $(Selector).find(Context);Dom=tocas.Select(document,Selector)}else if(tocas.IsTocas(Selector))return Selector;else if(isArray(Selector))Dom=Compact(Selector);else if(isObject(Selector))Dom=[Selector],Selector=null;return tocas.Tocas(Dom,Selector)};tocas.Fragment=function(Selector){var NoContent=/^<([^\/].*?)>$/,Regex=/(?:<)(.*?)( .*?)?(?:>)/,Match=Regex.exec(Selector),MainAll=Match[0],MainElement=Match[1],MainAttrs=Match[2],HasAttr=typeof MainAttrs!==
"undefined",HasContent=!MainAll.match(NoContent);if(HasContent)var ContentRegex=new RegExp(MainAll+"(.*?)(?:</"+MainElement+">)$"),ContentMatch=ContentRegex.exec(Selector),Content=ContentMatch[1];if(HasAttr){var Attrs=MainAttrs.split(/(?:\s)?(.*?)=(?:"|')(.*?)(?:"|')/).filter(Boolean),AttrObj={};for(var i=0;i<Attrs.length;i++)if((i+2)%2==0)AttrObj[Attrs[i]]=Attrs[i+1]}var $Element=$(document.createElement(MainElement));if(HasAttr)$Element.attr(AttrObj);if(HasContent)$Element.html(Content);return $Element};
tocas.IsTocas=function(Obj){return Obj instanceof tocas.Tocas};tocas.Select=function(Element,Selector){try{return Slice.call(Element.querySelectorAll(Selector))}catch(e){console.log("TOCAS ERROR: Something wrong while selecting "+Selector+" element.")}};tocas.Tocas=function(Dom,Selector){Dom=Dom||[];Dom.__proto__=$.fn;Dom.Selector=Selector||"";return Dom};$=function(Selector,Context){return tocas.Init(Selector,Context)};$.fn={each:function(Callback){EmptyArray.every.call(this,function(Index,Element){return Callback.call(Index,
Element,Index)!==false});return this},slice:function(){return $(Slice.apply(this,arguments))},eq:function(Index){return this.slice(Index,+Index+1)},isHidden:function(){return $(this).hasClass("hidden")},toggle:function(){return this.each(function(){if($(this).hasClass("hidden"))$(this).show();else $(this).hide()})},getCSS:function(Property){try{return 0 in this?document.defaultView.getComputedStyle(this[0],null).getPropertyValue(Property):null}catch(Err){return null}},text:function(Text){if(Text==
undefined)return 0 in this?this[0].innerText:null;else return this.each(function(){this.textContent=Text})},html:function(HTML){HTML=HTML||null;if(!HTML)return 0 in this?this[0].innerHTML:null;else return this.each(function(){this.innerHTML=HTML})},genDate:function(Type,Direction){Type=Type||"Day";Direction=Direction||"Past";var Now=new Date;return this.each(function(index,el){switch(Type){case "Year":var Year=Now.getFullYear();for(var i=0;i<110;i++){var option=document.createElement("option");option.text=
Direction=="Past"?Year--:Year++;el.add(option)}break;case "Month":var Month=1;for(var i=0;i<12;i++){var option=document.createElement("option");option.text=Month<10?"0"+Month:Month;Month++;el.add(option)}break;case "Day":var Day=1;for(var i=0;i<31;i++){var option=document.createElement("option");option.text=Day<10?"0"+Day:Day;Day++;el.add(option)}break}})},clickToEdit:function(BlurCallback){this.each(function(){if($(this).text()=="")$(this).html("&nbsp;")});$(this).on("click",function(){$(this).addClass("tb").attr("contenteditable",
"true");$(this).focus()});$(this).on("blur",function(){$(this).removeClass("tb").attr("contenteditable","false");if(typeof BlurCallback!=="undefined")BlurCallback.call(this,$(this).text())})},removeText:function(){},focus:function(){return this.each(function(){this.focus()})},empty:function(){return this.each(function(){if(this.innerHTML!="undefined")this.innerHTML="";if(this.value!="undefined")this.value=""})},val:function(Value){if(Value==null)if(0 in this)if(this[0].nodeName=="SELECT")return this[0].options[this[0].selectedIndex].value;
else return this[0].value;else return null;else return this.each(function(){this.value=Value})},on:function(EventName,Selector,Handler,Once){Once=Once||false;var HasSelector=true;if(typeof Selector!=="string"){HasSelector=false;Handler=Selector}if(typeof Handler!=="function")Once=Handler;return this.each(function(){if(typeof this.addEventListener=="undefined"){console.log("TOCAS ERROR: Event listener is not worked with this element.");return false}if(typeof this.ts_eventHandler=="undefined")this.ts_eventHandler=
{};var Events=EventName.split(" ");for(var i in Events){var Event=Events[i];if(typeof this.ts_eventHandler[Event]=="undefined")this.ts_eventHandler[Event]={registered:false,list:[]};if(this.ts_eventHandler[Event].registered===false){this.addEventListener(Event,function(evt){if(typeof this.ts_eventHandler[Event]!="undefined")for(var e in this.ts_eventHandler[Event].list){if(typeof this.ts_eventHandler[Event].list[e].selector!=="undefined"){var InSelector=false;$(this.ts_eventHandler[Event].list[e].selector).each(function(i,
el){if(evt.target===el)InSelector=true});if(!InSelector)return}this.ts_eventHandler[Event].list[e].func.call(this,evt);if(this.ts_eventHandler[Event].list[e].once)delete this.ts_eventHandler[Event].list[e]}});this.ts_eventHandler[Event].registered=true}var eventHandler=this.ts_eventHandler[Event].list,Data={func:Handler,once:Once};if(HasSelector)Data.selector=Selector;eventHandler.push(Data);this.ts_eventHandler[Event].list=eventHandler}})},one:function(EventName,Selector,Handler){return this.each(function(){$(this).on(EventName,
Selector,Handler,true)})},off:function(EventName,Handler){return this.each(function(){if(typeof this.ts_eventHandler=="undefined")return;if(typeof this.ts_eventHandler[EventName]=="undefined")return;if(Handler==null){this.ts_eventHandler[EventName].list=[];return}for(var e in this.ts_eventHandler[EventName].list)if(Handler===this.ts_eventHandler[EventName].list[e].func)delete this.ts_eventHandler[EventName].list[e]})},ready:function(Callback){if(0 in this)this[0].addEventListener("DOMContentLoaded",
Callback)},load:function(URL,Data,Callback){if(!this.length)return this;return this.each(function(){var that=this,Options={type:"POST",url:URL,dataType:"html",data:Data},Split=URL.split(/\s/),Selector;if(Split.length>1)Options.url=Split[0],Selector=Split[1];Options.success=function(Result){var ScriptTag=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;$(that).html(Selector?$(document.createElement("div")).html(Result.replace(ScriptTag," ")).find(Selector).html():Result)};$.ajax(Options)})},mousedown:function(Callback){return this.each(function(){if(!Callback)return false;
this.onmousedown=Callback})},mouseup:function(Callback){return this.each(function(){if(!Callback)return false;this.onmouseup=Callback})},mousemove:function(Callback){return this.each(function(){if(!Callback)return false;this.onmousemove=Callback})},click:function(Callback){return this.each(function(){if(!Callback)return false;this.onclick=Callback()})},dragstart:function(Callback){return this.each(function(){if(!Callback)return false;this.ondragstart=Callback})},longpress:function(Callback,ClickCallback,
Timer){if(!isNaN(ClickCallback))Timer=ClickCallback;Timer=Timer||500;return this.each(function(){$(this).mousedown(function(event){var that=this;that.ts_longPressed=false;this.ts_longPressTimer=setTimeout(function(){Callback.call(that);that.ts_longPressed=true},Timer);return false}).mouseup(function(event){if(!this.ts_longPressed)if(typeof ClickCallback!=="undefined")ClickCallback.call(this);clearTimeout(this.ts_longPressTimer);return false}).mousemove(function(event){clearTimeout(this.ts_longPressTimer);
return false})})},click:function(Callback){return this.each(function(){if(!Callback)return false;this.onclick=Callback})},trigger:function(Event){return this.each(function(){this[Event]()})},ripple:function(){return this.each(function(){$(this).on("click",function(e){if(!$(this).find(".ink"))var InkElement=$(document.createElement("span")).attr("class","ink").prependTo(this);var InkElement=$(this).find(".ink");if(!InkElement[0].style.height&&!InkElement[0].style.width){var Max=Math.max(parseInt($(this).css("width")),
parseInt($(this).css("height")));InkElement.css({height:Max,width:Max})}var InkWidth=parseInt($(InkElement).css("width")),InkHeight=parseInt($(InkElement).css("height")),X=e.pageX-this.getBoundingClientRect().left-InkWidth/2,Y=e.pageY-this.getBoundingClientRect().top-InkHeight/2;InkElement.css({top:Y+"px",left:X+"px"}).cssAnimate("ripple")})})},scrollBottom:function(Scroll,ReachBottom){$(this).on("scroll",function(){var Distance=this.scrollHeight-this.scrollTop-this.clientHeight;if(typeof Scroll!==
"undefined"||Scroll!=null)Scroll.call(this,Distance);if(Distance==0&&typeof ReachBottom!=="undefined")ReachBottom.call(this,Distance)})},isBottom:function(){if(0 in this)if(this[0].scrollHeight-this[0].scrollTop-this[0].clientHeight==0)return true;else return false},slide:function(Action,Callback,Speed){Callback=Callback||false;Speed=Speed||500;if($.isNumeric(Callback))Speed=Callback;Speed=Speed/1E3;var El=this[0],$this=$(El),MaxHeight=0;var GetInfo=function(){if($this.hasClass("hidden"))$this.removeClass("hidden");
var Style=window.getComputedStyle(El),Display=Style.display,Position=Style.position,Visibility=Style.visibility,PaddingTop=Style.paddingTop,PaddingRight=Style.paddingRight,PaddingBottom=Style.paddingBottom,PaddingLeft=Style.paddingLeft,Padding=PaddingTop+" "+PaddingRight+" "+PaddingBottom+" "+PaddingLeft,MaxHeight=Style.maxHeight.replace("px","").replace("%",""),WantedHeight=0;if(Display!=="none"&&MaxHeight!=="0")return{"WantedHeight":El.offsetHeight,"Padding":Padding};$this.css({"position":"absolute",
"visibility":"hidden","display":"block"});WantedHeight=El.offsetHeight;$this.css({"position":Display,"visibility":Position,"display":Visibility});return{"WantedHeight":WantedHeight,"Padding":Padding}};var Intailize=function(){var Info=GetInfo();$this.css({"overflow-y":"hidden","display":"block"});$this.attr("data-max-height",Info.WantedHeight+"px");$this.attr("data-padding",Info.Padding)};if(!$this.attr("data-max-height"))Intailize();if(typeof Callback==="function")$this.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
function(){Callback.call(El)});if(Action=="down"){$this.css({"max-height":"0","padding":$this.attr("data-padding")});setTimeout(function(){$this.css({"transition":"max-height "+Speed+"s ease-in-out","max-height":$this.attr("data-max-height")})},10)}else{$this.css("max-height",$this.attr("data-max-height"));setTimeout(function(){$this.css({"transition":"max-height "+Speed+"s ease-in-out","max-height":"0","padding":"0px 0px 0px 0px"})},10)}},slideDown:function(Callback,Speed){var that=this;Callback=
Callback||false;Speed=Speed||false;$(this[0]).slide("down",Callback,Speed)},slideUp:function(Callback,Speed){var that=this;Callback=Callback||false;Speed=Speed||false;$(this[0]).slide("up",Callback,Speed)},dropzone:function(Config){Config=Config||{};dropzoneNumber+=1;var DragEnter=Config.dragenter||function(){},DragOver=Config.dragover||function(){},Clickable=Config.clickable||true,Multiple=Config.multiple||false,ForceSingle=Config.forceSingle||false,Error=Config.error||function(){},Success=Config.success||
function(){},Each=Config.each||function(){},AccpetedFiles=Config.acceptedFiles||"*",InputName=Config.inputName||"tocas-dropzone-"+dropzoneNumber,Dropzone=this;var UploadInput=$("#"+InputName).length==0?document.createElement("input"):$_("#"+InputName);UploadInput.type="file";UploadInput.style.display="none";UploadInput.id=InputName;if(Multiple)UploadInput.multiple="multiple";var Parent=$(this).parent();$(Parent).prepend(UploadInput);$(this).attr("data-dropzone-name",InputName);function PutFile(Files){var Length=
Files.length,dropzoneCount=$(Dropzone)[0].dropzoneCount||0;$(Dropzone)[0].files=Files;$(Dropzone)[0].dropzoneCount=dropzoneCount+Length}if(Clickable){$(this).on("click",function(){$("#"+InputName).trigger("click")});$(this).on("mouseover",function(){$(this).css("cursor","pointer")})}$("#"+InputName).on("change",function(){var Files=this.files,Length=Files.length;PutFile(Files);for(var i=0;i<Length;i++)Each.call(Dropzone,Files[i]);Success.call(Dropzone,Files)});$(this).on("dragover dragenter drop",
function(e){e.stopPropagation();e.preventDefault();switch(e.type){case "dragover":DragOver.call();break;case "dragenter":DragEnter.call();break}if(e.type!="drop")return;var Data=e.dataTransfer,Files=Data.files,Length=Files.length;PutFile(Files);if(Multiple)for(var i=0;i<Length;i++)Each.call(Dropzone,Files[i]);else Each.call(Dropzone,Files[0]);Success.call(Dropzone,Files)})},hasClass:function(Class){if(0 in this)if(this[0].classList)return this[0].classList.contains(Class);else return(new RegExp("(^| )"+
Class+"( |$)","gi")).test(this[0].className)},classList:function(){var Classes=[];if(0 in this)if(this[0].classList)for(var i=0;i<this[0].classList.length;i++)Classes.push(this[0].classList[i]);else for(var i in this[0].className.split(" "))Classes.push(this[0].className.split(" ")[i]);return Classes},addClass:function(Class){if(Class==null)return;return this.each(function(){List=Class.split(" ");for(var i in List){if(List[i]=="")continue;if(this.classList)this.classList.add(List[i]);else this.className+=
" "+List[i]}})},removeClass:function(Class){return this.each(function(){if(!Class)this.className="";else{List=Class.split(" ");for(var i in List){if(List[i]=="")continue;if(this.classList)this.classList.remove(List[i]);else if(typeof this.className!=="undefined")this.className=this.className.replace(new RegExp("(^|\\b)"+Class.split(" ").join("|")+"(\\b|$)","gi")," ")}}})},toggleClass:function(Class){return this.each(function(){var List,Index;List=Class.split(" ");for(var i in List)if(this.classList)this.classList.toggle(List[i]);
else{ObjClassList=this.className.split(" ");Index=List.indexOf(List[i]);if(Index>=0)ObjClassList.splice(Index,1);else ObjClassList.push(List[i]);this.className=List[i].join(" ")}})},wrap:function(Element){return this.each(function(){this.parentNode.insertBefore(Element,this);Element.appendChild(this)})},append:function(HTML){if(HTML!=null&&typeof HTML=="object")return this.each(function(){this.appendChild(HTML)});else if(HTML!=null)return this.each(function(){this.innerHTML+=HTML})},after:function(HTML){if(HTML!=
null)return this.each(function(){this.insertAdjacentHTML("afterend",HTML)})},before:function(HTML){if(HTML!=null)return this.each(function(){this.insertAdjacentHTML("beforeBegin",HTML)})},prepend:function(HTML){if(HTML!=null)return this.each(function(){this.parentNode.insertBefore(HTML,this.nextSibling)})},appendTo:function(Selector){return this.each(function(){var that=this;$(Selector).each(function(){this.appendChild(that,this.nextSibling)})})},prependTo:function(Selector){return this.each(function(){var that=
this;$(Selector).each(function(){this.insertBefore(that,this.firstChild)})})},insertAfter:function(Selector){return this.each(function(){var that=this;$(Selector).each(function(){this.parentNode.insertBefore(that,this.nextSibling)})})},insertBefore:function(Selector){return this.each(function(){var that=this;$(Selector).each(function(){this.insertAdjacentHTML("beforeBegin",that)})})},clone:function(Deep){Deep=typeof Deep=="undefined"?true:Deep;var CloneList=[];this.each(function(){CloneList.push(this.cloneNode(Deep))});
return $(CloneList)},remove:function(){return this.each(function(){this.parentNode.removeChild(this)})},children:function(){var List=[];this.each(function(i,el){var ChildNodes=el.childNodes;List.push.apply(List,ChildNodes)});return $(List)},find:function(Selector){if(typeof Selector!=="string")return null;var List=[];this.each(function(i,el){List.push.apply(List,el.querySelectorAll(Selector))});return List.length?$(List):null},attr:function(Attr,Value){Value=Value===null?null:Value;if(typeof Attr===
"object"&&!Value)return this.each(function(){for(var i in Attr)this.setAttribute(i,Attr[i])});else if(Attr!=null&&Value!=null)return this.each(function(){this.setAttribute(Attr,Value)});else if(Attr!=null&&!Value)return 0 in this?this[0].getAttribute(Attr):null},removeAttr:function(Attr){return this.each(function(){this.removeAttribute(Attr)})},cssAnimate:function(Animate,Callback,Time){var AnimateList="slideInDown slideInLeft slideInRight slideInUp slideOutDown slideOutLeft slideOutRight slideOutUp";
if(typeof Callback=="number")Time=Callback;var Timer=parseInt((Time/1E3).toString().replace(".",""),10);var Timer=Time<1E3?"0"+Timer:Timer;Time=isNaN(Time)?"":" animated"+Timer+"s";return this.each(function(){var that=this;$(this).off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend").removeClass(AnimateList).removeClass(Animate+" animated"+Time);$(this).addClass(Animate+" animated"+Time).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
function(){$(that).removeClass(Animate+" animated"+Time);if(typeof Callback!=="undefined"&&Callback!=null&&typeof Callback!=="number")Callback.call(that)})})},parent:function(){return 0 in this?$(this[0].parentNode):null},parents:function(Selector){var that=this,Selector=Selector||null,Parents=[];if(Selector!==null)var Selector=$(Selector);while(that){that=$(that).parent()[0];if(!that)break;if(Selector==null||Selector!==null&&Array.prototype.indexOf.call(Selector,that)!==-1)Parents.push(that)}return $(Parents)},
closest:function(Selector){var that=this,Selector=$(Selector);while(true){that=$(that).parent()[0];if(!that)return null;if(Array.prototype.indexOf.call(Selector,that)!==-1)return $(that)}},contains:function(Wants){var Selector=$(Wants),IsTrue=false;this.each(function(i,el){var ChildNodes=el.childNodes;for(var si=0;si<Selector.length;si++)if(Array.prototype.indexOf.call(ChildNodes,Selector[si])!=-1)IsTrue=true});return IsTrue},css:function(Property,Value){var CSS="";if(Property!=null&&Value!=null)CSS=
Property+":"+Value+";";else if(typeof Property==="object"&&!Array.isArray(Property)&&Value==null)for(var i in Property){if(Property.hasOwnProperty(i))CSS+=i+":"+Property[i]+";"}else if(Array.isArray(Property)&&Value==null){var CSSObject={};this.each(function(){for(var i in Property)CSSObject[Property[i]]=$(this).getCSS(Property[i])});return CSSObject}else if(Property!=null&&Value==null)return $(this).getCSS(Property);return this.each(function(){if(typeof this.style=="undefined")return;this.style.cssText=
this.style.cssText+CSS})},serialize:function(){var Array=[];this.each(function(){var z,a;for(var z=0;z<this.elements.length;z++){var Elements=this.elements[z];var Name=Elements.name;var Value=Elements.value;if(!Name||Elements.disabled||!Value)continue;switch(Elements.nodeName){case "INPUT":switch(Elements.type){case "text":case "hidden":case "password":case "button":case "reset":case "submit":case "number":case "email":Array.push(Name+"="+encodeURIComponent(Value));break;case "checkbox":case "radio":if(!Elements.checked)continue;
Array.push(Name+"="+encodeURIComponent(Value));break}break;case "TEXTAREA":Array.push(Name+"="+encodeURIComponent(Value));break;case "SELECT":switch(Elements.type){case "select-one":Array.push(Name+"="+encodeURIComponent(Value));break;case "select-multiple":for(var a=0;a<Elements.options.length;a++){var OptionValue=Elements.options[a].value;if(Elements.options[a].selected)Array.push(Name+"="+encodeURIComponent(OptionValue))}}break;case "BUTTON":switch(Elements.type){case "reset":case "submit":case "button":Array.push(Name+
"="+encodeURIComponent(Value))}}}});return Array.join("&").toString()},avgColor:function(Type){Type=Type||null;if(0 in this){var Img=this[0];var Canvas=document.createElement("canvas");Canvas.width=Img.width;Canvas.height=Img.height;var Context=Canvas.getContext("2d");Context.drawImage(Img,0,0,Img.width,Img.height);if(Img.width<=0||Img.height<=0)console.log("TOCAS ERROR: The width or the height of the image which you trying to get the avg. color is lower or equal zero.");var Data=Context.getImageData(0,
0,Img.width,Img.height).data;var r=0,g=0,b=0;for(var Row=0;Row<Img.height;Row++)for(var Col=0;Col<Img.width;Col++){r+=Data[(Img.width*Row+Col)*4];g+=Data[(Img.width*Row+Col)*4+1];b+=Data[(Img.width*Row+Col)*4+2]}r/=Img.width*Img.height;g/=Img.width*Img.height;b/=Img.width*Img.height;r=Math.round(r);g=Math.round(g);b=Math.round(b);if(Type!==null)switch(Type.toUpperCase()){case "R":return r;break;case "G":return g;break;case "B":return b;break;case "RGB":return[r,g,b];break}return"#"+(r<<16|g<<8|b).toString(16)}else return null}};
$.inArray=function(Item,TargetArray){return TargetArray.indexOf(Item)};$.ajax=function(Obj,Type){if(Obj==null)return false;var ErrorCallback=typeof Obj.error!="undefined";var IsObjectData=typeof Obj.data=="object"&&Obj.data.constructor!=FormData;if(typeof Obj.async=="undefined")Obj.async=true;if(typeof Obj.contentType=="undefined"||Obj.contentType==null)Obj.contentType="application/x-www-form-urlencoded; charset=UTF-8";XHR=new XMLHttpRequest;XHR.timeout=Obj.timeout||1E4;XHR.onload=function(){if(typeof Obj.statusCode!=
"undefined"&&typeof Obj.statusCode[XHR.status]!="undefined")Obj.statusCode[XHR.status](XHR,XHR.responseText);if(XHR.status>=200&&XHR.status<400)switch(Obj.dataType){case "json":if($.isJSON(XHR.responseText))Obj.success(JSON.parse(XHR.responseText),XHR);else if(ErrorCallback)Obj.error(XHR,"parsererror");break;case "html":case "text":case "string":default:if(typeof Obj.success=="function")Obj.success(XHR.responseText,XHR);if(typeof XHR.close=="function")XHR.close()}else if(ErrorCallback)Obj.error(XHR,
"success")};XHR.ontimeout=function(){if(ErrorCallback)Obj.error(XHR,"timeout")};XHR.onerror=function(){if(ErrorCallback)Obj.error(XHR,"error")};if(typeof Obj.uploading!="undefined")XHR.upload.addEventListener("progress",function(e){if(e.lengthComputable){Percent=Math.round(e.loaded/e.total*100);Obj.uploading(Percent,e)}},false);XHR.open(Obj.type,Obj.url,Obj.async);if(Obj.contentType!=false)XHR.setRequestHeader("Content-Type",Obj.contentType);if(typeof Obj.headers!="undefined")for(var i in Obj.headers)XHR.setRequestHeader(i,
Obj.headers[i]);if(IsObjectData){var Params="";for(var i in Obj.data)Params+=i+"="+Obj.data[i]+"&";Params=Params.slice(0,-1)}XHR.send(IsObjectData?Params:Obj.data);return XHR};$.getJSON=function(URL,Return){return $.ajax({url:URL,type:"GET",dataType:"json",success:Return})};$.Deferred=function(){this._always=[];this._done=[];this._fail=[]};$.Deferred.prototype={execute:function(List,Args){var i=List.length;Args=Array.prototype.slice.call(Args);while(i--)List[i].apply(null,Args)},anyway:function(){this.execute(this._always,
arguments);return this},resolve:function(){this.execute(this._done,arguments);return this},reject:function(){this.execute(this._fail,arguments);return this},done:function(Callback){this._done.push(Callback);return this},fail:function(Callback){this._fail.push(Callback);return this},always:function(Callback){this._always.push(Callback);return this}};$.post=function(URL,Data,Callback){Callback=Callback||null;var d=new $.Deferred;$.ajax({url:URL,type:"POST",dataType:"json",data:Data,error:function(r){d.reject(r)},
success:function(r){d.resolve(r)}});return d};$.isJSON=function(String){var IsJSON=true;try{JSON.parse(String)}catch(e){var IsJSON=false}return IsJSON};$.cookie=function(Name,Value,Options){if(Value!=null){var Expire=isObject(Options)&&typeof Options.expires!="undefined"?Options.expires:365;var Domain=isObject(Options)&&typeof Options.domain!="undefined"?" domain="+Options.domain+";":"";var Path=" path="+(isObject(Options)&&typeof Options.path!="undefined"?Options.path:"/")+";";var d=new Date;if(!isObject(Options)&&
Options===-1)d.setTime(d.getTime()-24*60*60*1E3);else d.setTime(d.getTime()+Expire*24*60*60*1E3);var Expires="expires="+d.toUTCString()+";";document.cookie=Name+"="+(Value||"")+"; "+Expires+Domain+Path}else{var CookieName=Name+"=";var List=document.cookie.split(";");for(var i in List){var Cookie=List[i];while(Cookie.charAt(0)==" ")Cookie=Cookie.substring(1);if(Cookie.indexOf(CookieName)!=-1)return Cookie.substring(CookieName.length,Cookie.length)}}return"undefined"};$.sse=function(Obj){var SSE=new EventSource(Obj.url);
if(typeof Obj.message=="object")for(var i in Obj.message)SSE.addEventListener(i,Obj.message[i],false);else if(typeof Obj.message!=="undefined")SSE.onmessage=Obj.message;if(typeof Obj.error!=="undefined")SSE.onerror=Obj.error;if(typeof Obj.open!=="undefined")SSE.addEventListener("open",Obj.open,false)};$.getScript=function(URL,Callback){var script=document.createElement("script");script.src=URL;script.onload=Callback;script.onreadystatechange=Callback;script.onerror=Callback;$("head").append(script)};
$.binder=function(Binds,Rebind){Rebind=Rebind||false;for(var i in Binds){var BindThis=function(Target,Events,Bind){var Event=Events.split(" ");switch(Target){case " window":case " Window":Target=window;break;case " document":case " Document":Target=document;break}for(var i in Event){var e=Event[i];if(e=="scrollBottom"){if(Rebind)$(Target).off("scroll");$(Target).scrollBottom(Bind)}else if(e=="clickToEdit"){if(Rebind)$(Target).off("click");$(Target).clickToEdit(Bind)}else if(e=="ready"){if(Rebind)$(Target).off("DOMContentLoaded");
$(Target).ready(Bind)}else if(e!=""){if(Rebind)$(Target).off(e);$(Target).on(e,Bind)}}};var Splits=i.split("|"),Events=Splits[0],Targets=Splits[1].split("&");for(var t in Targets)if(Binds[i].isArray)for(var f in Binds[i])BindThis(Targets[t],Events,Binds[i][f]);else BindThis(Targets[t],Events,Binds[i])}};$.urlParam=function(ParamName){var GetAll=typeof ParamName==="undefined";var Params=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");var ParamList={};if(Params.length==0)return null;
for(var i in Params){var Param=Params[i].split("=");Name=Param[0],Value=typeof Param[1]!=="undefined"&&Param[1]!=""?Param[1]:"";if(Name==ParamName)return Value;if(!GetAll&&Name!=ParamName)continue;ParamList[Name]=Value}return Object.keys(ParamList).length?ParamList:undefined};$.geo=function(Option){if(typeof Option=="undefined")return false;var NotSupported=typeof Option.notSupported=="function",Error=typeof Option.error=="function",Deny=typeof Option.deny=="function",HighAccurary=typeof Option.highAccurary!=
"undefined"?Option.highAccurary:false,Timeout=typeof Option.timeout=="number"?Option.timeout:8E3,MaxAge=typeof Option.maxAge=="number",IsFirefox=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,Opt={enableHighAccuracy:HighAccurary,timeout:Timeout};if(MaxAge)Opt.maximumAge=MaxAge;if(IsFirefox)if(Error)var FirefoxTimer=setTimeout(function(){Option.error(3)},Timeout);else if(Deny)var FirefoxTimer=setTimeout(Option.deny,Timeout);if(navigator.geolocation)navigator.geolocation.getCurrentPosition(function(Position){if(IsFirefox)clearTimeout(FirefoxTimer);
Option.success(Position)},function(ErrorCode){var Denied=ErrorCode.code==ErrorCode.PERMISSION_DENIED;if(IsFirefox)clearTimeout(FirefoxTimer);if(Error)Option.error(ErrorCode);else if(Deny&&Denied)Option.deny()},Opt);else if(NotSupported)Option.notSupported()};$.isNumeric=function(Number){return!isNaN(parseFloat(Number))&&isFinite(Number)};$.pjax=function(Option){if(typeof history.pushState!=="function")return false;var FakeLink=document.createElement("a");FakeLink.href=Option.url;if(FakeLink.host==
"")FakeLink.href=FakeLink.href;if(FakeLink.hostname!==window.location.hostname)return false;var PJAXFullURL=FakeLink.protocol+"//"+FakeLink.hostname+FakeLink.pathname,FullURL=window.location.protocol+"//"+window.location.hostname+window.location.pathname;if(PJAXFullURL===FullURL)return false;function PJAX(Obj){$(Obj.Container).html(Obj.Content);window.history.pushState(Obj.State,Obj.Title,Obj.URL);document.title=Obj.Title;if(typeof Option.success!="undefined")Option.success(Obj)}var Title=Option.title||
"",DataType=Option.dataType||"html",URL=Option.url,Expire=Option.expire||3600,Cache=Option.cache||false,CachedName="cached_"+URL;var State={url:URL,title:Title};if(typeof Option.state!=="undefined")for(var i in Option.state)State[i]=Option.state[i];if(CachedName in localStorage&&Cache){var Obj=JSON.parse(localStorage.getItem(CachedName));if(JSON.stringify(Obj.State)===JSON.stringify(State)||Title===""){var Time=Math.floor(Date.now()/1E3)-Obj.Time;if(Expire&&!(Time>Expire)){PJAX(Obj);return}}}$.ajax({url:URL,
type:"GET",dataType:DataType,headers:{"X_PJAX":"true"},success:function(Result,XHR){var Title=Option.dataType=="json"?Result[Option.titleNode]:Option.title,Content=Option.dataType=="json"?Result[Option.contentNode]:Result,ScriptTag=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;if(Option.dataType=="json"&&typeof Result[Option.titleNode]=="undefined")if(typeof Option.title!="undefined")Title=Option.title;else Title="";if(Option.dataType=="json"&&typeof Result[Option.contentNode]=="undefined")Content=
Result;Content=Content.replace(ScriptTag," ");State["title"]=Title;var Data={Container:Option.container,Content:Content,URL:URL,Title:Title,State:State,Time:Math.floor(Date.now()/1E3)};localStorage.setItem(CachedName,JSON.stringify(Data));PJAX(Data)}})};$.rand=function(Min,Max){return Math.floor(Math.random()*(Max-Min+1)+Min)};$.removeAllTags=function(Str){Str=Str||null;return Str.replace(/<\/?(\w+)\s*[\w\W]*?>/g,"")};$.replaceStyleAttr=function(Str){Str=Str||null;return Str.replace(/(<[\w\W]*?)(style)([\w\W]*?>)/g,
function(a,b,c,d){return b+"style_replace"+d})};$.digits=function(Number){return Number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")};$.isset=function(){var a=arguments,l=a.length,i=0,undef;if(l===0)throw new Error("Empty isset");while(i!==l){if(a[i]===undef||a[i]===null)return false;i++}return true};if(!window.$)window.$=$}(Tocas);function $_(Selector){var Obj=document.querySelectorAll(Selector);return Obj.length==0?false:Obj.length==1?Obj[0]:Obj}
function DateAutoComplete(Event,Field,Type){var FieldElement=document.getElementById(Field);var Len=FieldElement.value.length;var Val=FieldElement.value;var CharCode=Event.keyCode||Event.charCode;if(CharCode<=47||CharCode>=48&&CharCode<=57)if(!(CharCode<=47)&&Len<10){switch(Type){case "YYYY-MM-DD":if([4,7].indexOf(Len)!=-1)Val+="-";break;case "YYYY/MM/DD":if([4,7].indexOf(Len)!=-1)Val+="/";break;case "MM-DD-YYYY":case "DD-MM-YYYY":if([2,5].indexOf(Len)!=-1)Val+="-";break}FieldElement.value=Val;return true}else if([45,
109,47,111].indexOf(CharCode)!=-1&&Len<10)switch(Type){case "YYYY-MM-DD":if([4,7].indexOf(Len)!=-1&&[45,109].indexOf(CharCode)!=-1)return true;break;case "YYYY/MM/DD":if([4,7].indexOf(Len)!=-1&&[47,111].indexOf(CharCode)!=-1)return true;break;case "MM-DD-YYYY":case "DD-MM-YYYY":if([2,5].indexOf(Len)!=-1&&[45,109].indexOf(CharCode)!=-1)return true;break}else if(CharCode<=47)return true;return false}
function ValidateForm(Array,Type,Val,Val2,Required,StringType,Display,Callback){ValidateFormPass=true;function VF_Failed(Field,Display){var FieldElement=document.getElementById(Field);if(Display!="")document.getElementById(Display).style.display="block";FieldElement.classList.remove("vf-passed");FieldElement.classList.add("vf-failed");ValidateFormPass=false}for(var i in Array){var Field=Array[i][0];var Type=Array[i][1];var Val=Array[i][2];var Val2=Array[i][3];var Required=Array[i][4]||"";var StringType=
Array[i][5]||"";var Display=Array[i][6]||"";var FieldElement=document.getElementById(Field);if(Display!="")document.getElementById(Display).style.display="none";FieldElement.classList.remove("vf-failed");FieldElement.classList.add("vf-passed");var FieldValue=FieldElement.value;if(Required.toUpperCase=="R"&&(!FieldValue||!/^\s*$/.test(FieldValue)||FieldValue.length==0))VF_Failed(Field,Display);switch(StringType){case "a-Z":if(!/^[a-zA-Z]+$/.test(FieldValue))VF_Failed(Field,Display);break;case "A-Z":if(!/^[A-Z]+$/.test(FieldValue))VF_Failed(Field,
Display);break;case "0-9":if(!/^[0-9]+$/.test(FieldValue))VF_Failed(Field,Display);break;case "a-Z0-9":if(!/^[a-zA-Z0-9]+$/.test(FieldValue))VF_Failed(Field,Display);break;case "A-Z0-9":if(!/^[A-Z0-9]+$/.test(FieldValue))VF_Failed(Field,Display);break;case "[x]~":if(/^[\~\`\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\|\\\"\'\:\;\?\/\>\.\<\,\]\u3105\u3106\u3107\u3108\u3109\u310a\u310b\u310c\u310d\u310e\u310f\u3110\u3111\u3112\u3113\u3114\u3115\u3117\u3118\u3119\u3127\u3128\u3129\u311a\u311b\u311c\u311d\u311e\u311f\u3120\u3121\u3122\u3123\u3124\u3125\u3126\uff5e\uff01\uff20\uff03\uff04\uff05\uff3e\uff06\uff0a\uff08\uff09\uff3f\uff0b\uff40\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\uff10\u00d7\u2014\u2014\uff0d\-\\u2212\uff1d\u00d7\u00f7\uff5c\u3001\uff0c\u3002\u3001\u3000\u300a\u3008\uff1c\u22ef\u22ef\u30fb\u00b7\uff0e\u300b\u3009\uff1e\uff0f\uff1f\u201c\u201c\u3003\ufe4b\uff1a\uff1b\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff2a\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff4a\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a]+$/.test(FieldValue))VF_Failed(Field,
Display);break;case "[x]~0-9":if(/^[\~\`\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\|\\\"\'\:\;\?\/\>\.\<\,\]\u3105\u3106\u3107\u3108\u3109\u310a\u310b\u310c\u310d\u310e\u310f\u3110\u3111\u3112\u3113\u3114\u3115\u3117\u3118\u3119\u3127\u3128\u3129\u311a\u311b\u311c\u311d\u311e\u311f\u3120\u3121\u3122\u3123\u3124\u3125\u3126\uff5e\uff01\uff20\uff03\uff04\uff05\uff3e\uff06\uff0a\uff08\uff09\uff3f\uff0b\uff40\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\uff101234567890\u00d7\u2014\u2014\uff0d\-\\u2212\uff1d\u00d7\u00f7\uff5c\u3001\uff0c\u3002\u3001\u3000\u300a\u3008\uff1c\u22ef\u22ef\u30fb\u00b7\uff0e\u300b\u3009\uff1e\uff0f\uff1f\u201c\u201c\u3003\ufe4b\uff1a\uff1b\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff2a\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34\uff35\uff36\uff37\uff38\uff39\uff3a\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff4a\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54\uff55\uff56\uff57\uff58\uff59\uff5a]+$/.test(FieldValue))VF_Failed(Field,
Display);break}switch(Type){case "length":if(FieldValue.length<Val||FieldValue.length>Val2)VF_Failed(Field,Display);break;case "number":if(FieldValue<Val||FieldValue>Val2)VF_Failed(Field,Display);break;case "date":switch(Val){case "YYYY-MM-DD":if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(FieldValue))VF_Failed(Field,Display);break;case "MM-DD-YYYY":if(!/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-[0-9]{4}$/.test(FieldValue))VF_Failed(Field,Display);break;case "DD-MM-YYYY":if(!/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/.test(FieldValue))VF_Failed(Field,
Display);break}break;case "email":if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(FieldValue))VF_Failed(Field,Display)}}return ValidateFormPass}$.fn.hide=function(){return this.each(function(){$(this).addClass("hidden")})};$.fn.show=function(){return this.each(function(){$(this).removeClass("hidden")})};