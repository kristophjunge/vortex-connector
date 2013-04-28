/**
 * Websocket interface
 * 
 * @class vortexWebSocket
 * @constructor
 * @param {vortexBrowser} browser Crossbrowser library
 * @param {Object} config Configuration
 * @module vortex
 */
function vortexWebSocket(browser,config) {
	
	/**
	 * Configuration object
	 * 
	 * @property _config
	 * @type Object
	 * @private
	 */
	var _config={
		debug: false,
		host: '',
		port: 0,
		application: '',
		listener: {
			open: function(event) {},
			message: function(event) {},
			error: function(event) {},
			close: function(event) {}
		}
	};
	
	/**
	 * WebSocket target url
	 * 
	 * @property _url
	 * @type String
	 * @private
	 */
	var _url='';
	
	/**
	 * @property _socket
	 * @type DOMWebSocket
	 * @private
	 */
	var _socket=null;
	
	/**
	 * Indicates that a connection is open
	 * 
	 * @property _connected
	 * @type Boolean
	 * @private
	 */
	var _connected=false;
	
	/**
	 * Indicates that the WebSocket feature is enabled in the browser
	 * 
	 * @property _enabled
	 * @type Boolean
	 * @private
	 */
	var _enabled=false;
	
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
		
		_enabled=_browser.isWebSocketSupported();
		
		if (!_enabled) {
			_log('Websockets not supported by Browser');
		}
		
	}
	
	/**
	 * Log message
	 * 
	 * @method _log
	 * @param msg Message
	 * @private
	 */
	function _log(msg) {
		
		if (!_config.debug) return;
		
		console.log('Vortex WebSocket: '+msg);
		
	};
	
	/**
	 * Connect WebSocket
	 * 
	 * @method connect
	 */
	function connect() {
		
		_url='ws://'+_config.host+':'+_config.port+'/'+_config.application;
		
		_log('Connect to '+_url);
		
		var webSocket=_browser.getWebSocket();
		
		_socket=new webSocket(_url);
		
		_browser.registerEvent(
			_socket,
			'open',
			function(open) {
				_connected=true;
				_log('Connected');
				_config.listener.open(open);
			}
		);
		
		_browser.registerEvent(
			_socket,
			'message',
			function(message) {
				_log('Message');
				_config.listener.message(message);
			}
		);
		
		_browser.registerEvent(
			_socket,
			'error',
			function(error) {
				_log('Error');
				_config.listener.error(error);
			}
		);
		
		_browser.registerEvent(
			_socket,
			'close',
			function(close) {
				_socket=null;
				_connected=false;
				_log('Disconnected');
				_config.listener.close(close);
			}
		);
		
	};
	
	/**
	 * Disconnect WebSocket
	 * 
	 * @method disconnect
	 */
	function disconnect() {
		
		if (!this._connected) {
			_log('Error: Not connected');
		} else {
			this._socket.close();
			this._connected=false;
		}
		
	};

	/**
	 * Returns the connection status
	 * 
	 * @method isConnected
	 * @return {Boolean} True when a connection is open
	 */
	function isConnected() {
		
		return _connected;
		
	};
	
	/**
	 * Send a message
	 * 
	 * @method send
	 * @param {String} data Message
	 */
	function send(data) {
		
		this._socket.send(data);
		
	};
	
	// Execute constructor
	_init();
	
	// Return public members
	return {
		connect: connect,
		disconnect: disconnect,
		send: send
	};
	
};