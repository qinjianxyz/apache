#!/usr/bin/python3

import os
import sys

print('Cache-Control: no-cache')
print('Content-type:text/html\n')
print('<!DOCTYPE html><html><head><title>POST Request Echo</title></head><body><h1 align="center">General Request Echo</h1><hr>')

protocol = os.getenv("SERVER_PROTOCOL")
method = os.getenv("REQUEST_METHOD")
data = sys.stdin.read()
if data is None:
    data = "(null)"
print(f'Protocol: {protocol}<br/></body></html>')
print(f'Method: {method}<br/></body></html>')
print(f'Message Body: {data}<br/></body></html>')
