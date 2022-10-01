import Card from '../UI/Card';
import classes from './Progress.module.scss';
import LineChart from '../Charts/LineChart';
import { useSelector } from 'react-redux';

const DUMMY_PROGRESS = [
  { label: 'mon', value: 6 },
  { label: 'tue', value: 8 },
  { label: 'wed', value: 3 },
  { label: 'thu', value: 5 },
  { label: 'fri', value: 9 },
  { label: 'sat', value: 0 },
  { label: 'sun', value: 5 },
];
// const addHours = hours => {
//   return hours.reduce((acc, hour) => acc + hour.activeMinutes, 0) / 60;
// };

const Progress = () => {
  // const calendar = useSelector(state => state.calendar.calendar);
  // //const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  // const yesterday = new Date('2022-09-22T11:44:01.956Z');
  // console.log(yesterday);
  // const dateOfMonth = yesterday.getDate();
  // if (dateOfMonth > 7) {
  //   const data = calendar[yesterday.getMonth()].slice(
  //     dateOfMonth - 6,
  //     dateOfMonth + 1
  //   );
  //   console.log(data);
  // }

  return (
    <Card className={classes.progress}>
      <h3>Progress</h3>
      <div className={classes.progress__chart}>
        <LineChart data={DUMMY_PROGRESS} />
      </div>
    </Card>
  );
};

export default Progress;
