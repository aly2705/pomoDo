import Card from '../UI/Card';
import classes from './TasksStats.module.scss';
import BarChart from '../Charts/BarChart';
import { findWeeklyData } from '../../helpers/helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// const DUMMY__TASKS = [
//   { label: '1-7 oct', value: 60 },
//   { label: '8-14 oct', value: 25 },
//   { label: '15-21 oct', value: 40 },
//   { label: '22-28 oct', value: 10 },
//   { label: '29-31 oct', value: 20 },
// ];

const TasksStats = () => {
  const calendar = useSelector(state => state.calendar.calendar);
  const [chartData, setChartData] = useState([]); //formatted data

  useEffect(() => {
    const data = findWeeklyData(calendar, 'tasks');
    setChartData(data);
  }, [calendar]);

  const maxValue = Math.max(...chartData.map(data => data.value));

  return (
    <Card className={classes.tasks}>
      <h3>Tasks Done</h3>
      <div className={classes.tasks__chart}>
        <BarChart
          maxValue={6 - (maxValue % 6) + maxValue}
          unit="tasks"
          barsArray={chartData}
          opacity={maxValue ? 1 : 0.6}
          height={'18rem'}
        />
        {!maxValue && <p>You have no activity logged in this timeframe!</p>}
      </div>
    </Card>
  );
};

export default TasksStats;
