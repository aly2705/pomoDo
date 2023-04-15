import { Fragment } from 'react';
import classes from './PomodoroReset.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ConfirmAction from '../UserFeedback/ConfirmAction';
import { timerActions } from '../../store/timer';
import { activityActions, updateOverviewHours } from '../../store/activity';
import useAJAX from '../../hooks/useAJAX';
import LoadingSpinner from '../UI/LoadingSpinner';

const PomodoroReset = () => {
  const {
    type: activeTimer,
    countdown,
    totalSeconds,
  } = useSelector(state => state.timer);
  const { sendRequest, isLoading } = useAJAX();
  const isLoggedIn = !!useSelector(state => state.user.token);

  const dispatch = useDispatch();
  const [confirmModalIsActive, setConfirmModalIsActive] = useState(false);
  const confirmResetHandler = () => {
    if (totalSeconds === countdown.seconds + countdown.minutes * 60) {
      dispatch(timerActions.changeTimer(activeTimer));
      return;
    }
    if (countdown.seconds + countdown.minutes * 60 === 0) {
      dispatch(timerActions.changeTimer(activeTimer));
      return;
    }
    setConfirmModalIsActive(true);
  };

  const resetPomodoroHandler = () => {
    if (confirmModalIsActive) setConfirmModalIsActive(false);
    if (activeTimer === 'pomodoro') {
      const usedDataInStore = {
        totalSeconds,
        countdown,
        reinitMinutesPassed: true,
        isLoggedIn,
      };
      !isLoggedIn
        ? dispatch(
            activityActions.saveMinutesWhenPomodoroPaused(usedDataInStore)
          )
        : dispatch(updateOverviewHours(sendRequest, usedDataInStore));
    }
    dispatch(timerActions.changeTimer(activeTimer));
  };
  const cancelConfirmationHandler = () => {
    setConfirmModalIsActive(false);
  };
  return (
    <Fragment>
      {confirmModalIsActive && (
        <ConfirmAction
          onClose={cancelConfirmationHandler}
          onConfirm={resetPomodoroHandler}
        >
          {activeTimer === 'pomodoro'
            ? "Current timer progress will be lost and your pomodoro won't be marked as completed!"
            : 'Current timer progress will be lost!'}
        </ConfirmAction>
      )}
      <button onClick={confirmResetHandler} className={classes.reset}>
        Reset timer
      </button>
      {isLoading && <LoadingSpinner />}
    </Fragment>
  );
};

export default PomodoroReset;
