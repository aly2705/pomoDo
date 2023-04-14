import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { timerActions } from '../store/timer';
import { useLocation, matchPath } from 'react-router-dom';
import audioFile from '../assets/completed.mp3';
import useUnload from './useUnload';

let audioPlayedOutside = false;
const audio = new Audio(audioFile);

const useCountOutsidePomodoro = (
  timerIsActive,
  countdown,
  secondsOutsidePomodoro
) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath(
    {
      path: '/pomodoro',
      exact: true,
      strict: false,
    },
    location.pathname
  );
  // Refs to global variables in order to be able to mutate them
  const secondsOutsidePomodoroRef = useRef(secondsOutsidePomodoro);
  const audioRef = useRef(audio);
  const audioPlayedOutsideRef = useRef(audioPlayedOutside);

  useEffect(() => {
    const remainingSeconds = countdown.minutes * 60 + countdown.seconds;
    if (remainingSeconds > 0) audioPlayedOutsideRef.current = false;
    if (remainingSeconds === 0 && !audioPlayedOutsideRef.current)
      audioRef.current.play();
  }, [countdown]);

  useEffect(() => {
    if (!timerIsActive) return;
    if (!match) {
      const remainingSeconds = countdown.minutes * 60 + countdown.seconds;
      const interval = setInterval(() => {
        secondsOutsidePomodoroRef.current++;
        if (secondsOutsidePomodoroRef.current > remainingSeconds) {
          audioRef.current.play();
          audioPlayedOutsideRef.current = true;
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    if (match && secondsOutsidePomodoroRef.current > 0) {
      dispatch(
        timerActions.subtractOutsideSeconds(secondsOutsidePomodoroRef.current)
      );
      secondsOutsidePomodoroRef.current = 0;
    }
  }, [match, timerIsActive, dispatch, countdown]);

  useUnload(event => {
    event.preventDefault();

    dispatch(
      timerActions.subtractOutsideSeconds(secondsOutsidePomodoroRef.current)
    );
    secondsOutsidePomodoroRef.current = 0;
  });
};

export default useCountOutsidePomodoro;
