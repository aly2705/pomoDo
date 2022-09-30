import Card from '../UI/Card';
import classes from './TasksStats.module.scss';

const TasksStats = () => {
  return (
    <Card className={classes.tasks}>
      <h3>Tasks Done</h3>
    </Card>
  );
};

export default TasksStats;
