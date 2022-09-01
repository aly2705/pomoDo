import Task from './Task';
import classes from './Tasks.module.scss';
import Card from '../UI/Card';

const Tasks = () => {
  return (
    <Card className={classes.tasks}>
      <h2>Tasks</h2>
      <ul>
        <Task category={{ name: 'Study', icon: '#icon-book' }}>
          Finish at least one chapter in the course book
        </Task>
        <Task category={{ name: 'Exercise', icon: '#icon-dumbell' }}>
          Workout 3 times this week
        </Task>
        <Task category={{ name: 'Wellness', icon: '#icon-lotus' }}>
          Dine out with old friends
        </Task>
        <Task category={{ name: 'Chores', icon: '#icon-broom' }}>
          Clean the bathroom thoroughly
        </Task>
      </ul>
    </Card>
  );
};

export default Tasks;
