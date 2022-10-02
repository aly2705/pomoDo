import Card from '../UI/Card';
import classes from './Progress.module.scss';
import LineChart from '../Charts/LineChart';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

/////////////////////////////////////////////////////////////////////////////
// HELPERS FOR THE COMPONENT
/**
 *
 * @param {array} hours - has objects from calendar registrations {hour: '', activeMinutes: ''}
 * @returns - the total of activeMinutes converted in decimal hours
 */
const addHours = hours => {
  return hours.reduce((acc, hour) => acc + hour.activeMinutes, 0) / 60;
};

/**
 *
 * @param {array} daysToCompute - the stored data for last 7 days
 * @param {date} yesterday - needed to compute each weekday
 * @returns {array} that has the structure needed for the line chart [{label: '', value:''}]
 */
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

/**
 * function finds last 7 days in calendar, their weekday labels and their active time
 * @param {array} calendar stored data from redux store/local storage
 * @returns array with the last 7 weekdays active time
 */
const findProgressData = calendar => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  // const yesterday = new Date('2022-09-03T14:55:07.121Z'); // test yesterday
  // console.log(yesterday);
  const dateOfMonth = yesterday.getDate();
  /* We will use the calendar date of yesterday to determine if we have all the data needed in the yesterday month's array
  or if we need to take data from the previous month's array too */

  if (dateOfMonth < 6) {
    // 1) Find days from current month (will be placed right-side in the final array, hence the name)
    const daysToComputeFromRight = calendar[yesterday.getMonth()].slice(
      0,
      dateOfMonth
    );
    const rightData = mapProgressData(daysToComputeFromRight, yesterday);

    // 2) We will repeat the process as if 'lastDayOfPassedMonth' would be 'yesterday' to find the missing days from our 7-days array
    const lastDayOfPassedMonth = new Date(
      yesterday.getTime() - dateOfMonth * 24 * 60 * 60 * 1000
    );
    // 3) Find days from passed month (will be placed left-side in the final array, hence the name)
    const daysToComputeFromLeft = calendar[
      lastDayOfPassedMonth.getMonth()
    ].slice(
      calendar[lastDayOfPassedMonth.getMonth()].length - 7 + rightData.length
    );
    // 4) If needed, we cover the case of no registrations
    //(we get an empty array from the last operation and we map it into an array with needed length and null values)
    if (daysToComputeFromLeft.length === 0) {
      let newLength = 7 - rightData.length;
      while (newLength) {
        daysToComputeFromLeft.push(null);
        newLength--;
      }
    }
    const leftData = mapProgressData(
      daysToComputeFromLeft,
      lastDayOfPassedMonth
    );
    // 5) Concat the two arrays
    const data = [...leftData, ...rightData];
    return data;
  }
  if (dateOfMonth >= 6) {
    //1) Find data from last 7 days in current month's calendar
    const daysToCompute = calendar[yesterday.getMonth()].slice(
      dateOfMonth - 6,
      dateOfMonth + 1
    );
    //2) Map data for desired format
    const data = mapProgressData(daysToCompute, yesterday);

    return data;
  }
};

/////////////////////////////////////////////////////////////////////////////
// COMPONENT
const Progress = () => {
  const calendar = useSelector(state => state.calendar.calendar);
  const [progressData, setProgressData] = useState([]); //formatted data

  useEffect(() => {
    const data = findProgressData(calendar);
    setProgressData(data);
  }, [calendar]);

  return (
    <Card className={classes.progress}>
      <h3>Last Week's Progress</h3>
      <div className={classes.progress__chart}>
        <LineChart data={progressData} maxValue={18} unit="h" />
      </div>
    </Card>
  );
};

export default Progress;
