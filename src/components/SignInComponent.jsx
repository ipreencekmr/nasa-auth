import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from 'js-cookie';
import { useIntl } from 'react-intl';
import { ValidationError } from './ValidationError';
import { useSignIn } from '../hooks/useSignIn';
import { ProgressLoader } from './ProgressLoader';

export const SignInComponent = ({ locale, router }) => {
  const {
    signInResponse,
    isLoading,
    error,
    fetchAPI,
  } = useSignIn();

  const intl = useIntl();
  const [isOpen, setIsOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = 'mor_2314' || data.get('email');
    const password = '83r5^_' || data.get('password');

    if (data.get('email').length === 0) {
      setAlertMsg(intl.formatMessage({ id: 'username.error' }));
      setIsOpen(true);
      return;
    }

    if (data.get('password').length === 0) {
      setAlertMsg(intl.formatMessage({ id: 'password.error' }));
      setIsOpen(true);
      return;
    }

    fetchAPI(userName, password);
  };

  React.useEffect(() => {
    if (!error && signInResponse) {
      Cookies.set('accessToken', signInResponse?.token, { expires: 7 });
      router.push(`/${locale}/home`);
    }
  }, [signInResponse, error, router, locale]);

  if (isLoading) {
    return <ProgressLoader />;
  }

  return (
    <React.Fragment>
      <ValidationError
        message={alertMsg}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ marginBottom: 8 }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate={true} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required={true}
              fullWidth={true}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={true}
            />
            <TextField
              margin="normal"
              required={true}
              fullWidth={true}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container={true}>
              <Grid item={true} xs={true} />
              <Grid item={true}>
                <Link href={`/${locale}/auth/register`} variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

SignInComponent.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  locale: PropTypes.string.isRequired,
};

export default SignInComponent;
