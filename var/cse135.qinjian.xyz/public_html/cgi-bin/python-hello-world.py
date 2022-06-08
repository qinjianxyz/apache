#!/usr/bin/python3

from datetime import datetime
import os

print('Cache-Control: no-cache')
print('Content-type:text/html\n')

print('<html>')
print('<head>')
print('<title>Hello, Python!</title>')
print('</head>')
print('<body>')
print('<h1>Jian was here - Hello, Python!</h1>')
print('<p>This page was generated with the Python programming langauge</p>')
print(f"<p>Current Time: {datetime.now()}</p>")
print(f"<p>Your IP Address: {os.getenv('REMOTE_ADDR')}</p>")
print('</body>')
print('</html>')
