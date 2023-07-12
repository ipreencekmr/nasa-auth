import React from 'react';
import { useFakeDomain } from '../selectors/useFakeDomainSelector';
import { useSigninUri } from '../selectors/useSignInURISelector';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [signInResponse, setSignInResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  const nasaDomain = useFakeDomain();
  const signInUri = useSigninUri();

  const fetchAPI = React.useCallback(async (username, password) => {
    setIsLoading(true);

    try {
      const data = {
        username,
        password,
      };

      const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const BASE_URL = `${nasaDomain}${signInUri}`;
      const response = await fetch(BASE_URL, options);
      setSignInResponse(await response.json());
      setError(null);
    } catch (apiErr) {
      setError(apiErr);
      setSignInResponse(null);
    }

    setIsLoading(false);
  }, [nasaDomain, signInUri]);

  return {
    signInResponse,
    isLoading,
    error,
    fetchAPI,
  };
};
