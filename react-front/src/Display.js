import { useState } from 'react';
import styles from './Display.module.css';
import SubItem from './SubItem';
import { useRef } from 'react';
import { Pie, getElementsAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Display({ subs, setHovered }) {
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;
  const [orderedSubs, setOrderedSubs] = useState(subs && subs);
  const [toggleHover, setToggleHover] = useState(true);

  const orderSubs = (orderType) => {
    if (orderType === 'subscriber-count') {
      setOrderedSubs(prev => [...prev.sort((a, b) => b.statistics.subscriberCount - a.statistics.subscriberCount)]);
    } else if (orderType === 'default') {
      setOrderedSubs([...subs]);
    }
  };

  const chartRef = useRef();
  const onClick = (event) => {
    if (getElementsAtEvent(chartRef.current, event).length > 0) {
      const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex;
      const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
      console.log(`Dataset: ${datasetIndexNum} and  Data: ${dataPoint} `);
      console.log(data.datasets[datasetIndexNum].link[dataPoint]);
    }
  };

  // Chart.overrides['pie'].plugins.legend = {
  //   options: {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           position: 'left',
  //           usePointStyle: true,
  //           pointStyle: 'circle'
  //         }
  //       }
  //     }
  //   }
  // };

  const config = {
    type: 'pie',
    data: subs,
  }


  const data = {
    labels: [
      'Music',
      'Gaming',
      'Lifestyle',
      'Sports',
      'Entertainment',
      'Technology',
      'Hobby',
      'Society'
    ],
    datasets: [{
      label: 'My Categories',
      data: [300, 50, 100, 500, 200, 100, 150, 300], //ARRAY OF DATA NEEDS TO GO HERE, follow same key id as categories id
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(135, 15, 86)',
        'rgb(205, 655, 86)',
        'rgb(125, 205, 86)',
        'rgb(35, 205, 86)',
        'rgb(100, 25, 86)',
      ],
      hoverOffset: 4,
      //link to render filtered categories
      link: ['link', 'link2', 'link3', 'link4', 'link5', 'link6', 'link7', 'link8']
    }]
  };
  return (
    <div className={styles.outerdisplay}>
      <div className={styles.display}>
        <div className={styles.usercolumn}>
          <div className={styles.chart}>
            <Pie
              options={subs}
              data={data}
              onClick={onClick}
              ref={chartRef}
            />
          </div>
          <div className={styles.user}>
            user
          </div>
        </div>
        <div className={styles.insert}>
          <button onClick={() => orderSubs('default')}>default</button>
          <button onClick={() => orderSubs('subscriber-count')}>by subs</button>
        </div>
        <div className={styles.subcolumn}>
          <div className={styles.subcontainer}>
            {orderedSubs && orderedSubs.map((item) => {
              return (
                <SubItem
                  classname={styles[item.topicDetails.mainCategories[0]]}
                  subs={item}
                  setHovered={setHovered}
                  hoverToggle={toggleHover}
                  setToggleHover={setToggleHover}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div >
  );
};