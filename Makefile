CC=clang++
CFLAGS= -Wall -Werror
INCLUDE=./include

build:
	${CC} ${CFLAGS} -I ${INCLUDE} main.cpp -o app.out;

clean:
	rm -rfv *.out