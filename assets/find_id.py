import re
import urllib.request
html = urllib.request.urlopen('https://drive.google.com/drive/folders/1MkQR4sBUc5CTebXTZLXw71fdAU5u0eeg').read().decode('utf-8')
for match in re.findall(r'\["([a-zA-Z0-9_-]{25,})","([^"]+)"\]', html):
    if "Man Ray" in match[1]:
        print("FOUND:", match[0])
