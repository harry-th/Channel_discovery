import { formToJSON } from "axios"
import { useState } from "react"
import Display from "./Display"
import styles from './Display.module.css'
import Insert from "./Insert"

export default function Home({ subs, hovered, setHovered, topics, channel, reccomended, setReccomended }) {

    const [reccomendedOrder, setReccomendedOrder] = useState(reccomended && [...reccomended])


    return (
        <>
            <div className={styles.dashboard}>
                <div className={styles.legend}>
                    <div>
                        <header><span className={styles.toggleUser}><button
                            className={hovered.hovering ? `${styles.userButton} ${styles.on}`
                                : styles.userButton}
                            onClick={() => { if (hovered.thumbnail) setHovered(prev => ({ ...prev, hovering: true })) }}>
                            Sub Info
                        </button>
                            <button className={!hovered.hovering ? `${styles.hoverButton} ${styles.on}`
                                : styles.hoverButton}
                                onClick={() => { setHovered(prev => ({ ...prev, hovering: false })) }}
                            >User Info</button>
                        </span>
                        </header>
                        {reccomendedOrder && <Insert subs={reccomended} setOrderedSubs={setReccomendedOrder} reccomended />}
                        {hovered.hovering ?
                            <div className={styles.legendSection}>
                                <img src={hovered.thumbnail} alt='' />
                                <h3 className={styles.subName}>{hovered.title}</h3>
                                <div className={styles.subInfo}>
                                    <p>{hovered.description}</p>
                                    Subscriber count: {hovered.subCount > 1000000 ? hovered.subCount / 1000000 + 'M' : hovered.subCount > 1000 && hovered.subCount < 1000000 ? hovered.subCount / 1000 + 'K' : hovered.subCount}
                                    <hr />
                                    Video count: {hovered.videoCount}
                                    <p>Categories:</p>
                                    <div>
                                        {hovered.categories.map((item) => {
                                            let topic = topics.find((l) => l.id === item)
                                            return (
                                                <li>{topic && topic.topic}</li>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <p>Subbed to/Reccomended by:</p>
                                        <b>{hovered.from && hovered.from}</b>
                                    </div>
                                    <div className={styles.reccomended}>
                                        {hovered.subscriptions[0] !== 'none' &&
                                            <div>
                                                <p>Subscriptions</p>
                                                <div className={styles.subscriptions}>
                                                    {hovered.subscriptions.map((item) => {
                                                        return (
                                                            <div className={styles.channel}>
                                                                <img src={item.snippet?.thumbnails?.default?.url} alt='' />
                                                                <p>{item.snippet?.title}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                        }
                                        {hovered.reccomendedChannels[0] !== 'none' &&
                                            <div>
                                                <p>Reccomended Channels:</p>
                                                <div className={styles.reccomendedChannels}>
                                                    {hovered.reccomendedChannels.map((item) => {
                                                        return (
                                                            <div className={styles.channel}>
                                                                <img src={item.snippet?.thumbnails?.default?.url} alt='' />
                                                                <p>{item.snippet?.title}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div> :
                            <div className={styles.legendSection}>

                                <img src={channel.snippet.thumbnails.default.url} alt='' />
                                <span className={styles.subName}>{channel.snippet.localized.title}</span>
                                <div className={styles.subInfo}>
                                    <p>{channel.snippet.localized.description}</p>
                                    Subscriber count: {channel.statistics.subscriberCount > 1000000 ? channel.statistics.subscriberCount / 1000000 + 'M' : channel.statistics.subscriberCount > 1000 && channel.statistics.subscriberCount < 1000000 ? channel.statistics.subscriberCount / 1000 + 'K' : channel.statistics.subscriberCount}
                                    <hr />
                                    <li>{channel.statistics.videoCount} videos</li>
                                    <li>{channel.statistics.viewCount} views</li>


                                </div>

                            </div>
                        }
                    </div>
                </div>
                <Display subs={subs} setHovered={setHovered} reccomended={reccomended} reccomendedOrder={reccomendedOrder} setReccomended={setReccomended} setReccomendedOrder={setReccomendedOrder} />
            </div>
        </>

    )
}