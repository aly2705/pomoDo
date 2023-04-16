import AccountSettings from '../components/Account/AccountSettings';
import NewPasswordForm from '../components/Account/NewPasswordForm';

const AccountPage = () => {
  return (
    <div className="main-account">
      <AccountSettings />
      <NewPasswordForm />
    </div>
  );
};

export default AccountPage;
