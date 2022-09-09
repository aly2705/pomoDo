import classes from './ProductiveHours.module.scss';
import Card from '../UI/Card';
import BarChart from '../Charts/BarChart';

const DUMMY_BARS = [
  { hour: 5, activeMinutes: 30 },
  { hour: 6, activeMinutes: 60 },
  { hour: 7, activeMinutes: 0 },
  { hour: 8, activeMinutes: 20 },
  { hour: 9, activeMinutes: 60 },
  { hour: 10, activeMinutes: 40 },
  { hour: 11, activeMinutes: 0 },
  { hour: 12, activeMinutes: 0 },
  { hour: 13, activeMinutes: 50 },
  { hour: 14, activeMinutes: 60 },
  { hour: 15, activeMinutes: 60 },
  { hour: 16, activeMinutes: 30 },
  { hour: 17, activeMinutes: 0 },
  { hour: 18, activeMinutes: 0 },
  { hour: 19, activeMinutes: 0 },
  { hour: 20, activeMinutes: 0 },
  { hour: 21, activeMinutes: 40 },
  { hour: 22, activeMinutes: 60 },
  { hour: 23, activeMinutes: 0 },
  { hour: 24, activeMinutes: 0 },
];

const ProductiveHours = () => {
  return (
    <Card className={classes.hours}>
      <h3>Your Productive Hours</h3>
      <BarChart maxValue={60} unit="min" barsArray={DUMMY_BARS} />
    </Card>
  );
};

export default ProductiveHours;
