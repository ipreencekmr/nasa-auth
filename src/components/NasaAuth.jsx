import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { SignInComponent } from './SignInComponent';
import { SignUpComponent } from './SignUpComponent';
import { ErrorBoundary } from './ErrorBoundary';

export const NasaAuth = ({
  languageData, localeName, params,
}) => {
  const { authType, locale } = params || {};

  if (languageData) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        <ErrorBoundary>
          {authType === 'register' ? <SignUpComponent /> : <SignInComponent locale={locale} />}
        </ErrorBoundary>
      </IntlProvider>
    );
  }
  return null;
};

NasaAuth.propTypes = {
  params: PropTypes.string,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  languageData: PropTypes.shape({
    greeting: PropTypes.string.isRequired,
  }).isRequired,
  localeName: PropTypes.string.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  switchLanguage: async ({ target }) => {
    await dispatch(updateLocale(target.value));
    await dispatch(loadLanguagePack('nasa-auth', { fallbackLocale: 'en-US' }));
  },
});

export const mapStateToProps = (state) => {
  const localeName = state.getIn(['intl', 'activeLocale']);
  const languagePack = state.getIn(
    ['intl', 'languagePacks', localeName, 'nasa-auth'],
    fromJS({})
  ).toJS();

  return {
    languageData: languagePack && languagePack.data ? languagePack.data : {},
    localeName,
  };
};

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('nasa-auth', { fallbackLocale: 'en-US' }));

NasaAuth.holocron = {
  name: 'nasa-auth',
  loadModuleData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NasaAuth);
