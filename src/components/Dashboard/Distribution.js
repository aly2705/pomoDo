import classes from './Distribution.module.scss';
import Card from '../UI/Card';
import PieChart from '../Charts/PieChart';

const Distribution = () => {
  return (
    <Card className={classes.distribution}>
      <h3>Task Distribution</h3>
      <div className={classes.distribution__chart}>
        <PieChart />
      </div>
    </Card>
  );
};

export default Distribution;
