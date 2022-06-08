#!/usr/bin/python3

import os

print('Cache-Control: no-cache')
print('Content-type:text/html\n')

print("<!DOCTYPE html><html><head><title>Environment Variables</title></head><body><h1 align=\"center\">Environment Variables</h1><hr>")

vars = dict(os.environ)

for key in vars:
    print(f"<b>{key}:</b> {vars[key]}<br />")
