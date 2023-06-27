import React from 'react';
import PropTypes from 'prop-types';

export const SignInComponent = ({ locale, router }) => {
  const [buttonName, setButtonName] = React.useState('Sign Up');

  console.log(`React in SignIn : ${React}`);

  const handleClick = () => {
    setButtonName('Clicked');
    router.push(`/${locale}/auth/register`);
  };

  return (
    <button type="button" onClick={(e) => handleClick(e)}>{buttonName}</button>
  );
};

SignInComponent.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  locale: PropTypes.string.isRequired,
};

export default SignInComponent;
