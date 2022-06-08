#!/usr/bin/python3

import os

print('Cache-Control: no-cache')
print('Content-type:text/html\n')

print('<!DOCTYPE html>')
print("<html><head><title>Python Sessions</title></head><body><h1>Python Sessions Page 2</h1>")

cookie = os.getenv("HTTP_COOKIE")
keyword = str(cookie).split(";")[0] if cookie is not None else ""
if keyword is not None and keyword != "destroyed":
    print(f"<p><b>Name:</b> {keyword}")
else:
    print('<p><b>Name:</b> You do not have a name set</p>')

print("<br/><br/><a href=\"/cgi-bin/python-sessions-1.py\">Session Page 1</a><br/><a href=\"/python-cgiform.html\">Python CGI Form</a><br /><form style=\"margin-top:30px\" action=\"/cgi-bin/python-destroy-session.py\" method=\"get\"><button type=\"submit\">Destroy Session</button></form></body></html>")
