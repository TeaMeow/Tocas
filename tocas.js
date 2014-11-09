/* 
  TTTTTTTTTTT        OOOOOOO       CCCCCCCCC        AAA        SSSSSSSS       
  TTTTTTTTTTT       OOOOOOOOO     CCCCCCCCCC      AA  AA     SSSSSSSSS
     TTT          OO       OO   CCCC           AAA   AAA    SS
    TTT         OO       OO   CCCC            AAAAAAAAAA     SSSSSSSS            ver. 1.1.1
   TTT        OO       OO   CCCC            AAA     AAA            SS
  TTT        OOOOOOOOO     CCCCCCCCCCC    AAA      AAA     SSSSSSSSS   
  TTT        OOOOOOO       CCCCCCCCCC   AAA       AAA     SSSSSSSS     
  
                      Here Comes Another World.

                TeaMeow / Open / Colorful / A.S.O / Simple
                茶葉貓   / 開闊 /  多彩多姿 / 藍.白.澄 / 簡潔
              
              
                            Basic colors
                                
                   A oi    -    Blue     -    #00ADEA
                   S hiroi -    White    -    #FFFFFF
                   O renji -    Orange   -    #FFA500        
                   
                         Object of elements
                         
             ts_eventHandler      -      store event handlers.
             ts_longPressTimer    -      store the timer of longpress detection.
*/

/**
 * For someone who think I'm copy other one's source code,
 * here comes the list which I used A LITTLE PART OF their source code.
 *
 * 給那些誰認為我是抄襲他人原始碼的，
 * 這裡是一份我用了它們「少部分」原始碼的來源清單。
 *
 * We used a little part of, yes, A LITTLE PART OF :
 * ZeptoJS     - zeptojs.com
 * Serialize   - code.google.com/p/form-serialize/downloads/list
 * Library     - youmightnotneedjquery.com/
 */



/**
 * Tocas Main Library
 *
 * The main tocas code.
 */

var Tocas = (function ()
{
    var $, EmptyArray = [], Slice = EmptyArray.slice, Filter = EmptyArray.filter, Queue = []
    tocas = {}
    isArray = Array.isArray || function(Obj){ return Obj instanceof Array }
    isObject = function(Obj){ return Obj instanceof Object }
    isEmptyOrWhiteSpace = function(Str){ return str === null || str.match(/^\s*$/) !== null }

    /** Filter those thing which is we don't need it */
    function Compact(Array){ return Filter.call(Array, function(Item){ return Item != null }) }

    tocas.Init = function(Selector)
    {
        var Dom
        /** If Selector is a normal string */
        if(typeof Selector == 'string')
        {
            /** Remove the space */
            Selector = Selector.trim()
            Dom = tocas.Select(document, Selector)
        }
        else if(tocas.IsTocas(Selector)) return Selector
        else
        {
            /** Filter for eq function */
            if(isArray(Selector))
                Dom = Compact(Selector)
            /** If Selector is object, which means it may generated by Tocas */
            else if(isObject(Selector))
                Dom = [Selector], Selector = null
        }
        return tocas.Tocas(Dom, Selector)
    }
    
    tocas.IsTocas = function(Obj)
    {
        return Obj instanceof tocas.Tocas
    }
    
    tocas.Select = function(Element, Selector)
    {
        return Slice.call(Element.querySelectorAll(Selector))
    }
                  
    tocas.Tocas = function(Dom, Selector)
    {
        Dom = Dom || []
        Dom.__proto__ = $.fn
        Dom.Selector = Selector || ''
        return Dom
    }
    
    
    
    
    /**
     * $
     *
     * Call to Init to get everything ready.
     */
    
    $ = function(Selector)
    {
        return tocas.Init(Selector)
    };
    
    
    
    
    /**
     * Library
     */
    
    $.fn =
    {
        /**
         * Each
         */
        
        each: function(Callback)
        {
            EmptyArray.every.call(this, function(Element, Index)
            {
                return Callback.call(Element, Index, Element) !== false
            })
            
            return this
        },
        
        
        
        
        /**
         * Slice
         */
        
        slice: function()
        {
            /** Regenerate a new object */
            return $(Slice.apply(this, arguments))
        },

        
        
        
        /**
         * Eq
         *
         * Jump to target element.
         */
        
        eq: function(Index)
        {
            return this.slice(Index, + Index + 1)
        },
     
        
        
        
        /**
         * Hide
         */
        
        hide: function()
        {
            return this.css('display', 'none')
        },
 
        
        
        
        /**
         * Show
         */
        
        show: function(Display)
        {
            Display = Display || 'block'
            return this.css('display', Display)
        },
        
        
        
        
        /**
         * Toggle
         *
         * When it's showed, we hide it, but if it's hidden, then you should know it.
         */
        
        toggle: function(Display)
        {
            Display = Display || null
            return this.each(function()
            {
                if($(this).getCSS('display') != 'none')
                    return $(this).hide()
                else
                    return $(this).show(Display)
            })
        },
        
        
        
        
        /**
         * Get CSS
         */
    
        getCSS: function(Property)
        {
            /** Get computed style */
            try
            {
                return 0 in this ? document.defaultView.getComputedStyle(this[0], null).getPropertyValue(Property) : null
            }
            catch(Err)
            {
                return null
            }
        },
        
        
        
        
        /**
         * Text
         *
         * Set textContent.
         */
    
        text: function(Text)
        {
            Text = Text || null;
            return this.each(function()
            {
                this.textContent = Text
            })
        },
        
        
        
        
        /**
         * HTML
         *
         * Set HTML if variable is not empty, otherwise we get the HTML content.
         */
    
        html: function(HTML)
        {
            HTML = HTML || null
            if(!HTML)
                return 0 in this ? this[0].innerHTML : null
            else 
                return this.each(function(){ this.innerHTML = HTML })
        },
        
        
        
        
        /**
         * Empty
         *
         * Clean value or innerHTML.
         */
        
        empty: function()
        {
            this.each(function()
            {
                if(this.innerHTML != 'undefined') this.innerHTML = ''
                if(this.value != 'undefined')     this.value = ''
            })
        },

        
        
        
        /**
         * Val
         *
         * Set the value of element or get a value if Value is null.
         */
        
        val: function(Value)
        {
            if(Value == null)
            {
                if(0 in this)
                {
                    /** Return the value based on selected option if it's a select element*/
                    if(this[0].nodeName == 'SELECT')
                        return this[0].options[this[0].selectedIndex].value
                    else
                        return this[0].value
                }
                else
                {
                    return null
                }
            }
            else 
            {
                return this.each(function(){ this.value = Value })
            }
        },
        
        
        
        
        /**
         * On
         *
         * Add an event into the handler list.
         */
        
        on: function(EventName, Handler, Once)
        {
            Once = Once || false
            /**
             * [ts_eventHandler]
             *
             *        registered   :bool
             *      /
             * Click      func :func
             *      \   /
             *       [0] 
             *          \
             *            once :bool         
             */
            
            return this.each(function()
            {
                /** If the main event list of the element is not existed, we create one */
                if(typeof this.ts_eventHandler == 'undefined') this.ts_eventHandler = {}
                /** Split the event by space */
                var Events = EventName.split(' ')
                
                for(var i in Events)
                {
                    var Event = Events[i]
                    
                    /** If the event handler list is not existed, we create an object, we will store function in here */
                    /** so if someone triggered the event, we can just call this list. */
                    if(typeof this.ts_eventHandler[Event] == 'undefined') this.ts_eventHandler[Event] = {registered: false, list: []}
                    
                    /** Bind if haven't bind yet */
                    if(this.ts_eventHandler[Event].registered === false)
                    {
                        this.addEventListener(Event, function(evt)
                        {
                            /** Just make sure this event still existed */
                            if(typeof this.ts_eventHandler[Event] != 'undefined')
                            {
                                /** Execute all of the functions */
                                for(var e in this.ts_eventHandler[Event].list)
                                {
                                    /** Execute */
                                    this.ts_eventHandler[Event].list[e].func.call(this, evt)
                                    
                                    /** If "once" is true, we remove it after call it */
                                    if(this.ts_eventHandler[Event].list[e].once)
                                        this.ts_eventHandler[Event].list.splice(e, 1)
                                }
                            }
                        })
                        this.ts_eventHandler[Event].registered = true
                    }
                    
                    /** Push handler or anonymous function into that event list */
                    var eventHandler = this.ts_eventHandler[Event].list
                    eventHandler.push({func: Handler, once: Once})
                    this.ts_eventHandler[Event].list = eventHandler
                }
            })
        },
        

        
        
        /**
         * One
         *
         * Something that only happens once, for example: your life.
         */
        
        one: function(EventName, Handler)
        {   
            return this.each(function()
            {
                /** Set "once" true, it will auto remove once we call it */
                $(this).on(EventName, Handler, true)
            })
        },
        
        
        
        
        /**
         * Off
         *
         * Remove an event handler.
         */
        
        off: function(EventName, Handler)
        {
            return this.each(function()
            {
                /** No list no talk */
                if(typeof this.ts_eventHandler == 'undefined') return
                if(typeof this.ts_eventHandler[EventName] == 'undefined') return

                /** If there's no handler name, we remove all handler */
                if(Handler == null){ this.ts_eventHandler[EventName].list = []; return; }
                
                /** Otherwise we search for the index of function, then remove it */
                for(var e in this.ts_eventHandler[EventName].list)
                {
                    var Index = $.inArray(Handler, this.ts_eventHandler[EventName].list[e].func)
                    if(Index > -1) this.ts_eventHandler[EventName].list[e].splice(Index, 1)
                }
            })
        },
        
        
        
        
        /**
         * Ready
         *
         * Execute function after load complete.
         */
        
        ready: function(Callback)
        {
            if(0 in this)
                //if($.inArray(this['Selector'], ['document', 'body'])
                this[0].addEventListener('DOMContentLoaded', Callback)
        },
        
        
        
        
       /**
         * Events
         */
        
        mousedown: function(Callback)
        {
            return this.each(function(){ if(!Callback) return false; this.onmousedown = Callback; })
        },
        mouseup: function(Callback)
        {
            return this.each(function(){ if(!Callback) return false; this.onmouseup = Callback; })
        },
        mousemove: function(Callback)
        {
            return this.each(function(){ if(!Callback) return false; this.onmousemove = Callback; })
        },
        click: function(Callback)
        {
            return this.each(function(){ if(!Callback) return false; this.onclick = Callback; })
        },
        dragstart: function(Callback)
        {
            return this.each(function(){ if(!Callback) return false; this.ondragstart = Callback; })
        },
        longpress: function(Callback, ClickCallback, Timer)
        {
            if(!isNaN(ClickCallback)) Timer = ClickCallback
                                      Timer = Timer || 500
            
            return this.each(function()
            {
                $(this).mousedown(function(event)
                {
                    var that = this
                    /** Haven't trigger long press yet, so we set this to false */
                    that.ts_longPressed = false
                    this.ts_longPressTimer = setTimeout(function()
                    {
                        /** Call long press callback */
                        Callback.call(that)
                        /** Long press has been triggered */
                        that.ts_longPressed = true
                        
                    }, Timer)
                    return false
                })
                .mouseup(function(event)
                {
                    /** If it's not long press, we call the 'click' callback */
                    if(!this.ts_longPressed) if(typeof ClickCallback !== 'undefined') ClickCallback.call(this)
                    
                    clearTimeout(this.ts_longPressTimer)
                    return false
                })
                .mousemove(function(event)
                { 
                    clearTimeout(this.ts_longPressTimer)
                    return false
                })
            })
        },
        click: function(Callback)
        {
            return this.each(function(){ if(!Callback) return false; this.onclick = Callback })
        },
        
        
        
        
        /**
         * Has Class
         */
        
        hasClass: function(Class)
        {
            if(this[0].classList)
                return this[0].classList.contains(Class)
            else
                return new RegExp('(^| )' + Class + '( |$)', 'gi').test(this[0].className)
        },
        
        
        
        
        /**
         * Add Class
         */
        
        addClass: function(Class)
        {
            return this.each(function()
            {
                List = Class.split(' ')
                for(var i in List)
                {
                    if(this.classList)
                    {
                        this.classList.add(List[i]) 
                    }
                    else
                    {
                        this.className += ' ' + List[i]
                    }
                }
            })
        },
   
        
                             
        
        /**
         * Remove Class
         */
        
        removeClass: function(Class)
        {
            return this.each(function()
            {
                if(!Class)
                {
                    this.className = ''
                }
                else
                {
                    List = Class.split(' ')
                    for(var i in List)
                    {
                        /** If there's classList, the just remove it from classList, otherwise we replace the string which is in the (class="")*/
                        if(this.classList)
                            this.classList.remove(List[i]) 
                        else
                            this.className = this.className.replace(new RegExp('(^|\\b)' + Class.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                }
            })
        },
                             
        
                             
        
        /**
         * Toggle Class
         */
        
        toggleClass: function(Class)
        {
            return this.each(function()
            {
                var List, Index
                
                if(this.classList)
                {
                    this.classList.toggle(Class)
                }
                else
                {
                    /** Split the class */
                    List = this.className.split(' ')
                    /** Is the class in class list already? */
                    Index = List.indexOf(Class)

                    /** If already existed, we remove it, otherwise we add it */
                    if(Index >= 0)
                        List.splice(Index, 1)
                    else
                        List.push(Class)

                    this.className = Class.join(' ')
                }
            })
        },
        
        
        
        
        /**
         * Append
         * 
         * Insert new content behind the HTML.
         */
    
        append: function(HTML)
        {
           if(HTML != null) return this.each(function(){ this.innerHTML += HTML })
        },
        
        after: function(HTML)
        {
            if(HTML != null) return this.each(function(){ this.insertAdjacentHTML('afterend', HTML) })
        },
        
        before: function(HTML)
        {
            if(HTML != null) return this.each(function(){ this.insertAdjacentHTML('beforeBegin', HTML) })
        },
        
        prepend: function(HTML)
        {
            if(HTML != null) return this.each(function(){ this.parentNode.insertBefore(HTML, this.nextSibling) })
        },
    
        
        
        
        /**
         * Remove
         */

        remove: function()
        {
            return this.each(function(){ this.parentNode.removeChild(el) })
        },
        

        
        
        /**
         * Attr
         *
         * Set attr when value is not empty, otherwise we get the attr value.
         */
    
        attr: function(Attr, Value)
        {
            Value = Value || null
            
            /** Set multiple Attr if Attr is object */
            if(typeof Attr === 'object' && !Value)
                return this.each(function(){ for(var i in Attr) this.setAttribute(i, Attr[i])})
            
            /** Set single attr */
            else if(Attr != null && Value != null)
                return this.each(function(){ this.setAttribute(Attr, Value) })

            /** Get single attr only if Attr is not null */
            else if(Attr != null && !Value)
                return 0 in this ? this[0].getAttribute(Attr) : null
            
            /** Or return all attrs */
            /*else
                var AttrObject = {}
                alert(Object.keys(this[0].attributes[0]))*/
        },
        
        
        
        
        /**
         * CSS Animate
         */

        cssAnimate: function(Animate, Time, Callback)
        {
            /** If Time is not number, maybe it's a callback */
            if(isNaN(Time))       Callback = Time
            else if(Time == null) Time = 0          //Default time

            return this.each(function()
            {
                /** For passing $(this) to inside function */
                var that = this
                $(this).addClass(Animate + ' animated')
                       /** Once the animation end, we remove the animate class and callback **/
                       .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()
                       {
                           setTimeout(function()
                           {
                               $(that).removeClass(Animate + ' animated')
                               if(typeof Callback !== 'undefined') Callback.call(that) 
                           }, Time)
                        })
            })
        },
        
        
        
        
        /**
         * Parent
         */
        
        parent: function()
        {
            return 0 in this ? this[0].parentNode : null
        },
        
        
        
        
        /**
         * CSS
         *
         * Set CSS to elements or get CSS from elements.
         */
    
        css: function(Property, Value)
        {
            var CSS = ''
            
            /** Set single CSS : If CSS and content is not empty, then set the CSS */
            if(Property != null && Value != null)
            {
                CSS = Property + ':' + Value + ';'
            }
            /** Set multi CSS : If CSS is a Object */
            else if(typeof Property === 'object' && !Array.isArray(Property) && Value == null)
            {
                for(var i in Property) if(Property.hasOwnProperty(i)) CSS += i + ':' + Property[i] + ';'
            }
            /** Get multi CSS : If style name is a array and have only key */
            else if(Array.isArray(Property) && Value == null)
            {
                var CSSObject = {}
                this.each(function(){ for(var i in Property) CSSObject[Property[i]] = $(this).getCSS(Property[i]) })
                
                return CSSObject
            }
            /** Get single CSS : If only style name */
            else if(Property != null && Value == null)
            {
                return $(this).getCSS(Property);
            }
            return this.each(function(){this.style.cssText = CSS;})
        },
        
        
        
        
       /**
        * Serialize
        *
        * Serialize a single or multiple form.
        *
        * @supported Dimitar Ivanov
        */
        
        serialize: function()
        {
            var Array = []

            this.each(function()
            {
                var z, a
                for (var z = 0; z < this.elements.length; z++)
                {
                    var Elements = this.elements[z]
                    var Name = Elements.name
                    var Value = Elements.value

                    /** If element's name is empty or disabled or no value, we skip this one */
                    if(!Name || Elements.disabled || !Value) continue

                    switch (Elements.nodeName)
                    {
                        case 'INPUT':
                            switch(Elements.type)
                            {
                                case 'text':
                                case 'hidden':
                                case 'password':
                                case 'button':
                                case 'reset':
                                case 'submit':
                                    Array.push(Name + '=' + encodeURIComponent(Value))
                                    break

                                case 'checkbox':
                                case 'radio':
                                    /** No checked, we skip. */
                                    if(!Elements.checked) continue

                                    Array.push(Name + '=' + encodeURIComponent(Value))
                                    break

                                /*case 'file':*/
                            }
                            break

                        case 'TEXTAREA':
                            Array.push(Name + '=' + encodeURIComponent(Value))
                            break

                        case 'SELECT':
                            switch(Elements.type)
                            {
                                case 'select-one':
                                    Array.push(Name + '=' + encodeURIComponent(Value))
                                    break

                                case 'select-multiple':
                                    for(var a = 0; a < Elements.options.length; a++)
                                    {
                                        var OptionValue = Elements.options[a].value
                                        if (Elements.options[a].selected) Array.push(Name + '=' + encodeURIComponent(OptionValue))
                                    }
                            }
                            break

                        case 'BUTTON':
                            switch(Elements.type)
                            {
                                case 'reset':
                                case 'submit':
                                case 'button':
                                    Array.push(Name + '=' + encodeURIComponent(Value))
                            }
                    }  
                 }
            })

            /** Prevent sending a object or array via XHR cause an error */
            return Array.join('&').toString()
        }
    };

    
    
    
    /**
     * Index Of
     */
    
    $.inArray = function(Item, TargetArray)
    {
        return TargetArray.indexOf(Item)
    }
    
    
    
    
    /**
     * AJAX
     */
    
    $.ajax = function(Obj, Type)
    {
        if(Obj == null) return false
        
        var ErrorCallback = (typeof Obj.error != 'undefined') ? true : false
        
        /** Default */
        if(typeof Obj.async == 'undefined')
            Obj.async = true
        if(typeof Obj.contentType == 'undefined' || Obj.contentType == null) 
            Obj.contentType = 'application/x-www-form-urlencoded; charset=UTF-8'

        XHR = new XMLHttpRequest()
        /** Open a new connect */
        XHR.open(Obj.type, Obj.url, Obj.async)
        /** Set timeout */
        XHR.timeout = Obj.timeout || 10000

        XHR.onload = function()
        {
            /** Call to statusCode if existed */
            if(typeof Obj.statusCode != 'undefined' && typeof Obj.statusCode[XHR.status] != 'undefined')
                Obj.statusCode[XHR.status](XHR, XHR.responseText)
            
            if(XHR.status >= 200 && XHR.status < 400)
                switch(Obj.dataType)
                {
                    case 'json':
                        Obj.success(JSON.parse(XHR.responseText), XHR)
                        break
                    case 'html':
                    case 'text':
                    case 'string':
                    default:
                        Obj.success(XHR.responseText, XHR)
                        XHR.close()
                }
            else
                if(ErrorCallback) Obj.error(XHR, XHR.responseText)
        }
        
        /** When XHR timeout or error, we callback */
        XHR.ontimeout = function(){ if(ErrorCallback) Obj.error(XHR) }
        XHR.onerror   = function(){ if(ErrorCallback) Obj.error(XHR, XHR.responseText) }
        
        /** If contentType is not FALSE, we set the request header */
        if(Obj.contentType != false) XHR.setRequestHeader('Content-Type', Obj.contentType)

        /** Set headers */
        if(typeof Obj.headers != 'undefined') for(var i in Obj.headers) XHR.setRequestHeader(i, Obj.headers[i])

        /** SENDDDD! */
        XHR.send(Obj.data)
        
        return XHR
    };
    
    
    
    
    $.getJSON = function(URL, Return)
    {
        return $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            success: Return, 
        })
    };
    
    
    
    
    /**
     * Cookie
     *
     * Write, read, delete a cookie.
     */
    
    $.cookie = function(Name, Value, Options)
    {
        /** If value is not null, means this is SET a cookie, not GET a cookie */
        if(Value != null)
        {
            var Expire = (isObject(Options) && typeof Options.expires != 'undefined') ? Options.expires : 365
            var Domain = (isObject(Options) && typeof Options.domain  != 'undefined') ? ' domain=' + Options.domain + ';' : ''
            var Path   = ' path=' + (isObject(Options) && typeof Options.path != 'undefined' ? Options.path : '/') + ';'
            
            var d = new Date()
            
            /** If Options is not object but -1, means user want to delete this cookie, so we given a expired time */
            if(!isObject(Options) && Options === -1)
                d.setTime(d.getTime() - (24 * 60 * 60 * 1000))
            else
                d.setTime(d.getTime() + (Expire * 24 * 60 * 60 * 1000))

            /** Convert the time to cookie format */
            var Expires = 'expires=' + d.toUTCString() + ';'

            /** Set the cookie */
            document.cookie = Name + '=' + (Value || '') + '; ' + Expires + Domain + Path
        }
        else
        {
            var CookieName = Name + '='
            var List = document.cookie.split(';')
            for(var i in List)
            {
                var Cookie = List[i]

                /** If first word is blank, then get content without blank */
                while(Cookie.charAt(0)==' ') Cookie = Cookie.substring(1)

                /** Get the value of cookie*/
                if(Cookie.indexOf(CookieName) != -1) return Cookie.substring(CookieName.length, Cookie.length)
            }
        }
            return null
    }
    if(!window.$) window.$ = $
})(Tocas);




/**
 * Secondary Selector
 *
 * For sometimes we want to use the javascript's own object not our own functions.
 */

function $_(Selector)
{
    var Obj = document.querySelectorAll(Selector);
    return (Obj.length == 0) ? false : (Obj.length == 1) ? Obj[0] : Obj;
}




/**
 * Date auto format
 *
 * Auto add the symbol between year. month. date.
 */

function DateAutoComplete(Event, Field, Type)
{
    /** Get the value */
    var FieldElement = document.getElementById(Field);
    var Len = FieldElement.value.length;
    var Val = FieldElement.value;

    var CharCode = Event.keyCode || Event.charCode;
    //alert(CharCode);
    /** CharCode <= 46 means function keys, 48-57 number keys, 96-105 right hand side number keys */
    if (CharCode <= 47 || (CharCode >= 48 && CharCode <= 57)) 
    {
        /** If the key is not function key (ex: delete) */
        if(!(CharCode <= 47) && Len < 10)
        {
            /** Auto format */
            switch(Type)
            {
                case 'YYYY-MM-DD': if([4,7].indexOf(Len)!=-1) Val+='-'; break;
                case 'YYYY/MM/DD': if([4,7].indexOf(Len)!=-1) Val+='/'; break;
                case 'MM-DD-YYYY': 
                case 'DD-MM-YYYY': if([2,5].indexOf(Len)!=-1) Val+='-'; break;
            }
            
            FieldElement.value = Val;
            return true;
        }
        
        /** If user manual type "-" or "/" symbol */
        else if(([45,109,47,111].indexOf(CharCode)!=-1) && Len < 10)
        {
            switch(Type)
            {
                case 'YYYY-MM-DD': if([4,7].indexOf(Len)!=-1 && [45,109].indexOf(CharCode)!=-1) return true; break;
                case 'YYYY/MM/DD': if([4,7].indexOf(Len)!=-1 && [47,111].indexOf(CharCode)!=-1) return true; break;
                case 'MM-DD-YYYY':
                case 'DD-MM-YYYY': if([2,5].indexOf(Len)!=-1 && [45,109].indexOf(CharCode)!=-1) return true; break;
            }
        }
        
        /** System keys */
        else if(CharCode <= 47)
        {
            return true;
        }
    }
    /** Block other keys */
    return false;
}




/**
 * Validate Form
 *
 * Validate the each field of the form which is we want to validate.
 */

function ValidateForm(Array, Type, Val, Val2, Required, StringType, Display, Callback)
{
    /** Set true at the start */
    ValidateFormPass = true;
    
    /** Failed function */
    function VF_Failed(Field, Display)
    {
        var FieldElement = document.getElementById(Field);
        
        /** display the message element if has */
        if (Display != '') document.getElementById(Display).style.display = 'block';
        
        /** Remove sucess style and add the failed style on it */
        FieldElement.classList.remove('vf-passed');  //Remove
        FieldElement.classList.add('vf-failed');     //Add

        /** Return false */
        ValidateFormPass = false;
    }
    
    for(var i in Array)
    {
        var Field = Array[i][0];
        var Type = Array[i][1];
        var Val = Array[i][2];
        var Val2 = Array[i][3];
        var Required = (Array[i][4] || '');
        var StringType = (Array[i][5] || '');
        var Display = (Array[i][6] || '');
        
        var FieldElement = document.getElementById(Field);
        
        /** Hide the display message first */
        if (Display != '') document.getElementById(Display).style.display = 'none';
        
        /** Remove the failed style and add the success style(it will be replace if the field is wrong.) */
        FieldElement.classList.remove('vf-failed'); //Remove
        FieldElement.classList.add('vf-passed');    //Add

        /** Get the field value */
        var FieldValue = FieldElement.value; 
        
        /** If the field is required but it's empty */
        if(Required.toUpperCase == 'R' && (!FieldValue || !(/^\s*$/.test(FieldValue)) || FieldValue.length == 0)) VF_Failed(Field, Display);
        
        switch(StringType)
        {
            case 'a-Z':
                if(!(/^[a-zA-Z]+$/.test(FieldValue))) VF_Failed(Field, Display);
                break;
                
            case 'A-Z':
                if(!(/^[A-Z]+$/.test(FieldValue))) VF_Failed(Field, Display);
                break;
                
            case '0-9':
                if(!(/^[0-9]+$/.test(FieldValue))) VF_Failed(Field, Display);
                break;
                
            case 'a-Z0-9':
                if(!(/^[a-zA-Z0-9]+$/.test(FieldValue))) VF_Failed(Field, Display);
                break;
                
            case 'A-Z0-9':
                if(!(/^[A-Z0-9]+$/.test(FieldValue))) VF_Failed(Field, Display);
                break;
                
            case '[x]~':
                if(/^[\~\`\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\|\\\"\'\:\;\?\/\>\.\<\,\]ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ～！＠＃＄％＾＆＊（）＿＋｀１２３４５６７８９０×——－\-\−＝×÷｜、，。、　《〈＜⋯⋯・·．》〉＞／？““〃﹋：；ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ]+$/.test(FieldValue)) VF_Failed(Field, Display);
                break;
                
            case '[x]~0-9':
                if(/^[\~\`\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\|\\\"\'\:\;\?\/\>\.\<\,\]ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ～！＠＃＄％＾＆＊（）＿＋｀１２３４５６７８９０1234567890×——－\-\−＝×÷｜、，。、　《〈＜⋯⋯・·．》〉＞／？““〃﹋：；ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ]+$/.test(FieldValue)) VF_Failed(Field, Display);
                break;
        }
        
        
        switch(Type)
        {
            case 'length':
                if(FieldValue.length < Val || FieldValue.length > Val2) VF_Failed(Field, Display);
                break;
                
            case 'number':
                if(FieldValue < Val || FieldValue > Val2) VF_Failed(Field, Display);
                break;
                
            case 'date':
                switch(Val)
                {
                    case 'YYYY-MM-DD':
                        if(!(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(FieldValue))) VF_Failed(Field, Display);
                        break;
                    case 'MM-DD-YYYY':
                        if(!(/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-[0-9]{4}$/.test(FieldValue))) VF_Failed(Field, Display);
                        break;
                    case 'DD-MM-YYYY':
                        if(!(/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/.test(FieldValue))) VF_Failed(Field, Display);
                        break;
                }
                break;
                
            case 'email':
                if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(FieldValue))) VF_Failed(Field, Display);
        }
    }
    
    return ValidateFormPass;
}
