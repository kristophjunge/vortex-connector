# Vortex JavaScript Connector Makefile
# 
# Usage:
# 	make doc
#	make build
#	make all

# Vars
TARGET_SRC = ./src/vortex/vortex.js \
	./src/vortex/browser.js \
	./src/vortex/websocket.js \
	./src/vortex/client.js
TARGET_JS=./build/vortex.js
TARGET_JSMIN=./build/vortex.min.js

# Executables
BIN_YUIC=yuicompressor
BIN_YUIDOC=yuidoc

# Targets

all: clean doc build

clean:
	rm -rf ./build
	rm -rf ./doc
	mkdir -p ./build

doc:
	$(BIN_YUIDOC) src/

build: $(TARGET_JS) $(TARGET_JSMIN)

$(TARGET_JS): $(TARGET_SRC)
	cat $^ > $@

$(TARGET_JSMIN): $(TARGET_JS)
	$(BIN_YUIC) $< -o $@

.PHONY: clean doc build