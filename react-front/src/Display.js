import { useState } from 'react';
import styles from './Display.module.css';
import Insert from './Insert';
import Reccomended from './Reccomended';
import SubItem from './SubItem';
import { useRef } from 'react';
import { Pie, getElementsAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import topics from './data/topics';
import setReccomendedSet from './helper/setReccomended';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Display({ subs, setHovered, reccomendedOrder, reccomended, setReccomended, setReccomendedOrder }) {
    const [orderedSubs, setOrderedSubs] = useState(subs && [...subs]);
    const [toggleHover, setToggleHover] = useState(true);


    const chartRef = useRef();

    const onClick = (event) => {
        if (getElementsAtEvent(chartRef.current, event).length > 0) {
            const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex;
            const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;

            setOrderedSubs({ [data.datasets[datasetIndexNum].link[dataPoint]]: subs.filter((item) => item.topicDetails.mainCategories.includes(data.datasets[datasetIndexNum].link[dataPoint])) });
        }
    }
    const countCategories = () => {
        let categories = [];
        for (let i = 0; i < subs.length; i++) {
            const allSubsValues = Object.values(subs[i].topicDetails.mainCategories);
            categories.push(allSubsValues);
        }
        const count = categories.flat().reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
        return count;
    };

    const colorObject = { Gaming: 'rgb(255, 255, 0)', Lifestyle: 'rgb(0, 128, 0)', Music: 'rgb(255, 0, 0)', Society: 'rgb(0, 0, 255)', Entertainment: 'rgb(255, 165, 0)', Technology: 'rgb(0, 255, 102)', Hobby: 'rgb(193, 193, 193)', Sports: 'rgb(207, 37, 190)' };


    const data = {
        labels: Object.keys(countCategories(subs)),
        datasets: [{
            label: 'My Categories',
            data: Object.values(countCategories(subs)),
            backgroundColor:
                Object.keys(countCategories(subs)).map((item) => {
                    return colorObject[item];
                })
            ,
            hoverOffset: 4,
            link: Object.keys(countCategories(subs))
        }],

    };

    return (
        <div className={styles.outerdisplay}>
            {!reccomendedOrder ?
                <div className={styles.display}>
                    <div className={styles.usercolumn}>
                        <div className={styles.chart}>
                            <Pie
                                options={{
                                  color: '#FFFFFF',
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            align: 'start',
                                            labels: {
                                                usePointStyle: true,
                                                boxWidth: 20,
                                                padding: 20,
                                                textAlign: ''

                                            }
                                        }
                                    }
                                }

                                }
                                data={data}
                                onClick={onClick}
                                ref={chartRef}
                            />
                        </div>
                        <div className={styles.user}>
                            {!reccomended && <div onClick={() => {
                                setReccomendedSet(subs, setReccomended)
                            }}>Set Reccomended</div>}
                            {reccomended && <div onClick={() => {
                                setReccomendedOrder([...reccomended])
                            }}>View Reccomended</div>}
                        </div>
                    </div>
                    <Insert setOrderedSubs={setOrderedSubs} subs={subs} />
                    <div className={styles.subcolumn}>
                        <div className={styles.subcontainer}>
                            {orderedSubs && Array.isArray(orderedSubs) ? orderedSubs.map((item) => {
                                return (
                                    <SubItem
                                        classname={styles[item.topicDetails.mainCategories[0]]}
                                        subs={item}
                                        setHovered={setHovered}
                                        hoverToggle={toggleHover}
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
                                                    <SubItem
                                                        classname={styles[itemOfCategory.topicDetails.mainCategories[0]]}
                                                        subs={itemOfCategory}
                                                        setHovered={setHovered}
                                                        hoverToggle={toggleHover}
                                                        setToggleHover={setToggleHover}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div> :
                < Reccomended
                    orderedSubs={reccomendedOrder}
                    setHovered={setHovered}
                    hoverToggle={toggleHover}
                    setToggleHover={setToggleHover} />
            }
        </div >
    );
}
