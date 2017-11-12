#include <iostream>
#include <string>
#include <regex>
#include <stdlib.h>

using namespace std;

int main(){
	string img;
	getline(cin, img);

	cout<<"Content-type:text/plain"<<endl<<endl;
	cout<<"Recieved "<<img<<'\n';

	string com="echo \"";
	com+=img;
	com+="\" >> ./favourites.txt";
	system(com.c_str());
}




//Written by Donutnz
