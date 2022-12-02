import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_YTAPI_KEY;

const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

function Home(){

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



  useEffect(() => {
    const getChannelDetails = () => {
      axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${auth}`)
      .then((data) => {
        setChannel(data.data.items[0].snippet)
        console.log(data.data.items)
      }).catch((error) => {
        console.log(error)
      })
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

    getChannelDetails()
    getSubscriptions()

  }, [auth])


    return (
      <main>
        <section>
        <nav className="navbar navbar-light">
        <ul className="navlist">
        <Link to="/">Home</Link>
        <Link to="/recommendchannels">Recommend Channels</Link>

        <button onClick={doAuth}>Log In</button>
      </ul>
        </nav>
        </section>
      <div className="App">
        <h1>Welcome to Youtube Discovery</h1>
      </div>
      <div>
         </div>
         {channel && <div key={channel.customUrl}>
          <h2>{channel.title}</h2>
          <img src={channel.thumbnails.default.url} alt='channelimg'></img>
          </div>}
      <ul>
          {subs && subs.items.map((item) => {
            return (
              <li key={item.id}><h2>
                {item.snippet.title}
              </h2>
                {item.channels && item.channels.map((item) => (
                  <p key={item.id}><img src={item.snippet.thumbnails.default.url} alt='' />  {item.snippet.title} </p>
                ))}
              </li>
            )
          })}
        </ul>
      {/* <div id="subscription-data" class="col s6">{getSubscriptions()}</div> */}

       </main> 
    );
  }


export default Home;