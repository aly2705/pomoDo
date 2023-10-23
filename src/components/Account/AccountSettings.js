import React, { useRef } from 'react';
import classes from './AccountForms.module.scss';
import Card from '../UI/Card';
import { useDispatch, useSelector } from 'react-redux';
import useAJAX from '../../hooks/useAJAX';
import LoadingSpinner from '../UI/LoadingSpinner';
import { updateUserDetails } from '../../store/user';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

const AccountSettings = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const userData = useSelector(state => state.user.user);
  const { isLoading, error, sendRequest } = useAJAX();
  const dispatch = useDispatch();

  const submitNewDataHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const formData = { name: enteredName, email: enteredEmail };

    console.log(enteredName, enteredEmail);

    dispatch(updateUserDetails(sendRequest, formData));
  };
  return (
    <Card className={classes['account-section']}>
      <h3>User Settings</h3>
      <form className={classes.form} onSubmit={submitNewDataHandler}>
        <div className={classes.form__group}>
          <label htmlFor="name">Your Name</label>
          <input
            required
            type="text"
            ref={nameInputRef}
            id="name"
            defaultValue={userData.name}
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="email">Your Email</label>
          <input
            required
            type="email"
            ref={emailInputRef}
            id="email"
            defaultValue={userData.email}
          />
        </div>
        <div
          className={`${classes.form__group} ${classes['form__photo-upload']}`}
        >
          <InitialsAvatar name={userData.name} />
          {/* <input type="file" accept="image/*" id="photo" name="photo" /> */}
          <label htmlFor="photo">Choose new photo</label>
        </div>
        <button type="submit" className="btn">
          Save changes
        </button>
        {error && (
          <p className="error-message" style={{ gridColumn: '1 / -1' }}>
            {error.message}
          </p>
        )}
        {isLoading && <LoadingSpinner />}
      </form>
    </Card>
  );
};

export default AccountSettings;
