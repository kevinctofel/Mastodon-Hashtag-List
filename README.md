# Mastodon-Hashtag-List
A tool to determine the most used hashtags on a Mastodon instance

# Purpose
New Mastadon users must choose a server with little more information than a general description. To assist new users, a web page showing the top x# of recently used hashtags would provide more information. 

# High level concept
Using the Mastodon API, you can [programmatically retreive the public timeline](https://docs.joinmastodon.org/client/public/#timelines) for a single Mastodon instance. The timeline is an ordered list of statuses, which may or may not included one or more hashtags. 

An example status object with two hashtags:

![Tags in a Mastodon post object](https://user-images.githubusercontent.com/16373212/221699271-0ab5f6d6-0489-41f6-9aff-5f1d567655a1.jpg)

This tool will pull status objects from the public timeline, parse the objects and look for hashtags in the status objects. A global object will keep a running total of times each hashtag is used, over some specified period of time. This data will populate a public web page showing a list of the most used hashtags for that instance during the specified period of time. Each hashtag on that public page will be [linked to the hashtag URL](https://docs.joinmastodon.org/methods/tags/#get) for that instance.

# Possible alternatives

- Surface "Trending Tags" - Each instance can show [trending tags](https://docs.joinmastodon.org/entities/Tag/#trendable), however, this may not be ideal for new users. It appears that Mastodon admins must allow a tag to be "trendable" so it appears.
- Use the Tag history for a subset of statuses on the public timeline. This will reduce the number of API calls because the full public timeline will not need to be queried. [Tag history](https://docs.joinmastodon.org/entities/Tag/#history) shows the number of uses of a tag over a set period of time, typically one week.

# To do
- Create a simple method to parse a small amount of public tags and calculate the totals for each tag used. 
- Check API limits for the above outlined approach. (Found on 2/27/23: [300 calls per 5 minutes per IP address or account](https://docs.joinmastodon.org/api/rate-limits/#per-ip))
- Mock up a public web page for the tag data.
- Reach out to Eugen and see if there's some private API / feature to accomplish the scope of this proposal.

# Updates
- 2/27/2023 -- Basic NodeJS functionality as POC. Pull the latest 20 statuses and show the first tag (if any) in any statuses using a hashtag. 
