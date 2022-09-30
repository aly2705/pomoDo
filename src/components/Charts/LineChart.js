import { useState } from 'react';
import { useEffect } from 'react';
import classes from './LineChart.module.scss';

const DataPoint = props => {
  const { index, left, hasLine, bottom, nextPointData, base } = props;
  const perpendicular = (nextPointData - bottom) * 15;
  console.log(base, perpendicular);

  //   useEffect(() => {
  //     const point = document.getElementById(`group-${index}`).firstChild;
  //     // console.log(point.getBoundingClientRect());
  //   }, [index, left]);

  return (
    <div id={`group-${index}`}>
      <div
        className={classes.point}
        style={{ left: left, bottom: `${bottom * 1.5}rem` }}
      ></div>
      {hasLine && (
        <div
          className={classes.line}
          style={{
            width: `${Math.sqrt(
              base * base + perpendicular * perpendicular
            )}px`,
            left: left - 20,
            bottom: `${bottom * 1.5}rem`,
            transform: `rotate(${perpendicular > 0 ? '-' : ''}${
              (Math.atan(Math.abs(perpendicular) / base) * 180) / Math.PI
            }deg)`,
          }}
        ></div>
      )}
    </div>
  );
};

const LineChart = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(null);
  useEffect(() => {
    //Create observer which detects chart rezise - effect runs only when component is mounted
    const observer = new ResizeObserver(resizeChartHandler);
    observer.observe(document.querySelector(`.${classes.linechart}`));

    return () => {
      observer.disconnect();
    };
  }, []);

  const resizeChartHandler = () => {
    const width = document
      .querySelector(`.${classes.linechart}`)
      .getBoundingClientRect().width;
    setChartWidth(width);
  };

  return (
    <div className={classes.linechart}>
      {data.map((item, index) => {
        const leftOffset = (chartWidth / data.length) * (index + 1);
        const base = chartWidth / data.length;
        const hasLine = index + 1 !== data.length;
        return (
          <DataPoint
            key={index}
            bottom={item.value}
            left={leftOffset}
            base={base}
            index={index}
            hasLine={hasLine}
            nextPointData={hasLine ? data[index + 1].value : 0}
          />
        );
      })}
    </div>
  );
};

export default LineChart;
