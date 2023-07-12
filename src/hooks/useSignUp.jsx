import React from 'react';
import { useFakeDomain } from '../selectors/useFakeDomainSelector';
import { useSignupUri } from '../selectors/useSignUpURISelector';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [signUpResponse, setSignUpResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  const nasaDomain = useFakeDomain();
  const signUpUri = useSignupUri();

  const fetchAPI = React.useCallback(async (name, email, password) => {
    setIsLoading(true);

    const { firstname, lastname } = name;

    try {
      const data = {
        email,
        username: email,
        password,
        name: {
          firstname,
          lastname,
        },
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

      const BASE_URL = `${nasaDomain}${signUpUri}`;
      const response = await fetch(BASE_URL, options);
      setSignUpResponse(await response.json());
      setError(null);
    } catch (apiErr) {
      setError(apiErr);
      setSignUpResponse(null);
    }

    setIsLoading(false);
  }, [nasaDomain, signUpUri]);

  return {
    signUpResponse,
    isLoading,
    error,
    fetchAPI,
  };
};
