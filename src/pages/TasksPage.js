import Tasks from '../components/Tasks/Tasks';
import Categories from '../components/Tasks/Categories';
import { Fragment } from 'react';

const TasksPage = () => {
  return (
    <Fragment>
      <Tasks />
      <Categories />
    </Fragment>
  );
};

export default TasksPage;
