/**
 * Vortex client
 * 
 * @class vortexClient
 * @constructor
 * @param {vortexBrowser} browser Crossbrowser library
 * @param {Object} config Configuration
 * @module vortex
 */
function vortexClient(browser,config) {
	
	/**
	 * Configuration object
	 * 
	 * @property _config
	 * @type Object
	 * @private
	 */
	var _config={
		debug: false,
		host: '127.0.0.1',
		port: 8081,
		autoReconnect: true,
		listener: {
			update: function(data) {},
			connect: function(event) {},
			disconnect: function(event) {},
			error: function(event) {}
		}
	};
	
	/**
	 * WebSocket interface
	 * 
	 * @property _webSocket
	 * @type vortexWebSocket
	 * @private
	 */
	var _webSocket=null;
	
	/**
	 * Crossbrowser library
	 * 
	 * @property _browser
	 * @type vortexBrowser
	 * @private
	 */
	var _browser=null;
	
	/*
	 * Constructor
	 */
	function _init() {
		
		_browser=browser;
		
		_browser.applyObject(_config,config);
		
		_webSocket=new vortexWebSocket(
			_browser,
			{
				debug: _config.debug,
				host: _config.host,
				port: _config.port,
				listener: {
					open: _onOpen,
					close: _onClose,
					error: _onError,
					message: _onMessage
				}
			}
		);
		
	};
	
	/**
	 * Open event handler
	 * 
	 * @method _onOpen
	 * @param event DOMEvent
	 * @private
	 */
	function _onOpen(event) {
		
		_log('Connected');
		
		_config.listener.connect(event);
		
	};
	
	/**
	 * Close event handler
	 * 
	 * @method _onClose
	 * @param event DOMEvent
	 * @private
	 */
	function _onClose(event) {
		
		_log('Disconnected');
		
		_config.listener.disconnect(event);
		
	};
	
	/**
	 * Error event handler
	 * 
	 * @method _onError
	 * @param event DOMEvent
	 * @private
	 */
	function _onError(event) {
		
		_log('Error');
		
		_config.listener.error(event);
		
	};
	
	/**
	 * Message event handler
	 * 
	 * @method _onMessage
	 * @param event DOMEvent
	 * @private
	 */	
	function _onMessage(event) {
		
		// Split message into header and body
		var seperator=event.data.indexOf("\n\n");
		var header=event.data.substr(0,seperator);
		var body=event.data.substr(seperator+2);
		
		// Parse header vars
		var headerVars=JSON.parse(header);
		
		_log('Message');
		
		// Trigger update listener
		_config.listener.update({
			file: headerVars.file,
			path: headerVars.path,
			offset: headerVars.offset,
			length: headerVars.length,
			body: body
		});
		
	};
	
	/**
	 * Log message
	 * 
	 * @method _log
	 * @param msg Message
	 * @private
	 */
	function _log(msg) {
		
		if (!config.debug) return;
		
		console.log('Vortex Client: '+msg);
		
	};
	
	/**
	 * Connect
	 * 
	 * @method connect
	 */
	function connect()
	{
		_webSocket.connect();
	}
	
	/**
	 * Disconnect
	 * 
	 * @method disconnect
	 */
	function disconnect() {
		
		_webSocket.disconnect();
		
	}
	
	/**
	 * Returns the connection status
	 * 
	 * @method isConnected
	 * @return {Boolean} True when a connection is open
	 */
	function isConnected() {
		
		return _webSocket.isConnected();
		
	};
	
	// Execute constructor
	_init();
	
	// Return public members
	return {
		connect: connect,
		disconnect: disconnect,
		isConnected: isConnected
	};
	
};