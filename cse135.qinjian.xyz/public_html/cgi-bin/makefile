SRCS=$(wildcard *.c)

OBJS=$(SRCS:.c=.cgi)

all: $(OBJS)

%.cgi: %.c
	gcc -o $@ $<

clean:
	rm -f *.cgi
