import os
import sys
arr = sys.argv
addOn = arr[1]
command = "ps aux | grep " + addOn
os.system(command)