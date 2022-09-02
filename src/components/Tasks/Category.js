import classes from './Category.module.scss';
import icons from '../../img/icons.svg';
import { taskCategories as categories } from '../../helpers/config';

const Category = props => {
  const category = categories.find(category => category.name === props.name);

  return (
    <li className={classes.category}>
      <div className={classes.category__icon}>
        <svg>
          <use href={`${icons}${category.icon}`}></use>
        </svg>
      </div>
      <span>{category.name}</span>
    </li>
  );
};

export default Category;
