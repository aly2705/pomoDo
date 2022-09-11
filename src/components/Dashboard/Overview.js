import classes from './Overview.module.scss';
import Card from '../UI/Card';
import { useSelector } from 'react-redux';
import { dateIsToday } from '../../helpers/helpers';

const OverviewCard = ({ metric, label }) => {
  return (
    <li>
      <span className={classes.overview__metric}>{metric}</span>
      <span className={classes.overview__description}>{label}</span>
    </li>
  );
};

const Overview = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const numOfActiveTasks = tasks.filter(task => !task.completed).length;
  const numTasksDoneToday = tasks.filter(task =>
    dateIsToday(task.dateCompleted)
  ).length;

  return (
    <Card className={classes.overview}>
      <h3>Today's Overview</h3>
      <ul>
        <OverviewCard
          metric={numOfActiveTasks}
          label={`active ${numOfActiveTasks === 1 ? 'task' : 'tasks'}`}
        />
        <OverviewCard
          metric={numTasksDoneToday}
          label={`${numTasksDoneToday === 1 ? 'task' : 'tasks'} done`}
        />
        <OverviewCard metric={5} label="pomodoros" />
        <OverviewCard metric={`${3}h`} label="of activity" />
      </ul>
    </Card>
  );
};

export default Overview;
