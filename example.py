#!/usr/bin/env python
# -*- coding: utf-8 -*-

from instabot import InstaBot
import sys
arr = sys.argv
username = arr[1]
password = arr[2]
hashTags = arr[3].split(',')
likesPerDay = arr[4]
maxLikesForOneTag = arr[5]
followsPerDay = arr[6]
unfollowsPerDay = arr[7]
print 'username: ' + username
print 'password: ' + password
print 'hashTags: ' + str(hashTags)
print 'likesPerDay: ' + likesPerDay
print 'maxLikesForOneTag: ' + maxLikesForOneTag
print 'followsPerDay: ' + followsPerDay
print 'unfollowsPerDay: ' + unfollowsPerDay
# bot = InstaBot(login=arr[1], password=arr[2],
#                like_per_day=1000,
#                comments_per_day=0,
#                tag_list=tags,
#                max_like_for_one_tag=1000,
#                follow_per_day=0,
#                follow_time=0,
#                unfollow_per_day=150,
#                unfollow_break_min=0,
#                unfollow_break_max=0,
#                log_mod=0)

# bot.new_auto_mod()
