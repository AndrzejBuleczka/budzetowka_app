import * as React from 'react';
import { Link as RLink, useNavigate } from "react-router-dom"
import {firebaseAuth} from "../../index"
import {useState} from "react"
import { createUserWithEmailAndPassword } from 'firebase/auth'
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme/theme'


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        JS-Binks Sp z o.o.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (event: React.SyntheticEvent): void => {
    event.preventDefault();     
    const user = {email, password}

      createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(cred=>{
        console.log("user created", cred.user)
        navigate('/signin')
      })
      .catch(e => {
        if (e.code === 'auth/email-already-in-use') {
          setError('Mamy już takiego użytkownika w aplikacji')
        } else if (e.code === 'auth/weak-password') {
          setError('Hasło musi mieć co najmniej 6 znaków')
        } else if (e.code === 'auth/invalid-email') {
          setError('Podaj prawidłowy adres e-mail')
        } else {
          setError('Coś poszło nie tak, spróbuj ponownie później')
        }
      })
    }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Box></Box> */}
      <Container component="main" maxWidth="xs" sx={{
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          }}>
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
            Proszę zarejestruj się do Budżetówki
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Adres E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Hasło"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => setPassword(e.target.value)}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Rejestruję się
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RLink to='/signin'>
                    <Button>
                      Masz już konto? Zaloguj się tutaj
                    </Button>
                </RLink>
              </Grid>
            </Grid>
            <Grid container sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
                {error && <Typography variant='h6' color='error'>{error}</Typography>}
              </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}