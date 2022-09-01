import Card from '../UI/Card';
import classes from './Categories.module.scss';
import Category from './Category';

const Categories = () => {
  return (
    <Card className={classes.categories}>
      <h2>Categories</h2>
      <ul>
        <Category icon="#icon-briefcase" label="Work" />
        <Category icon="#icon-book" label="Study" />
        <Category icon="#icon-dumbell" label="Exercise" />
        <Category icon="#icon-aid-kit" label="Health" />
        <Category icon="#icon-lotus" label="Wellness" />
        <Category icon="#icon-broom" label="Chores" />
      </ul>
    </Card>
  );
};

export default Categories;
