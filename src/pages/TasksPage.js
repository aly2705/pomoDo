import Tasks from '../components/Tasks/Tasks';
import Categories from '../components/Tasks/Categories';
import React from 'react';

const TasksPage = () => {
  return (
    <React.Fragment>
      <Tasks />
      <Categories />
    </React.Fragment>
  );
};

export default TasksPage;
