import ReccomendedItem from "./ReccomendedItem"
import styles from './Display.module.css'

export default function Reccomended({ orderedSubs, setHovered, setToggleHover, hoverToggle }) {


    return (
        <div className={styles.reccomended}>
            <div className={styles.titleBlock}>
                <h2>Reccomended
                    and Subscribed
                    to Channels:</h2>
            </div>
            {orderedSubs && Array.isArray(orderedSubs) ? orderedSubs.map((item) => {
                return (
                    <ReccomendedItem
                        classname={styles[item.topicDetails.mainCategories[0]]}
                        subs={item}
                        setHovered={setHovered}
                        hoverToggle={hoverToggle}
                        setToggleHover={setToggleHover}
                    />
                );
            }) :
                Object.values(orderedSubs).map((item, index) => {
                    let sectionName = Object.keys(orderedSubs)[index]
                    if (sectionName.includes(',')) {
                        sectionName = sectionName.split(',')
                        let lastItem = sectionName.pop()
                        sectionName = sectionName.join(', ') + `, and ${lastItem}`
                    }
                    return <div><h3>{sectionName}</h3>
                        <div className={styles.categorySection}>
                            {item.map((itemOfCategory) => {
                                return (
                                    <ReccomendedItem
                                        classname={styles[itemOfCategory.topicDetails.mainCategories[0]]}
                                        subs={itemOfCategory}
                                        setHovered={setHovered}
                                        hoverToggle={hoverToggle}
                                        setToggleHover={setToggleHover}
                                    />
                                );
                            })}
                        </div>
                    </div>
                })
            }
        </div>
    )
}