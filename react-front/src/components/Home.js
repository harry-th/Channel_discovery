import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const topics = [
  { id: '/m/04rlf', topic: 'Music', parent: true },
  { id: '/m/02mscn', topic: 'Christian music' },
  { id: '/m/0ggq0m', topic: 'Classical music' },
  { id: '/m/01lyv', topic: 'Country' },
  { id: '/m/02lkt', topic: 'Electronic music' },
  { id: '/m/0glt670', topic: 'Hip hop music' },
  { id: '/m/05rwpb', topic: 'Independent music' },
  { id: '/m/03_d0', topic: 'Jazz' },
  { id: '/m/028sqc', topic: 'Music of Asia' },
  { id: '/m/0g293', topic: 'Music of Latin America' },
  { id: '/m/064t9', topic: 'Pop music' },
  { id: '/m/06cqb', topic: 'Reggae' },
  { id: '/m/06j6l', topic: 'Rhythm and blues' },
  { id: '/m/06by7', topic: 'Rock music' },
  { id: '/m/0gywn', topic: 'Soul music' },
  { id: '/m/0bzvm2', topic: 'Gaming', parent: true },
  { id: '/m/025zzc', topic: 'Action game' },
  { id: '/m/02ntfj', topic: 'Action-adventure game' },
  { id: '/m/0b1vjn', topic: 'Casual game' },
  { id: '/m/02hygl', topic: 'Music video game' },
  { id: '/m/04q1x3q', topic: 'Puzzle video game' },
  { id: '/m/01sjng', topic: 'Racing video game' },
  { id: '/m/0403l3g', topic: 'Role-playing video game' },
  { id: '/m/021bp2', topic: 'Simulation video game' },
  { id: '/m/022dc6', topic: 'Sports game' },
  { id: '/m/03hf_rm', topic: 'Strategy video game' },
  { id: '/m/06ntj', topic: 'Sports', parent: true },
  { id: '/m/0jm_', topic: 'American football' },
  { id: '/m/018jz', topic: 'Baseball' },
  { id: '/m/018w8', topic: 'Basketball' },
  { id: '/m/01cgz', topic: 'Boxing' },
  { id: '/m/09xp_', topic: 'Cricket' },
  { id: '/m/02vx4', topic: 'Football' },
  { id: '/m/037hz', topic: 'Golf' },
  { id: '/m/03tmr', topic: 'Ice hockey' },
  { id: '/m/01h7lh', topic: 'Mixed martial arts' },
  { id: '/m/0410tth', topic: 'Motorsport' },
  { id: '/m/07bs0', topic: 'Tennis' },
  { id: '/m/07_53', topic: 'Volleyball' },
  { id: '/m/02jjt', topic: 'Entertainment', parent: true },
  { id: '/m/09kqc', topic: 'Humor' },
  { id: '/m/02vxn', topic: 'Movies' },
  { id: '/m/05qjc', topic: 'Performing arts' },
  { id: '/m/066wd', topic: 'Professional wrestling' },
  { id: '/m/0f2f9', topic: 'TV shows' },
  { id: '/m/019_rr', topic: 'Lifestyle', parent: true },
  { id: '/m/032tl', topic: 'Fashion' },
  { id: '/m/027x7n', topic: 'Fitness' },
  { id: '/m/02wbm', topic: 'Food' },
  { id: '/m/03glg', topic: 'Hobby' },
  { id: '/m/068hy', topic: 'Pets' },
  { id: '/m/041xxh', topic: 'Physical attractiveness [Beauty]' },
  { id: '/m/07c1v', topic: 'Technology' },
  { id: '/m/07bxq', topic: 'Tourism' },
  { id: '/m/07yv9', topic: 'Vehicles' },
  { id: '/m/098wr', topic: 'Society', parent: true },
  { id: '/m/09s1f', topic: 'Business' },
  { id: '/m/0kt51', topic: 'Health' },
  { id: '/m/01h6rj', topic: 'Military' },
  { id: '/m/05qt0', topic: 'Politics' },
  { id: '/m/06bvp', topic: 'Religion' },
  { id: '/m/01k8wb', topic: 'Knowledge' },
];
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>;

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_YTAPI_KEY;

const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

function Home() {
  <script src="https://accounts.google.com/gsi/client" async defer></script>;
  const google = window.google;
  const [auth, setAuth] = useState(null);
  const [subs, setSubs] = useState(null);
  const [channel, setChannel] = useState(null);

  const handleCallbackResponse = (response) => {
    setAuth(response.access_token);
  };

  const revokeAccess = () => {
    google.accounts.oauth2.revoke(auth);
    setAuth(null);
    setSubs(null);
    setChannel(null);
  };

  let client = google.accounts.oauth2.initTokenClient({
    scope: SCOPES,
    client_id: CLIENT_ID,
    ux_mode: 'popup',
    callback: handleCallbackResponse,
  });

  const doAuth = () => {
    const getCode = () => {
      client.requestAccessToken();
    };
    getCode();
  };

  useEffect(() => {
    const getChannelDetails = () => {
      axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${auth}`
        )
        .then((data) => {
          setChannel(data.data.items[0]);
          console.log(data.data.items[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getSubscriptions = () => {
      axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=200&access_token=${auth}`
        )
        .then((data) => {
          let resourceIds = data.data.items.map((item) => {
            return item.snippet.resourceId;
          });
          console.log(data.data);
          Promise.all(
            data.data.items.map((item) => {
              let id = item.snippet.resourceId.channelId;
              return axios.get(
                `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&part=topicDetails&id=${id}&key=${API_KEY}`
              );
            })
          ).then((all) => {
            const subs = all.map((item, index) => {
              let results = item.data.items[0];
              results.snippet.resourceId = resourceIds[index];
              return item.data.items[0];
            });
            console.log(subs);
            setSubs((prev) => subs);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getChannelDetails();
    getSubscriptions();
  }, [auth]);
  console.log(channel);

  return (
    <main>
      <div className="navbar-fixed">
        <nav className="red">
          <div className="nav-wrapper">
            <h5 href="#!" className="left">
              Youtube Discovery
            </h5>
            <ul className="left med-and-down">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recommendchannels">Recommend Channels</Link>
              </li>
            </ul>
            <ul className="right med-and-down">
              <li className="loggedin">
                {channel && <h6>{channel.snippet.title}</h6>}
              </li>
              <li>
                <button className="btn btn-secondary" onClick={doAuth}>
                  Log In
                </button>
              </li>
              <li>
                <button className="btn btn-secondary" onClick={revokeAccess}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="mychannelinfo">
        {channel && (
          <div key={channel.snippet.customUrl}>
            <div className="channelinfo">
              <h4>{channel.snippet.title}</h4>
              <img
                src={channel.snippet.thumbnails.default.url}
                alt="channelimg"
              ></img>
              <h5>Channel Details</h5>
              <h6>Subscriber Count: {channel.statistics.subscriberCount}</h6>
              <h6>Video Count: {channel.statistics.videoCount}</h6>
              <h6>View Count: {channel.statistics.viewCount}</h6>
            </div>
          </div>
        )}
      </div>

      <ul className="info-container">
        {subs &&
          subs.map((item, index) => {
            return (
              <li key={item.id + index}>
                <h4>{item.snippet.title}</h4>
                <h5>
                  Subscribers:{' '}
                  {item.statistics.subscriberCount > 1000000
                    ? item.statistics.subscriberCount / 1000000 + 'M'
                    : item.statistics.subscriberCount / 1000 + 'K'}
                </h5>
                <a
                  href={`https://www.youtube.com/${item.snippet.customUrl}`}
                  target="_blank"
                >
                  <img src={item.snippet.thumbnails.default.url} alt=""></img>
                </a>
                <h6>Channel Category</h6>
                {item?.topicDetails?.topicIds?.map((item) => {
                  let topic = topics.find((l) => l.id === item);
                  return <li>{topic?.topic}</li>;
                })}
              </li>
            );
          })}
      </ul>
    </main>
  );
}

export default Home;
