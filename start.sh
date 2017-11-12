#!/bin/bash
#Starts the image gallary server.

echo "Starting..."

#Please make sure you have thttpd installed.

if [[ $# > 0 ]]; then
	sudo thttpd -u $1 -C ./GM_config
else
	sudo thttpd -u nobody -C ./GM_config
fi

echo "Started."
