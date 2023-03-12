import classes from './LoginForm.module.scss';
import Card from '../UI/Card';
import { useLocation } from 'react-router-dom';

const LoginForm = () => {
  const location = useLocation();
  const isLogin = new URLSearchParams(location.search).get('mode') === 'login';
  console.log(isLogin);

  return (
    <Card className={classes.login}>
      <form>
        <h2>{isLogin ? 'Log into your account!' : 'Create your account!'}</h2>
      </form>
    </Card>
  );
};

export default LoginForm;
