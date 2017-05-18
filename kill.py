import os
import sys
import datetime
arr = sys.argv
addOn = arr[1]
username = arr[2]
filename = 'logs.txt'
target = open(filename, 'a')

target.write(username + ' stopped at ' + str(datetime.datetime.now()) + '\n');

command = "kill -9 " + addOn
os.system(command)
