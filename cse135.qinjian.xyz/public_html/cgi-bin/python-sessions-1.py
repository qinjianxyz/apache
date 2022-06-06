#!/usr/bin/python3

import cgi
import os

print('Cache-Control: no-cache')

form = cgi.FieldStorage()
form_name = form.getvalue('username')
if form_name is not None and len(form_name) > 0:
    print(f"Set-Cookie: {form_name}")
print('Content-type:text/html\n')


print('<!DOCTYPE html>')
print("<html><head><title>Python Sessions</title></head><body><h1>Python Sessions Page 1</h1>")
cookie = os.getenv("HTTP_COOKIE")
keyword = str(cookie).split(";")[0] if cookie is not None else ""
if form_name is not None and len(form_name) > 0:
    print(f"<p><b>Name:</b> {form_name}")
elif keyword is not None and keyword != "destroyed":
    print(f"<p><b>Name:</b> {keyword}")
else:
    print('<p><b>Name:</b> You do not have a name set</p>')

print("<br/><br/><a href=\"/cgi-bin/python-sessions-2.py\">Session Page 2</a><br/><a href=\"/python-cgiform.html\">Python CGI Form</a><br /><form style=\"margin-top:30px\" action=\"/cgi-bin/python-destroy-session.py\" method=\"get\"><button type=\"submit\">Destroy Session</button></form></body></html>")
