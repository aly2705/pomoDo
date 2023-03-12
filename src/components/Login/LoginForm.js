import classes from './LoginForm.module.scss';
import Card from '../UI/Card';
import { NavLink, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const location = useLocation();
  const isLogin = new URLSearchParams(location.search).get('mode') === 'login';

  const noteContent = isLogin ? (
    <>
      <span>Don't have an account? </span>
      <NavLink to="/login?mode=signup">Sign up.</NavLink>
    </>
  ) : (
    <>
      <span>Already have an account? </span>
      <NavLink to="/login?mode=login">Log in.</NavLink>
    </>
  );

  return (
    <Card className={classes.login}>
      <form>
        <h2>{isLogin ? 'Log into your account!' : 'Create your account!'}</h2>
        {!isLogin && (
          <div className={classes.login__group}>
            <label htmlFor="name" className={classes.login__label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={classes.login__input}
              required
              placeholder="John Doe"
            />
          </div>
        )}
        <div className={classes.login__group}>
          <label htmlFor="email" className={classes.login__label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={classes.login__input}
            required
            placeholder="you@email.com"
          />
        </div>
        <div className={classes.login__group}>
          <label htmlFor="password" className={classes.login__label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={classes.login__input}
            required
            placeholder="••••••••"
            minLength="8"
          />
        </div>
        {!isLogin && (
          <div className={classes.login__group}>
            <label htmlFor="password-confirm" className={classes.login__label}>
              Password Confirm
            </label>
            <input
              type="password"
              id="password-confirm"
              className={classes.login__input}
              required
              placeholder="••••••••"
              minLength="8"
            />
          </div>
        )}
        <button className="btn">{isLogin ? 'Log in' : 'Sign up'}</button>
        <p className={classes.login__note}>{noteContent}</p>
      </form>
    </Card>
  );
};

export default LoginForm;
