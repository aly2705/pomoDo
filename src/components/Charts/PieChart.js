import classes from './PieChart.module.scss';
import { getVariableFromRoot } from '../../helpers/helpers';
import { Fragment } from 'react';

const PieChart = () => {
  const colors = [
    getVariableFromRoot('--color-pie-1'),
    getVariableFromRoot('--color-pie-2'),
    getVariableFromRoot('--color-pie-3'),
    getVariableFromRoot('--color-pie-4'),
    getVariableFromRoot('--color-pie-5'),
    getVariableFromRoot('--color-pie-6'),
  ];
  return (
    <Fragment>
      <ul className={classes.legend}>
        <li>
          <div style={{ backgroundColor: colors[0] }}></div> Work
        </li>
        <li>
          <div style={{ backgroundColor: colors[1] }}></div> Study
        </li>
        <li>
          <div style={{ backgroundColor: colors[2] }}></div> Exercise
        </li>
        <li>
          <div style={{ backgroundColor: colors[3] }}></div> Health
        </li>
        <li>
          <div style={{ backgroundColor: colors[4] }}></div> Wellness
        </li>
        <li>
          <div style={{ backgroundColor: colors[5] }}></div> Chores
        </li>
      </ul>
      <div
        className={classes.pie}
        style={{
          background: `conic-gradient(${colors[0]} 0% 20%, ${colors[1]} 20% 40%, ${colors[2]} 40% 60%, ${colors[3]} 60% 75%, ${colors[4]} 75% 90%, ${colors[5]} 90% 100%)`,
        }}
      ></div>
    </Fragment>
  );
};

export default PieChart;
