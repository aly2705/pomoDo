import Card from '../UI/Card';
import classes from './ManualLog.module.scss';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { activityActions } from '../../store/activity';

const ManualLog = () => {
  const dispatch = useDispatch();
  const startingHourRef = useRef();
  const activeMinutesRef = useRef();
  const [error, setError] = useState(null);

  const submitTimeHandler = event => {
    event.preventDefault();

    setError(null);

    const enteredHour = +startingHourRef.current.value;
    const enteredMinutes = +activeMinutesRef.current.value;

    const now = new Date();

    // VALIDATING THE HOUR
    const currentHour = now.getHours();
    if (enteredHour > currentHour) {
      setError(`Future hours are not valid!`);
      return;
    }

    //COMPUTING THE FINALIZATION TIME
    const minutesInHours = Math.trunc(enteredMinutes / 60);
    const remainingMinutes = enteredMinutes % 60;
    console.log(minutesInHours, remainingMinutes);

    const finalizationTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      enteredHour + minutesInHours,
      remainingMinutes
    );

    // VALIDATING THE FINALIZATION TIME
    if (finalizationTime.getTime() > now.getTime()) {
      setError(`Your finalization time is exceeding current time!`);
      return;
    }

    const dataToStore = {
      startingHour: enteredHour,
      hoursOfActivity: minutesInHours,
      remainingMinutes,
    };
    try {
      dispatch(activityActions.addActiveTime(dataToStore));
    } catch (err) {
      setError(err.message);
      return;
    }

    console.log(enteredHour, enteredMinutes);
    startingHourRef.current.value = '';
    activeMinutesRef.current.value = '';
  };
  return (
    <Card className={classes.manual}>
      <h3>Log productive time manually</h3>
      <form className={classes.form} onSubmit={submitTimeHandler}>
        <div className={classes.form__group}>
          <label htmlFor="starting-hour">Starting Hour</label>
          <input
            required
            type="number"
            ref={startingHourRef}
            min={5}
            max={23}
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="minutes-of-activity">Minutes of Activity</label>
          <input
            required
            type="number"
            ref={activeMinutesRef}
            min={1}
            id="minutes-of-activity"
          />
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
        {error && (
          <p className="error-message" style={{ gridColumn: '1 / -1' }}>
            {error}
          </p>
        )}
      </form>
    </Card>
  );
};

export default ManualLog;
