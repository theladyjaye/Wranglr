var itsy = itsy || {};

/**
 * @namespace itsy.Dispatcher
 * @param {object} my used to 'extend' protected secrets between parent and children
 */
itsy.Dispatcher = function(my){
    var my     = my || {};
    var self   = {};       
    var events = [];

    function __new__(){
        self.on        = on;
        self.off       = off;
        self.dispatch  = dispatch;
        self.bubble    = bubble;
    }
    
    /* initialization */

    function __init__(){
        self.name = 'itsy.Dispatcher';
    }

    /* public methods */

    /**
     * @public
     * @name on
     * @description Adds a delegate to an event.
     * @param {string}   event    The event string or identifier.
     * @param {function} delegate The function to execute when the event is triggered.
     * @param {object}   scope    The promised scope for the event delegate. (required only if you need callback to be called from a specific scope)
     */
    function on(event, delegate, scope){
        events[event] = events[event] || {};

        // cache reference
        var e = events[event];
        
        // init event
        e.delegates = e.delegates || [];
        e.scope     = scope;
        
        e.delegates.push(delegate);
    }
    /**
     * @public
     * @name off
     * @description Removes an event
     * @param  {string}   event    The event name or identifier.
     * @param  {function} delegate The delegate you wish to remove from the event.
     * 
     * @returns {boolean} Success
     */
    function off(event, delegate){
        var e = events[event] || false;

        //if
        if(e !== false){
            var dels = e.delegates;
            // for
            for(var i=0, len=dels.length; i<len; i++){
                // if
                if(dels[i] === delegate){
                    // remove delegate
                    dels.splice(i,1);
                    
                    // if; no more delegates ? clean up refs : do nothing
                    if(dels.length === 0){
                        e.scope     = {};
                        e.delegates = {};
                    }
                    return true;
                }
                // #eo if
            }
            // #eo for
        }
        // #eo if

        return false;
    }
    /**
     * @public
     * @name dispatch
     * @param  {string} event The event you wish to dispatch.
     * @param  {object} data  The data you wish to send to the delegate when the event is triggered; optional.
     * 
     * @returns {undefined}
     */
    function dispatch(event, data){
        data = data || {};
        
        var e = events[event] || false;
        
        if(e !== false){
            var dels  = e.delegates;
            var scope = e.scope;
            var dlen   = dels.length;
            
            data.scope = scope;

            // call delegates
            while(len--){
                if(scope !== undefined){
                    dels[len].apply(scope, [event, data]);
                }else{
                    dels[len](event, data);
                }
            }
         }
    }
    /**
     * @public
     * @name bubble
     * @description A simple wrapper for dispatch that simply forwards an event and changes the target
     * @param  {string} event  The event string or identifier.
     * @param  {object} data   The data from the old event to forward.
     * @param  {object} target The new target for the bubbled event.
     *
     * @returns {undefined}
     */
    function bubble(event, data, target){
        data.oldTarget = data.target;
        data.target    = target;
        dispatch(event, data);
    }

    // do not delete //
    __new__(); 
    __init__();
    return self;
    // #eo do not delete //
}