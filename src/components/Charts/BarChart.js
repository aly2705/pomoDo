import React, { Fragment } from 'react';
import classes from './BarChart.module.scss';

const findLabels = (distanceBetweenLabels, maxValue) => {
  // const labelsArray = [];
  // for (let i = 1; i <= numLabels; i++) {
  //   labelsArray.push(i * 10);
  // }
  // return labelsArray;

  const labelsValues = [];
  for (
    let i = distanceBetweenLabels;
    i <= maxValue;
    i += distanceBetweenLabels
  ) {
    labelsValues.push(i);
  }
  return labelsValues;
};

const Labels = React.memo(({ maxValue, unit }) => {
  // const numLabels = Math.trunc(maxValue / 10);
  // const labelsValues = findLabels(numLabels);

  const distanceBetweenLabels = maxValue / 6;
  const labelsValues = findLabels(distanceBetweenLabels, maxValue);

  return (
    <Fragment>
      {labelsValues.map((label, i) => (
        <div
          key={i}
          className={classes['y-label']}
          style={{ '--label-position': `${(label / maxValue) * 100}%` }}
        >
          {`${label} ${unit}`}
        </div>
      ))}
    </Fragment>
  );
});

const Bar = ({ percentage, label }) => {
  return (
    <div
      className={classes.bar}
      style={{ '--bar-value': `${percentage}%` }}
      data-name={label}
    ></div>
  );
};

const BarChart = ({ maxValue, barsArray, unit, opacity }) => {
  return (
    <div className={classes['chart-wrap']} style={{ opacity: `${opacity}` }}>
      <div className={classes.grid}>
        {barsArray.map((bar, i) => (
          <Bar
            key={i}
            percentage={(bar.value / maxValue) * 100}
            label={bar.label}
          />
        ))}
        <Labels maxValue={maxValue} unit={unit} />
      </div>
    </div>
  );
};

export default BarChart;
