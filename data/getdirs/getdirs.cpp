#include <iostream>
#include <string>
#include <stdlib.h>
#include <fstream>
#include <string.h>

using namespace std;
//Retrieve a list of dirs in a given dir.
//This command returns the actual value apparently.
//find -L ./ -type d -name "*"
string defaultDir="./images/";

int main(){
	cout<<"Content-type:text/plain"<<endl<<endl;
	const char *qry=getenv("QUERY_STRING");
	string comStart="find -L ";
	string shortCom=comStart;

	if(qry!=NULL){
		shortCom+=qry;
	}
	else{
		shortCom+=defaultDir;
	}

	shortCom+=" -type d -name \"*\"";
	//shortCom+="* | egrep directory | sed s/\"directory \"/\"\"/g";

	system(shortCom.c_str());
}




//Written by Donutnz
