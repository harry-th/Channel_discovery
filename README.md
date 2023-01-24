# Channel_discovery
This project is one uses the YouTube API to recommend channels

You could clone this project and then `npm i` `npm start`. But you wouldn't have permission from Youtube to use the their auth0 api, and would need to create your own api keys for the project.

## So Here Are Some Pictures:
Landing page.\
!['landing'](https://github.com/harry-th/Channel_discovery/blob/main/react-front/screenshots/landing.PNG?raw=true)\
signin with google.\
!['signin'](https://github.com/harry-th/Channel_discovery/blob/main/react-front/screenshots/signin.PNG?raw=true)\
Displays your subscriptions, with information about you or the channel in the panel on the left when you mouse over.\
![home](https://github.com/harry-th/Channel_discovery/blob/main/react-front/screenshots/home.PNG?raw=true)\
You can sort the channels by subs or categories or a mix of the two.\
!['sorted by category'](https://github.com/harry-th/Channel_discovery/blob/main/react-front/screenshots/sorted%20by%20category.PNG?raw=true)\
You see only the channels in each category by clicking on the pie graph which shows the relative proportion of the types of channels you are subcribed to.\
!['select'](https://github.com/harry-th/Channel_discovery/blob/main/react-front/screenshots/select.PNG?raw=true)\
You can then query the api and access all the subcriptions and reccomended channels of your subcriptions. You can then sort these by how often they appear, who they came from, their category, or their sub count as well as a mix of each of these.\
You can visit these channels by clicking on their thumbnail image shown in the left panel.\
!['reccomended channels'](https://github.com/harry-th/Channel_discovery/blob/main/react-front/screenshots/reccomended%20channels.PNG?raw=true)

The shortcomings of this project is the ability for it to be authorized by google for general use. And the number of api calls it has to make to get this information. Given that you are allowed 10,000 api calls daily and if you have 30-40 subscriptions it may need to make 500 or so calls.

### Thanks For Checking it out!
