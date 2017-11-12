# GalMaker

## Description
A simple website intended to run on thttpd that dynamically generates an image gallery from a given directory of images. Uses C++ cgi scripts.
NOTE: This project is very WIP. Whether it works or not is dependent on the day, what mistakes I've made in the last push, and the whims of Cthulhu. Use at your own risk.

## Usage
1. Download and make thttpd.
2. Place images, directories containing images, and/or symlinks to directories containing images in the ./date/images directory. 
3. Run the start.sh command with a user as the only arg.
4. Go to your IP and happy browsing.
5. To stop the server, run stop.sh. Make sure to check that it did stop useing top or just going to the IP. If it didn't there may have been two instances running.

## Software
* [thttpd](https://acme.com/software/thttpd/) - reccomended webserver. Just use the default config when generating it.
* [httpie](https://httpie.org/) - really handy tool to test GET/POST/etc. web requests.

## Current issues
* The select image thing seems to be hanging on to entries even after wiping.
* Mess.

## Files:
* start.sh - starts the server.
* stop.sh - stops the server.
* GM_config - config options (generally leave this alone)
* data - contains the main content stuff.
* logs - what it says on the tin.

### ./Data/
* index.html - homepage. A mess.
* styles.css - styles for the homepage.
* getdirs - return a list of directories in images dir.
* getgal - return a list of images from the dir as specified in the GET request query (/getgal.cgi?query).
* faver - write some text to the favourites text file. Old feature, likely remove.
* images - directory from which to locate images to be displayed. Put in images, image directories, and symlinks to image directories. Make sure read permissions for all images that are intended for display are other readable (chmod o+r ./*).
