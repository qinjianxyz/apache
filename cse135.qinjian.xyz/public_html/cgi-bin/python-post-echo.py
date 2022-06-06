#!/usr/bin/python3

import os
import sys

print('Cache-Control: no-cache')
print('Content-type:text/html\n')
print('<!DOCTYPE html><html><head><title>POST Request Echo</title></head><body><h1 align="center">POST Request Echo</h1><hr>')

data = sys.stdin.read()

print(f'<b>Message Body:</b> {data}<br/></body></html>')
