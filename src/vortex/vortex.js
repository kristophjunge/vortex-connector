/**
 * Vortex connector
 * 
 * Use this class to create a Vortex connection:
 * 
 *	new vortex({
 *		host: '127.0.0.1',
 *		port: 8081,
 *		listener: {
 *			update: function(event) {
 *				console.clear();
 *				eval(event.body);
 *			}
 *		}
 *	});
 * 
 * The following configuration options are available:
 * 
 * <b>host</b> String</br> 
 * IP or Hostname to connect to. Default 127.0.0.1.
 * 
 * <b>port</b> Integer</br> 
 * Port to use. Default 8081.
 * 
 * <b>debug</b> Boolean</br> 
 * Enable debug messages. Default false.
 * 
 * <b>autoConnect</b> Boolean</br> 
 * Connect upon creation without using the connect command. Default true.
 * 
 * <b>autoReconnect</b> Boolean</br> 
 * Automatically reconnect when connection is lost. Default true.
 * 
 * <b>listener</b> Object</br>
 * Event listeners. The supported events are connect, disconnect, update, error.
 * 
 * @class vortex
 * @constructor
 * @param {Object} config
 * @module vortex
 */
function vortex(config) {
	
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
		autoConnect: true,
		autoReconnect: true,
		listener: {}
	};
	
	/**
	 * Crossbrowser library
	 * 
	 * @property _browser
	 * @type vortexBrowser
	 * @private
	 */
	var _browser=null;
	
	/**
	 * Vortex client
	 * 
	 * @property _client
	 * @type vortexClient
	 * @private
	 */
	var _client=null;
	
	/*
	 * Constructor
	 */
	function _init() {
		
		// Create crossbrowser library instance
		_browser=new vortexBrowser();
		
		// Extend default config with user config
		_browser.applyObject(_config,config);
		
		// Create vortex client instance
		_client=new vortexClient(
			_browser,
			{
				debug: _config.debug,
				host: _config.host,
				port: _config.port,
				autoReconnect: _config.autoReconnect,
				listener: {
					update: _config.listener.update
				}
			}
		);
		
		_log('Loaded');
		
		if (_config.autoConnect) {
			connect();
		}
		
	};
	
	/**
	 * Log message
	 * 
	 * @method _log
	 * @param {String} msg Message
	 * @private
	 */
	function _log(msg) {
		
		if (!_config.debug) return;
		
		console.log('Vortex: '+msg);
		
	};
	
	/**
	 * Connect to Vortex server
	 * 
	 * @method connect
	 */
	function connect() {
		
		_client.connect();
		
	};
	
	/**
	 * Disconnect from Vortex server
	 * 
	 * @method disconnect
	 */
	function disconnect() {
		
		_client.disconnect();
		
	};
	
	/**
	 * Returns the connection status
	 * 
	 * @method isConnected
	 * @return {Boolean} True when a connection is open
	 */
	function isConnected() {
		
		return _client.isConnected();
		
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