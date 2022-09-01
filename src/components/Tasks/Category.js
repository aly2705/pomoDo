import classes from './Category.module.scss';
import icons from '../../img/icons.svg';

const Category = props => {
  return (
    <li className={classes.category}>
      <div className={classes.category__icon}>
        <svg>
          <use href={`${icons}${props.icon}`}></use>
        </svg>
      </div>
      <span>{props.label}</span>
    </li>
  );
};

export default Category;
