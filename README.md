# Channel_discovery
This project is one that can access your subscriber list on youtuber and then pull and organize the 'reccomended channels' and 'subscriptions'
channel lists hosted on your subscriptions 'channel lists'
To run this project
first clone it https://github.com/harry-th/Channel_discovery
and then install dependencies
`npm i`
and then run
`npm start`
Unfortunately it won't work in terms of accessing your lists as google needs our app to officially verified in order to have access to the 
oAuth2 authenticated youtube api.
If you were so inclined that you still wanted to see how it works you could make and account here: https://console.cloud.google.com/
Follow this tutorial: https://developers.google.com/youtube/v3/getting-started
create a .env with your own youtube api key with your email enabled as suitable for `testing` and generate a client_id with both 
`http://localhost` and `http://localhost:3000` as Authorized JavaScript origins and `Authorized redirect Urls.`
You can then see the app work with the youtube subscription list that is on that gmail account.

Using chartJs and React, allows the organization of your subscriptions, and their reccomended channels by subsriberCount, Category, and a combination of both.
