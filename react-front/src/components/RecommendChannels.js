import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const topics = [
  { id: "/m/04rlf", topic: "Music", parent: true },
  { id: "/m/02mscn", topic: "Christian music" },
  { id: "/m/0ggq0m", topic: "Classical music" },
  { id: "/m/01lyv", topic: "Country" },
  { id: "/m/02lkt", topic: "Electronic music" },
  { id: "/m/0glt670", topic: "Hip hop music" },
  { id: "/m/05rwpb", topic: "Independent music" },
  { id: "/m/03_d0", topic: "Jazz" },
  { id: "/m/028sqc", topic: "Music of Asia" },
  { id: "/m/0g293", topic: "Music of Latin America" },
  { id: "/m/064t9", topic: "Pop music" },
  { id: "/m/06cqb", topic: "Reggae" },
  { id: "/m/06j6l", topic: "Rhythm and blues" },
  { id: "/m/06by7", topic: "Rock music" },
  { id: "/m/0gywn", topic: "Soul music" },
  { id: "/m/0bzvm2", topic: "Gaming", parent: true },
  { id: "/m/025zzc", topic: "Action game" },
  { id: "/m/02ntfj", topic: "Action-adventure game" },
  { id: "/m/0b1vjn", topic: "Casual game" },
  { id: "/m/02hygl", topic: "Music video game" },
  { id: "/m/04q1x3q", topic: "Puzzle video game" },
  { id: "/m/01sjng", topic: "Racing video game" },
  { id: "/m/0403l3g", topic: "Role-playing video game" },
  { id: "/m/021bp2", topic: "Simulation video game" },
  { id: "/m/022dc6", topic: "Sports game" },
  { id: "/m/03hf_rm", topic: "Strategy video game" },
  { id: "/m/06ntj", topic: "Sports", parent: true },
  { id: "/m/0jm_", topic: "American football" },
  { id: "/m/018jz", topic: "Baseball" },
  { id: "/m/018w8", topic: "Basketball" },
  { id: "/m/01cgz", topic: "Boxing" },
  { id: "/m/09xp_", topic: "Cricket" },
  { id: "/m/02vx4", topic: "Football" },
  { id: "/m/037hz", topic: "Golf" },
  { id: "/m/03tmr", topic: "Ice hockey" },
  { id: "/m/01h7lh", topic: "Mixed martial arts" },
  { id: "/m/0410tth", topic: "Motorsport" },
  { id: "/m/07bs0", topic: "Tennis" },
  { id: "/m/07_53", topic: "Volleyball" },
  { id: "/m/02jjt", topic: "Entertainment", parent: true },
  { id: "/m/09kqc", topic: "Humor" },
  { id: "/m/02vxn", topic: "Movies" },
  { id: "/m/05qjc", topic: "Performing arts" },
  { id: "/m/066wd", topic: "Professional wrestling" },
  { id: "/m/0f2f9", topic: "TV shows" },
  { id: "/m/019_rr", topic: "Lifestyle", parent: true },
  { id: "/m/032tl", topic: "Fashion" },
  { id: "/m/027x7n", topic: "Fitness" },
  { id: "/m/02wbm", topic: "Food" },
  { id: "/m/03glg", topic: "Hobby" },
  { id: "/m/068hy", topic: "Pets" },
  { id: "/m/041xxh", topic: "Physical attractiveness [Beauty]" },
  { id: "/m/07c1v", topic: "Technology" },
  { id: "/m/07bxq", topic: "Tourism" },
  { id: "/m/07yv9", topic: "Vehicles" },
  { id: "/m/098wr", topic: "Society", parent: true },
  { id: "/m/09s1f", topic: "Business" },
  { id: "/m/0kt51", topic: "Health" },
  { id: "/m/01h6rj", topic: "Military" },
  { id: "/m/05qt0", topic: "Politics" },
  { id: "/m/06bvp", topic: "Religion" },
  { id: "/m/01k8wb", topic: "Knowledge" }
];



const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_YTAPI_KEY;

const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

export default function RecommendChannels() {


  <script src="https://accounts.google.com/gsi/client" async defer></script>;
  const google = window.google
  const [auth, setAuth] = useState(null)
  const [subs, setSubs] = useState(null)
  const [channel, setChannel] = useState(null)

  const handleCallbackResponse = (response) => {
    setAuth(response.access_token)
  }

  const revokeAccess = () => {
    google.accounts.oauth2.revoke(auth);
    setAuth(null)
    setSubs(null)
    setChannel(null)
  }

  let client = google.accounts.oauth2.initTokenClient({
    scope: SCOPES,
    client_id: CLIENT_ID,
    ux_mode: 'popup',
    callback: handleCallbackResponse,
  })
  const doAuth = () => {
    const getCode = () => {
      client.requestAccessToken()
    }
    getCode()
  }
  const getSubscriptions = () => {
    axios.get(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=200&access_token=${auth}`)
      .then((data) => {
        console.log(data.data)
        setSubs(data.data)
      }).catch((error) => {
        console.log(error)
      })
  }

  const getChannelDetails = () => {
    axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${auth}`)
    .then((data) => {
      setChannel(data.data.items[0].snippet)
      console.log(data.data.items)
    }).catch((error) => {
      console.log(error)
    })
  }

  const testGetSUBS = () => {

    const channelIds = subs.items.map((item) => {
      return item.snippet.resourceId.channelId
    }).map(item => {
      return axios.get(`https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&channelId=${item}&key=${API_KEY}`)
    })

    Promise.all(channelIds).then((all) => {
      let addedChannels = [...subs.items]
      let x = 0
      for (let i = 0; i < all.length; i++) {
        let channels = all[i].data.items.find((item => item.contentDetails?.channels))?.contentDetails?.channels
        if (channels) {
          // addedChannels.findIndex((ind) => ind.snippet.resourceId.channelId === all[i].data.items)
          const oldEntry = { ...addedChannels[x] }
          addedChannels.splice(x, 1)
          Promise.all(channels.map((item) => {
            return axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2C%20topicDetails&id=${item}&key=${API_KEY}`)
          })).then((reccomendedChannels) => {
            reccomendedChannels = reccomendedChannels.map((item) => {
              console.log(item.data.items[0].topicDetails)
              return item.data.items[0]
            })
            addedChannels.push({ ...oldEntry, channels: reccomendedChannels })
          })
        } else {
          x++
        }
      }
      setTimeout(() => {
        setSubs(prev => ({ ...prev, items: addedChannels }))
      }, 2000)
    })
  }

  return (
    <div className="App">
      hello
      <section>
        <nav className="navbar navbar-light">
        <ul className="navlist">
        <Link to="/">Home</Link>
        <Link to="/recommendchannels">Recommend Channels</Link>
        <button onClick={doAuth}>Log In</button>
      </ul>
        </nav>
        </section>
      <div>
        <button onClick={doAuth}>AUTH</button>
        <button onClick={getChannelDetails}>Channel Details</button>
        <button onClick={getSubscriptions}>SUBS</button>
        <button onClick={testGetSUBS}>TEST</button>
        <button onClick={revokeAccess}>LOG OUT</button>

      </div>

      <div>
      {channel && <div key={channel.customUrl}>
          <h2>{channel.title}</h2>
          <img src={channel.thumbnails.default.url} alt='channelimg'></img>
          </div>}
          <ul>
          {subs && subs.items.map((item) => {
            return (
              <li key={item.id}><h2>
                Sub List: {item.snippet.title}
                
              </h2>
                {item.channels && item.channels.map((item) => (
                  
                  <div key={item.id}>
                    <ul>
                    <li>-----<h2>{item.snippet.title}</h2></li>
                    <img src={item.snippet.thumbnails.default.url} alt='' />
                    <h5>Sub Count: {item.statistics.subscriberCount}</h5>
                    <h5>View Count: {item.statistics.viewCount}</h5>
                    {item.topicDetails && item.topicDetails.topicCategories.map((topicId) => (
                      <h5>{topicId.replaceAll('_', ' ').split('').splice(30, )}</h5>
                    ))}
                    </ul>
                  </div>
                  
                ))}
                
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
