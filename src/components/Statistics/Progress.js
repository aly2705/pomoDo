import Card from '../UI/Card';
import classes from './Progress.module.scss';
import LineChart from '../Charts/LineChart';

const DUMMY_PROGRESS = [
  { label: 'mon', value: 6 },
  { label: 'tue', value: 8 },
  { label: 'wed', value: 3 },
  { label: 'thu', value: 5 },
  { label: 'fri', value: 9 },
  { label: 'sat', value: 6 },
  { label: 'sun', value: 5 },
];

const Progress = () => {
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
