import './App.css';
import { useState } from 'react';
import styles from './Display.module.css';
import Home from './Home';
import login from './Api/login';
import topics from './data/topics';
import favLogo from './assets/heart.png'
import ytLogo from './assets/youtube.png'
import sortLogo from './assets/list.png'
import Status from './Status';



function App() {

  let api_key = process.env.REACT_APP_api_key;

  const [subs, setSubs] = useState(null);
  const [channel, setChannel] = useState(null);
  const [reccomended, setReccomended] = useState(null);
  const [hovered, setHovered] = useState({ hovering: false });

  const handleClick = (e) => {
    e.preventDefault();
    setSubs("loading")
    login(setSubs, topics, api_key, setChannel)
  }
  return (
    <div className={styles.container}>
      {!subs ? <div className={styles.landingpage}>
        <div
          className={styles.landingtitle}>
            <h1>YT Discovery App</h1>
        </div>
        <div className={styles.middleContainer}>
          <img className={styles.homeImage} src='https://developers.google.com/static/youtube/images/youtube_home_page_player_api.png' alt=''></img>
          <h4><center>Discover Youtube Channels by your subscription interests. <br></br> Log into your Youtube associated Gmail to start!</center></h4>
        </div>
        <h2 className={styles.featureTitle}><center>Our Features</center></h2>
        <div className={styles.lowerContainer}>
          <ul> 
          <p><img className={styles.icon} src={ytLogo} alt=""></img></p>
          <p><img className={styles.icon} src={favLogo} alt=""></img></p>
          <p><img className={styles.icon} src={sortLogo} alt=""></img></p>
          </ul>
          <ul>
          <h3>View your channel statistics</h3>
          <p>Check out your subscriber counts, view counts and videos! </p>
          <h3>Filter your subscription list by categories</h3>
          <p>What category is your favorite?</p>
          <h3>View your favorite channels' recommended channels and subscriptions</h3>
          <p>Discover unique content creators based on your interests!</p>
          </ul>
        </div>
        <div className="sign-in">
        <div className="g-sign-in-button" onClick={handleClick}>
          <div className="content-wrapper">
            <div className="logo-wrapper">
              <img src="https://developers.google.com/identity/images/g-logo.png"></img>
            </div>
            <span className="text-container">
              <span>Sign in with Google</span>
            </span>
          </div>
        </div>
    </div>
      </div>
        : subs === "loading" ? <Status /> : <Home
          subs={subs}
          hovered={hovered}
          setHovered={setHovered}
          topics={topics}
          channel={channel}
          reccomended={reccomended}
          setReccomended={setReccomended}
        />}
    </div >
  );
}


export default App;
