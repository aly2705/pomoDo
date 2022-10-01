import Card from '../UI/Card';
import classes from './Progress.module.scss';
import LineChart from '../Charts/LineChart';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const addHours = hours => {
  return Math.ceil(
    hours.reduce((acc, hour) => acc + hour.activeMinutes, 0) / 60
  );
};
const mapProgressData = (daysToCompute, yesterday) => {
  const data = daysToCompute.map((day, index) => {
    const weekday = new Date(
      yesterday.getTime() -
        1000 * 3600 * 24 * (daysToCompute.length - index - 1)
    )
      .toDateString()
      .slice(0, 3);
    if (!day) return { label: weekday, value: 0 };
    return {
      label: weekday,
      value: addHours(day.hours),
    };
  });
  return data;
};

const Progress = () => {
  const calendar = useSelector(state => state.calendar.calendar);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    // const yesterday = new Date('2022-09-03T14:55:07.121Z'); // test yesterday
    // console.log(yesterday);
    const dateOfMonth = yesterday.getDate();
    if (dateOfMonth < 6) {
      const daysToComputeFromRight = calendar[yesterday.getMonth()].slice(
        0,
        dateOfMonth
      );
      const rightData = mapProgressData(daysToComputeFromRight, yesterday);

      const lastDayOfPassedMonth = new Date(
        yesterday.getTime() - dateOfMonth * 24 * 60 * 60 * 1000
      );

      const daysToComputeFromLeft = calendar[
        lastDayOfPassedMonth.getMonth()
      ].slice(
        calendar[lastDayOfPassedMonth.getMonth()].length - 7 + rightData.length
      );
      if (daysToComputeFromLeft.length === 0) {
        let newLength = 7 - rightData.length;
        while (newLength) {
          daysToComputeFromLeft.push(null);
          newLength--;
        }
      }
      let leftData = mapProgressData(
        daysToComputeFromLeft,
        lastDayOfPassedMonth
      );
      const data = [...leftData, ...rightData];
      setProgressData(data);

      console.log([...leftData, ...rightData]);
      console.error(
        'Check 1.10.2022 if weekly graph adapts how it should (with SAT being the last day)'
      );
    }
    if (dateOfMonth >= 6) {
      const daysToCompute = calendar[yesterday.getMonth()].slice(
        dateOfMonth - 6,
        dateOfMonth + 1
      );
      const data = mapProgressData(daysToCompute, yesterday);
      setProgressData(data);
      return;
    }
  }, [calendar]);

  return (
    <Card className={classes.progress}>
      <h3>Weekly Progress</h3>
      <div className={classes.progress__chart}>
        <LineChart data={progressData} maxValue={18} unit="h" />
      </div>
    </Card>
  );
};

export default Progress;
