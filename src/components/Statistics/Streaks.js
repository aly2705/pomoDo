import Card from '../UI/Card';
import classes from './Streaks.module.scss';

const Streaks = () => {
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const currentYear = new Date().getFullYear();
  return (
    <Card className={classes.streaks}>
      <h3>Streaks</h3>
      <h4>{`${currentMonth} ${currentYear}`}</h4>
      <div className={classes.streaks__chart}>
        <div className={classes.streaks__grid}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default Streaks;
