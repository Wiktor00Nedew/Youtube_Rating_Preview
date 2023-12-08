# Youtube Rating Preview - Chrome Extension

A small extension that allows you to see likes and dislikes counts, before clicking on Youtube video.

This extension uses https://returnyoutubedislike.com/ API.

Sadly, due to Youtube removing dislikes counter from their API, I have to use third party API which is rate limited. Due to this you can only see ratings of 100 videos per minute and 10 000 per 24 hours. 

To optimise experience the extension is caching the counts for 2 days by default for a video. This behaviour will be customisable in the future in the extension popup.
