import * as React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { SignInComponent } from './SignInComponent';
import { SignUpComponent } from './SignUpComponent';
import { ErrorBoundary } from './ErrorBoundary';
import { getLanguageDataSelector, getLocaleSelector } from '../selectors/marketSelector';
import { MODULE_NAME } from '../constants/module';

export const NasaAuth = ({
  languageData, localeName, params, router,
}) => {
  const { authType, locale } = params || {};

  if (languageData) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        <ErrorBoundary>
          {authType === 'register'
            ? (
              <SignUpComponent
                locale={locale}
                router={router}
              />
            )
            : (
              <SignInComponent
                locale={locale}
                router={router}
              />
            )}
        </ErrorBoundary>
      </IntlProvider>
    );
  }
  return null;
};

NasaAuth.propTypes = {
  params: PropTypes.shape({}),
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
    await dispatch(loadLanguagePack(MODULE_NAME, { fallbackLocale: 'en-US' }));
  },
});

export const mapStateToProps = (state, ownProps) => ({
  languageData: getLanguageDataSelector(state, ownProps?.params?.locale, MODULE_NAME),
  localeName: getLocaleSelector(state),
});

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack(MODULE_NAME, { fallbackLocale: 'en-US' }));

NasaAuth.holocron = {
  name: MODULE_NAME,
  loadModuleData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NasaAuth);
