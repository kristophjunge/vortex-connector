# Vortex JavaScript Connector

JavaScript connector for the [Vortex JavaScript Editor](https://github.com/kristophjunge/vortex-editor).

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


##About

This JavaScript library is the counterpart of the Vortex JavaScript Editor.

For more information on what it is visit the [Vortex JavaScript Editor](https://github.com/kristophjunge/vortex-editor) project.


##Usage

Download a build from [here](http://dev.kristophjunge.com/vortex-connector/build/latest/).

Load the Vortex JavaScript library.

    <script src="vortex.js" type="text/javascript"></script>

Create an instance of the Vortex class.

    <script>
        var vortexConnector=new vortex({
            host: '127.0.0.1',
            port: 8081,
            listener: {
                update: function(event) {
                    eval(event.body);
                }
            }
        });
    </script>

##Documentation

The latest code documentation is available [here](http://dev.kristophjunge.com/vortex-connector/doc/latest/).


##Build

The code documentation and the minified JavaScript build can be created using make.

    make doc
    make build

The build script requires [YUI Compressor](http://yui.github.io/yuicompressor/) and [YUI Doc](http://yui.github.com/yuidoc/) which have to be configured in the makefile.