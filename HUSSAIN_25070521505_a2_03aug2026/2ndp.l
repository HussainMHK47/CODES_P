%{
#include<stdio.h>

int lines=0;
int words=0;
int spaces=0;
int keywords=0;
int identifiers=0;
int comments=0;
%}

%option noyywrap

keyword int|float|char|double|if|else|for|while|do|return|break|continue|void|switch|case|default|long|short|struct

%%

"//".* {comments++;}

"/*"([^*]|\n|(\*+([^*/]|\n)))*"*"+"/" {comments++;}

{keyword} {keywords++;words++;}

[a-zA-Z_][a-zA-Z0-9_]* {identifiers++;words++;}

[0-9]+ {words++;}

[ \t] {spaces++;}

\n {lines++;}

. ;

%%

int main()
{
printf("Enter C program:\n");
printf("Press Ctrl+D when finished.\n\n");

yylex();

printf("\nLines = %d\n",lines);
printf("Words = %d\n",words);
printf("Spaces = %d\n",spaces);
printf("Keywords = %d\n",keywords);
printf("Identifiers = %d\n",identifiers);
printf("Comments = %d\n",comments);

return 0;
}
