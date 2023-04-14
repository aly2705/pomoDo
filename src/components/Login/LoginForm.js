import classes from './LoginForm.module.scss';
import Card from '../UI/Card';
import { NavLink, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { API_URL } from '../../helpers/config';
import useAJAX from '../../hooks/useAJAX';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

const LoginForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = new URLSearchParams(location.search).get('mode') === 'login';
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const { sendRequest, isLoading, error } = useAJAX();

  const processLoginData = async data => {
    const token = data.data.token;
    const user = data.data.user;

    dispatch(userActions.addUserData({ token, user }));
    navigate('/dashboard');
  };

  const submitHandler = async event => {
    event.preventDefault();
    let enteredName, enteredPasswordConfirm;

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      enteredName = nameInputRef.current.value;
      enteredPasswordConfirm = passwordConfirmInputRef.current.value;
    }

    const accountData = isLogin
      ? { email: enteredEmail, password: enteredPassword }
      : {
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          passwordConfirm: enteredPasswordConfirm,
        };
    const reqConfig = {
      url: `${API_URL}/users/${isLogin ? 'login' : 'signup'}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountData),
    };

    await sendRequest(reqConfig, processLoginData);
  };

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
      <form onSubmit={submitHandler}>
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
              ref={nameInputRef}
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
            ref={emailInputRef}
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
            ref={passwordInputRef}
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
              ref={passwordConfirmInputRef}
            />
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <button type="submit" className="btn">
          {isLogin ? 'Log in' : 'Sign up'}
        </button>
        <p className={classes.login__note}>{noteContent}</p>
      </form>
      {isLoading && <LoadingSpinner />}
    </Card>
  );
};

export default LoginForm;
