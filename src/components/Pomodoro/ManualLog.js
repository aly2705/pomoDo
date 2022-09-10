import Card from '../UI/Card';
import classes from './ManualLog.module.scss';

const ManualLog = () => {
  return (
    <Card className={classes.manual}>
      <h3>Log productive time manually</h3>
      <form className={classes.form}>
        <div className={classes.form__group}>
          <label htmlFor="starting-hour">Starting Hour</label>
          <input type="number" min={5} max={24} />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="minutes-of-activity">Minutes of Activity</label>
          <input type="number" min={1} id="minutes-of-activity" />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </Card>
  );
};

export default ManualLog;
