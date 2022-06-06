#!/usr/bin/python3

from datetime import datetime
import os

print('Cache-Control: no-cache')
print('Content-type:text/json\n')

time = datetime.now()
ip_addr = os.getenv('REMOTE_ADDR')

message = {
    'title': 'Hello, Python!',
    'heading': 'Hello Python!',
    'message': 'This page was generated with the Python programming language',
    'time': time,
    'IP': ip_addr
}

print(message)