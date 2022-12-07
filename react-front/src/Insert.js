import styles from './Display.module.css'

export default function Insert({ subs, setOrderedSubs, reccomended }) {


    const orderSubs = (orderType) => {
        if (orderType === 'by-category') {
            let categories = subs.reduce((final, item) => {
                let mainCat = item.topicDetails.mainCategories
                if (mainCat[0] !== 'none') {
                    !final[mainCat] ? final[mainCat] = [item] : final[mainCat].push(item)
                }
                return final
            }, {})
            setOrderedSubs(categories)
        } else if (orderType === 'by-creator') {
            let creators = subs.reduce((final, item) => {
                !final[item.snippet.from] ? final[item.snippet.from] = [item] : final[item.snippet.from].push(item)
                return final
            }, {})
            setOrderedSubs(creators)
        } else if (orderType === 'by-duplicate') {
            setOrderedSubs(prev => {
                if (Array.isArray(prev)) {
                    return [...subs].sort((a, b) => (b.count || 0) - (a.count || 0))
                } else {
                    let catSubs = { ...prev }
                    for (const cat in catSubs) {
                        catSubs[cat].sort((a, b) => (b.count || 0) - (a.count || 0))
                    }
                    return catSubs
                }
            })
        } else if (orderType === 'subscriber-count') {
            setOrderedSubs(prev => {
                if (Array.isArray(prev)) {
                    return [...subs].sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)
                } else {
                    let catSubs = { ...prev }
                    for (const cat in catSubs) {
                        catSubs[cat].sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)
                    }
                    return catSubs
                }
            })
        } else if (orderType === 'default') {
            setOrderedSubs([...subs])
        } else if (orderType === 'reset') {
            setOrderedSubs(null)
        }
    }

    return (
        <div className={styles.insert}>
            <h3 className={styles.legendTitle}><u>Legend</u></h3>
            <div onClick={() => orderSubs('default')}>Default</div>
            <div onClick={() => orderSubs('subscriber-count')}>By Subs</div>
            {reccomended && <div onClick={() => orderSubs('by-duplicate')}>By Duplicates</div>}
            <div onClick={() => orderSubs('by-category')}>By Category</div>
            {reccomended && <div onClick={() => orderSubs('by-creator')}>By Creator</div>}
            <br></br>
            {reccomended && <div onClick={() => orderSubs('reset')}>Back to Home</div>}

        </div>
    )
}
