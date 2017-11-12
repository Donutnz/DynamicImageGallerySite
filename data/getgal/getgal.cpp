#include <iostream>
#include <string>
#include <stdlib.h>
#include <string.h>

//Retrieve a list of files in a dir.
//All that file stuff was apparently pointless because the output of system() is to stdout. Just like cout.

using namespace std;

string targDir="./images/";

int main(){
	cout<<"Content-type:text/plain"<<endl<<endl;
	const char *qry=getenv("QUERY_STRING"); //Get the query string env variable.
	string com="ls ";

	//Check if the query on the end of the request (after the '?'. I.P.AD.DR?/this/bit) should be used to specify the directory.
	if(qry!=NULL){
		//Replace the header's ' ' placeholder (%20) with "\ ".
		for(int i=0; i<strlen(qry); i++){
			if(qry[i]=='%'){
				com+='\\';
				com+=' ';
				i=i+2;
			}
			else if(qry[i]=='('){
				com+="\\(";
			}
			else if(qry[i]==')'){
				com+="\\)";
			}
			else{
				com+=qry[i];
			}
			//cout<<com<<'\n';
		}

		//com+=qry;
	}
	else{
		com+=targDir;
	}

	system(com.c_str());
}




//Written by Donutnz
