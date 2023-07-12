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
import { useIntl } from 'react-intl';
import { ValidationError } from './ValidationError';
import { useSignUp } from '../hooks/useSignUp';
import { ProgressLoader } from './ProgressLoader';

export const SignUpComponent = ({ locale, router }) => {
  const {
    signUpResponse,
    isLoading,
    error,
    fetchAPI,
  } = useSignUp();

  const intl = useIntl();

  const [isOpen, setIsOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstname = data.get('firstName');
    const lastname = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');

    if (firstname.length === 0) {
      setAlertMsg(intl.formatMessage({ id: 'firstname.error' }));
      setIsOpen(true);
      return;
    }

    if (lastname.length === 0) {
      setAlertMsg(intl.formatMessage({ id: 'lastname.error' }));
      setIsOpen(true);
      return;
    }

    if (email.length === 0) {
      setAlertMsg(intl.formatMessage({ id: 'email.error' }));
      setIsOpen(true);
      return;
    }

    if (password.length === 0) {
      setAlertMsg(intl.formatMessage({ id: 'password.error' }));
      setIsOpen(true);
      return;
    }

    const name = { firstname, lastname };
    fetchAPI(name, email, password);
  };

  React.useEffect(() => {
    if (!error && signUpResponse) {
      router.push(`/${locale}/auth/signin`);
    }
  }, [signUpResponse, error, router, locale]);

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
            Sign up
          </Typography>
          <Box component="form" noValidate={true} onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container={true} spacing={2}>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required={true}
                  fullWidth={true}
                  id="firstName"
                  label="First Name"
                  autoFocus={true}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  required={true}
                  fullWidth={true}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  required={true}
                  fullWidth={true}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  required={true}
                  fullWidth={true}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container={true} justifyContent="flex-end">
              <Grid item={true}>
                <Link href={`/${locale}/auth/signin`} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

SignUpComponent.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  locale: PropTypes.string.isRequired,
};

export default SignUpComponent;
