#!/usr/bin/python3

import os

print('Cache-Control: no-cache')
print('Content-type:text/html\n')
print("<!DOCTYPE html><html><head><title>GET Request Echo</title></head><body><h1 align=\"center\">Get Request Echo</h1><hr>")

q_string = os.getenv('QUERY_STRING')
print(f'<b>Query String:</b> {q_string}<br />')

segments = q_string.split('&')
for segment in segments:
    name, val = segment.split('=')
    print(f"{name} = {val}<br />")

print("</body></html>")
