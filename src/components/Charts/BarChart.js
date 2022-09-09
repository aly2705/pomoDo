import React, { Fragment } from 'react';
import classes from './BarChart.module.scss';

const findLabels = numLabels => {
  const labelsArray = [];
  for (let i = 1; i <= numLabels; i++) {
    labelsArray.push(i * 10);
  }
  return labelsArray;
};

const Labels = React.memo(({ maxValue, unit }) => {
  const numLabels = Math.trunc(maxValue / 10);
  const labelsValues = findLabels(numLabels);
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

const BarChart = ({ maxValue, barsArray, unit }) => {
  return (
    <div className={classes['chart-wrap']}>
      <div className={classes.grid}>
        {barsArray.map((bar, i) => (
          <Bar
            key={i}
            percentage={(bar.activeMinutes / maxValue) * 100}
            label={bar.hour}
          />
        ))}
        <Labels maxValue={maxValue} unit={unit} />
      </div>
    </div>
  );
};

export default BarChart;
