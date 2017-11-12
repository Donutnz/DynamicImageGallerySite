var defaultURL=window.location.href;
var reqAddr=defaultURL;
var targ=document.getElementById("galdiv");
var images=[];
var defDir="./images"; //Default dir to search if one has not been selected from the dropdown.
var imgCheck=new RegExp(".jpeg|.jpg|.png|.gif");
var imageRootDir="./images";
var curPos=0;

//Runs on page load.
function onStart(){
	document.getElementById("imgSearch").value="";
	makeFileList();
	requestIms();
}

//Central data requesting function.
function requestData(ext, callback){
	var req=new XMLHttpRequest({mozSystem:true});

	req.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			callback(this.responseText);
		}
	}

	req.open("GET", reqAddr+ext, true);
	req.send();
}

function dirChanged(){
	requestIms();
	document.getElementById("imgSearch").value="";
}

function imgClicked(img){
	curPos=images.indexOf(img);
	if(document.getElementById("reportMode").checked){
		addFaver(img);
	}
	else if(document.getElementById("downloadMode").checked){
		window.open(reqAddr+document.getElementById("fleSel").value+"/"+img);
	}
	else if(document.getElementById("browseMode").checked){
		showImage();
	}
}

function interpKey(event){
	switch(event.which){
		case 13:
			selectImg();
			break;
		case 37:
			curPos-=1;				
			if(curPos<0){
				curPos=0;
			}
			showImage();
			break;
		case 38:

			break;
		case 39:
			curPos+=1;
			if(curPos>images.length){
				curPos=0;
			}
			showImage();
			break;
		case 40:
			break;
	}
}

function navIms(direction){
	if(curPos<0){
		console.log("Image search empty");
		return;
	}

	if(direction==0){
		curPos-=1;
	}

}

//Make the file selecter list.
function makeFileList(){
	requestData("getdirs.cgi?./images/", function(dirs){

		dirs=dirs.trim().split("\n");

		for(var d=0; d<dirs.length; d++){ //>
			var opt=document.createElement("option");
			opt.value=dirs[d];
			opt.text=dirs[d];
			document.getElementById("fleSel").add(opt);
		}
	});
}

//Format the raw string of image names into an html friendly string then display them. 
function imgFormat(){
	var formStr="";

	//console.log(images);
	var maxSize=20;
	if(document.getElementById("galLen").value > 0){
		maxSize=document.getElementById("galLen").value;
	}

	var rand=document.getElementById("doRandom").checked;
	var min=0;
	var max=images.length;
	var used=[];
	var skips="";
	var imID=Math.floor(Math.random() * (max - min) + min);
	for(var i=0; i<images.length && i < maxSize; i++){ //> This is here because of nano's code colouring. It's based on the file extension so it thinks this is html. Heh.
		if(rand){
			while(used.indexOf(imID)!=-1){
				imID=Math.floor(Math.random() * (max - min) + min);
			}
			used.push(imID);
		}
		else{
			imID=i;
		}
		//console.log("ImID: "+imID);
		if(imgCheck.test(images[imID])){
			//Format for each image.
			formStr+="<img ";
			formStr+="onclick=\"imgClicked(\'"+images[imID]+"\')\" ";
			formStr+="alt=\""+images[imID]+"\" ";
			formStr+="title=\""+images[imID]+"\" ";
			formStr+="src=\""+reqAddr+document.getElementById("fleSel").value+"/"+images[imID]+"\" ";
			formStr+="class=\"galImg\" ";
			formStr+="id=\""+images[imID]+"\"";
			formStr+=">";
		}
		else{
			console.log("Skipped: "+images[imID]);
			skips+="<li>"+images[imID]+"</li>";
		}
	}

	//console.log(formStr);
	if(formStr.length>0){
		targ.innerHTML=formStr;
	}
	else{
		targ.innerHTML="No images found. Other stuff found: <br><ul>"+skips+"</ul>";
	}

	//makeImgList();
}

function makeImgList(){
	document.getElementById("imgLst").innerHTML="";
	var opts="";

	for(var i=0; i<images.length; i++){ //>
		if(imgCheck.test(images[i])){
			opts+="<option value=\'"+images[i]+"\'>";
		}
	}

	document.getElementById("imgLst").innerHTML=opts;
	console.log("Made images");
}

function selectImg(){
	curPos=images.indexOf(document.getElementById("imgSearch").value);
	//var img=document.getElementById("imgSearch").value;
	showImage();
}

function showImage(){
	var img=images[curPos];
	console.log("Show: "+img);
	if(imgCheck.test(img)){
		targ.innerHTML="<h3>"+img+"</h3><img src=\""+reqAddr+document.getElementById("fleSel").value+"/"+img+"\" class=\"mainImg\" onclick=\"imgClicked("+img+") title=\""+img+"\">";
	}
}

//Get the images.
function requestIms(){
	console.log("Image selection changed");
	images=[];

	if(document.getElementById("fleSel").value==""){
		requestData("getgal.cgi?"+defDir+"/", setImgList);
	}
	else{
		requestData("getgal.cgi?"+document.getElementById("fleSel").value+"/", setImgList);
	}
}

function setImgList(ims){
	images=ims.trim().split("\n");
	console.log("Ims: "+images);
	document.getElementById("galLen").placeholder="Max: "+images.length;
	makeImgList();
	genGal();
}

//Generate the gallery.
function genGal(){
	console.log("Requested");
	imgFormat();
	console.log("Images: "+images);
}

//Click an image to write to the favourites.txt file.
function addFaver(fv){
	var pst=new XMLHttpRequest({mozSystem:true});

	pst.open("POST", reqAddr+"faver.cgi", true);

	pst.setRequestHeader("content-type", "text/plain");

	pst.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			console.log("Done: "+pst.responseText);
		}
	};

	pst.send(fv);
}