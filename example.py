#!/usr/bin/env python
# -*- coding: utf-8 -*-

from instabot import InstaBot
import sys
arr = sys.argv
if len(arr) < 4:
     throw('not enough arguments!!!!!')
tags = arr[3].split(',');
print tags
bot = InstaBot(login=arr[1], password=arr[2],
               like_per_day=1000,
               comments_per_day=0,
               tag_list=tags,
               max_like_for_one_tag=1000,
               follow_per_day=0,
               follow_time=0,
               unfollow_per_day=150,
               unfollow_break_min=0,
               unfollow_break_max=0,
               log_mod=0)

bot.new_auto_mod()
