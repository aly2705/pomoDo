import classes from './Overview.module.scss';
import Card from '../UI/Card';

const OverviewCard = ({ metric, label }) => {
  return (
    <li>
      <span className={classes.overview__metric}>{metric}</span>
      <span className={classes.overview__description}>{label}</span>
    </li>
  );
};

const Overview = () => {
  return (
    <Card className={classes.overview}>
      <h3>Today's Overview</h3>
      <ul>
        <OverviewCard metric={5} label="active tasks" />
        <OverviewCard metric={3} label="tasks done" />
        <OverviewCard metric={5} label="pomodoros" />
        <OverviewCard metric={`${3}h`} label="of activity" />
      </ul>
    </Card>
  );
};

export default Overview;
