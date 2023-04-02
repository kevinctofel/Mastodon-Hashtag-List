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

- 3/21/2023 -- Revamped the POC to get a stream of Mastodon status and output them to the console. 
![mastodon stream](https://user-images.githubusercontent.com/16373212/226764666-b934175a-d626-4e17-a04f-60a8989b0fea.png)

- 3/23/2032 -- Added real time status messages to a web page. Video below; first 16 seconds is waiting for someone to post a status.

https://user-images.githubusercontent.com/16373212/227327582-b4ee6f20-f178-43eb-8cb5-995ff111efff.mp4

- 3/30/2023 -- Now parsing the stream to get hashtags only. Storing them in a flat file with the intention of storing in a database. Not yet passing this data to a web page.

![Screenshot from 2023-03-30 10-41-38](https://user-images.githubusercontent.com/16373212/228873963-d34e8f11-18c1-4d66-88ba-16ea65bb8cd7.jpg)

- 4/1/2023 -- Added data validation so the code seems to be running more stable. Ran for 30 minutes and logged about 1,900 hashtags into the database.db file. 

![Mastodon hashtags](https://user-images.githubusercontent.com/16373212/229327439-0aab998a-cd7a-433f-8294-46f7442be1ac.jpeg)

