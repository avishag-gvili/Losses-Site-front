import { PATHS } from "../router/path";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { setSession } from "../utils/auth.utils";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/auth/auth.slice";
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Theme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getNewPassword, login, petUserByEmailEndPassword } from "../services/authService";
import { theme, cacheRtl } from '../style/style'
import { CacheProvider } from "@emotion/react";
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        avishag gvili
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignInSideWithNewPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    newPassword: ''
  });

  const onClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.email === '') {
      setError('כתובת המייל אינה תקינה נסה שנית');
      return;
    }
    try {
      const password = await getNewPassword(userData.email);
      if (!password) {
        setError('כתובת המייל אינה תקינה נסה שנית');
        return;
      }
      setUserData({ ...userData, newPassword: password });
      setError(null);
    } catch (error) {
      console.error('Error in onClick:', error);
      setError('ניתקלנו בבעיה בשליחת סיסמא חדשה נסה שנית');
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.password === '' || userData.password !== userData.newPassword) {
      setError('הסיסמא שהוזנה אינה תקינה בדוק שוב את תיבת המייל שלך');
      return;
    }
    try {
      const response = await petUserByEmailEndPassword(userData.email, userData.newPassword);
      if (response !== undefined) {
        const authUser = await login(userData.email, userData.newPassword);
        dispatch(setUser(authUser)); // שמירת הנתונים ברידקס
        setSession(authUser);
        navigate(`/${PATHS.home}`);
      } else {
        setError('לא הצלחנו לבצע התחברות נסה שוב');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('לא הצלחנו לבצע התחברות נסה שוב');
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
            <Grid container component="main" sx={{ height: '100vh' }}>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                  </Typography>
                  <Box component="form" noValidate onSubmit={userData.newPassword ? handleSubmit : onClick} sx={{ mt: 1 }}>
                    {!userData.newPassword && <TextField onChange={handleChange}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="כתובת איימיל"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />}
                    {!!userData.newPassword && <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel htmlFor="outlined-adornment-password">סיסמא*</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="סיסמא"
                      />
                    </FormControl>}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                     {(!userData.newPassword)?" שלח לי סיסמא":"אתחל סיסמא"}
                    </Button>

                    <Grid container>
                      <Grid item>
                        <Link href={`${PATHS.signin}`} variant="body2">
                          {"אין לך עדיין חשבון ? הרשם"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/* </ThemeProvider> */}
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

