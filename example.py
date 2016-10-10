#!/usr/bin/env python
# -*- coding: utf-8 -*-

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

bot = InstaBot(login=username, password=password,
               like_per_day=likesPerDay,
               comments_per_day=0,
               tag_list=hashTags,
               max_like_for_one_tag=maxLikesForOneTag,
               follow_per_day=followsPerDay,
               follow_time=0,
               unfollow_per_day=unfollowsPerDay,
               unfollow_break_min=0,
               unfollow_break_max=0,
               log_mod=0)

bot.new_auto_mod()
