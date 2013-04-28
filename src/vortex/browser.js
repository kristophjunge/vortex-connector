/**
 * Crossbrowser library
 * 
 * @class vortexBrowser
 * @constructor
 * @module vortex
 */
function vortexBrowser() {
	
	/*
	 * Constructor
	 */
	function _init() {
		
	};
	
	/**
	 * Registers a callback function to a DOM element event
	 * 
	 * @method registerEvent
	 * @param {DOMElement} element DOM element
	 * @param {String} eventName Event name
	 * @param {Function} callback Callback function
	 */
	function registerEvent(element,eventName,callback) {
		
		if (typeof(element)=='string') {
			
			element=document.getElementById(element);
			
		}
		
		if (element==null) return;
		
		if (element.addEventListener) {
			
			if (eventName=='mousewheel') {
				
				element.addEventListener('DOMMouseScroll',callback,false);
				
			}
			
			element.addEventListener(eventName,callback,false);
			
		} else if (element.attachEvent) {
			
			element.attachEvent(
				'on'+eventName,
				callback
			);
			
		}
		
	};
	
	/**
	 * Unregisters a callback function from a DOM element event
	 * 
	 * @method unregisterEvent
	 * @param {DOMElement} element DOM element
	 * @param {String} eventName Event name
	 * @param {Function} callback Callback function
	 */
	function unregisterEvent(element,eventName,callback) {
		
		if (typeof(element)=='string') {
			
			element=document.getElementById(element);
			
		}
		
		if (element==null) return;
		
		if (element.removeEventListener) {
			
			if (eventName=='mousewheel') {
				
				element.removeEventListener('DOMMouseScroll',callback,false);
				
			}
			
			element.removeEventListener(eventName,callback,false);
			
		} else if (element.detachEvent) {
			
			element.detachEvent(
				'on'+eventName,
				callback
			);
			
		}
		
	};
	
	/**
	 * Cancel DOM event
	 * 
	 * @method cancelEvent
	 * @param {DOMEvent} event DOM event
	 * @return {Boolean} Returns false
	 */
	function cancelEvent(event) {
		
		event=((event) ? event : window.event);
		
		if (event.stopPropagation) event.stopPropagation();
		if (event.preventDefault) event.preventDefault();
		
		event.cancelBubble=true;
		event.cancel=true;
		event.returnValue=false;
		
		return false;
		
	};
	
	/**
	 * Apply properties to an object
	 * 
	 * @method apply
	 * @param {Object} obj The object witch the properties should be applied to
	 * @param {Object} props A JSON property structure
	 */
	function applyObject(obj,props) {
		
		for (var name in props) {
			
			if (typeof(props[name])=='object') {
				
				if (typeof(props[name].length)!=='undefined') {
					
					obj[name]=props[name];
					
				} else {
					
					if (typeof obj[name]=='undefined') {
						
						obj[name]={};
						
					}
					
					this.applyObject(obj[name],props[name]);
				}
				
			} else {
				
				obj[name]=props[name];
				
			}
			
		}
		
	};
	
	/**
	 * Check WebSocket support
	 * 
	 * @method isWebSocketSupported
	 * @return {Boolean} True if the Browser supports WebSockets
	 */
	function isWebSocketSupported() {
		
		return (window.WebSocket!==undefined 
			|| window.MozWebSocket!==undefined);
		
	};
	
	/**
	 * Returns the Browser specific WebSocket class
	 * 
	 * @method getWebSocket
	 * @return {Boolean}
	 */
	function getWebSocket() {
		
		return window.WebSocket || window.MozWebSocket;
		
	}
	
	// Execute constructor
	_init();
	
	// Return public members
	return {
		registerEvent: registerEvent,
		unregisterEvent: unregisterEvent,
		cancelEvent: cancelEvent,
		applyObject: applyObject,
		isWebSocketSupported: isWebSocketSupported,
		getWebSocket: getWebSocket
	};
	
};