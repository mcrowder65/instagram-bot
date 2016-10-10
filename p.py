# import sh
# string = sh.grep(sh.ps("aux"), 'mcrowder65')
# arr = string.split('\n');
# string = arr[0]
# print string

import os
command = "ps aux | grep '[p]ython example.py mcrowder65 EYoO66tUCDR1WCDDp5piKTXkiq hellooctober 96 0 24 0'"
os.system(command)
