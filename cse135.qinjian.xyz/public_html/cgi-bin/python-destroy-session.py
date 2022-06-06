#!/usr/bin/python3

from http import cookies

print("Cache-Control: no-cache")
print("Set-Cookie: destroyed")
print("Content-type: text/html\n")

# Body - HTML
print("<html>")
print("<head><title>Python Session Destroyed</title></head>")
print("<body>")
print("<h1>Python Session Destroyed</h1>")

# Links
print("<a href=\"/cgi-bin/python-sessions-1.py\">Back to Page 1</a>")
print("<br />")
print("<a href=\"/cgi-bin/python-sessions-2.py\">Back to Page 2</a>")
print("<br />")
print("<a href=\"/python-cgiform.html\">Python CGI Form</a>")

print("</body>")
print("</html>")
