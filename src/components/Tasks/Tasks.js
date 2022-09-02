import Task from './Task';
import classes from './Tasks.module.scss';
import Card from '../UI/Card';
import NewTaskForm from './NewTaskForm';

const Tasks = () => {
  return (
    <Card className={classes.tasks}>
      <h2>Tasks</h2>
      <ul>
        <Task category="Study">
          Finish at least one chapter in the course book
        </Task>
        <Task category="Exercise">Workout 3 times this week</Task>
        <Task category="Wellness">Dine out with old friends</Task>
        <Task category="Chores">Clean the bathroom thoroughly</Task>
      </ul>
      <NewTaskForm />
    </Card>
  );
};

export default Tasks;
