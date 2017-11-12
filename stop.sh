#!/bin/bash
#Stop the gallery server.

confirm=""

read -ep "Are you sure you want to stop the image gallery server? [Y/n]: " confirm

if [[ $confirm =~ [Yy] ]]; then
	sudo kill $(cat /var/run/gal.pid)
	echo "Server stopped."
else
	echo "Cancelled"
fi
