import React, { useRef } from 'react';
import classes from './AccountForms.module.scss';
import Card from '../UI/Card';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../store/user';
import useAJAX from '../../hooks/useAJAX';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewPasswordForm = () => {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const newPasswordConfirmInputRef = useRef();
  const dispatch = useDispatch();
  const { sendRequest, error, isLoading } = useAJAX();

  const submitNewDataHandler = event => {
    event.preventDefault();

    const formData = {
      oldPassword: oldPasswordInputRef.current.value,
      newPassword: newPasswordInputRef.current.value,
      newPasswordConfirm: newPasswordConfirmInputRef.current.value,
    };
    const inputRefs = {
      oldPasswordInputRef,
      newPasswordInputRef,
      newPasswordConfirmInputRef,
    };

    dispatch(updatePassword(sendRequest, formData, inputRefs));
  };
  return (
    <Card className={classes['account-section']}>
      <h3>Change your password</h3>
      <form className={classes.form} onSubmit={submitNewDataHandler}>
        <div className={classes.form__group}>
          <label htmlFor="current-Password">Current Password</label>
          <input
            required
            type="password"
            ref={oldPasswordInputRef}
            id="current-Password"
            placeholder="••••••••"
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="new-Password">New Password</label>
          <input
            required
            type="password"
            ref={newPasswordInputRef}
            id="new-Password"
            placeholder="••••••••"
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="new-Password-Confirm">Password Confirm</label>
          <input
            required
            type="password"
            ref={newPasswordConfirmInputRef}
            id="new-Password-Confirm"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn">
          Update password
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

export default NewPasswordForm;
