#!/usr/bin/env python
# -*- coding: utf-8 -*-
import datetime



from instabot import InstaBot
import sys
arr = sys.argv
username = arr[1]
password = arr[2]
hashTags = arr[3].split(',')
likesPerDay = int(arr[4])
maxLikesForOneTag = int(arr[5])
if maxLikesForOneTag == 0:
     maxLikesForOneTag = 100000
followsPerDay = int(arr[6])
unfollowsPerDay = int(arr[7])

filename = 'logs.txt'
target = open(filename, 'a')

target.write(username + ' started at ' + str(datetime.datetime.now()) + '\n');

target.close()
#
# bot = InstaBot(login=username, password=password,
#                like_per_day=likesPerDay,
#                comments_per_day=0,
#                tag_list=hashTags,
#                max_like_for_one_tag=maxLikesForOneTag,
#                follow_per_day=followsPerDay,
#                follow_time=0,
#                unfollow_per_day=unfollowsPerDay,
#                unfollow_break_min=0,
#                unfollow_break_max=0,
#                log_mod=0)
print 'started'
bot = InstaBot(
    login=username,
    password=password,
    like_per_day=likesPerDay,
    comments_per_day=0,
    tag_list=hashTags,
    tag_blacklist=[],
    user_blacklist={},
    max_like_for_one_tag=maxLikesForOneTag,
    follow_per_day=followsPerDay,
    follow_time=0,
    unfollow_per_day=unfollowsPerDay,
    unfollow_break_min=0,
    unfollow_break_max=0,
    log_mod=0,
    proxy='',
    # Use unwanted_username_list to block usernames containing a string
    ## Will do partial matches; i.e. 'mozart' will block 'legend_mozart'
    ### 'free_followers' will be blocked because it contains 'free'
    unwanted_username_list=[],
    unfollow_whitelist=[])

bot.new_auto_mod()
