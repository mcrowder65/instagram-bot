import os
import sys
arr = sys.argv
addOn = arr[1]

command = "kill -9 " + addOn
os.system(command)