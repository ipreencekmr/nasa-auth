import React from 'react';
import PropTypes from 'prop-types';

export const SignInComponent = ({ locale }) => (
  <a href={`${locale}/auth/register`}>Sign Up</a>
);

SignInComponent.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default SignInComponent;
