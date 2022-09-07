import classes from './Overview.module.scss';
import Card from '../UI/Card';
import icons from '../../img/icons.svg';

const Overview = () => {
  return (
    <Card className={classes.overview}>
      <h3>Today's Overview</h3>
      <ul>
        <li>
          <div className={classes.overview__icon}>
            <svg>
              <use href={`${icons}#icon-checkmark`}></use>
            </svg>
          </div>
          <span className={classes.overview__metric}>3</span>
          <span className={classes.overview__description}>tasks done</span>
        </li>
        <li>
          <div className={classes.overview__icon}>
            <svg>
              <use href={`${icons}#icon-stopwatch-2`}></use>
            </svg>
          </div>
          <span className={classes.overview__metric}>5</span>
          <span className={classes.overview__description}>pomodoros</span>
        </li>
        <li>
          <div className={classes.overview__icon}>
            <svg>
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </div>
          <span className={classes.overview__metric}>3h</span>
          <span className={classes.overview__description}>of activity</span>
        </li>
        <li>
          <div className={classes.overview__icon}>
            <svg>
              <use href={`${icons}#icon-hour-glass`}></use>
            </svg>
          </div>
          <span className={classes.overview__metric}>5</span>
          <span className={classes.overview__description}>active tasks</span>
        </li>
      </ul>
    </Card>
  );
};

export default Overview;
