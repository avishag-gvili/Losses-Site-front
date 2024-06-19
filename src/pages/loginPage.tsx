import { PATHS } from "../router/path";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { AuthUserType } from "../types/types";
import { login } from "../services/authService";
import { setSession } from "../utils/auth.utils";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/auth/auth.slice";
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { theme, cacheRtl } from '../style/style';
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

export default function SignInSide() {
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const newFieldErrors = {
        email: userData.email === '',
        password: userData.password === '',
      };

      if (newFieldErrors.email || newFieldErrors.password) {
        setFieldErrors(newFieldErrors);
        setError("נא למלא את כל השדות הנדרשים");
        return;
      }

      const authUser: AuthUserType | null = await login(userData.email, userData.password);
      if (authUser && authUser.token) {
        dispatch(setUser(authUser));
        setSession(authUser);
        navigate(`/${PATHS.home}`);
      } else {
        setUserData({
          email: '',
          password: ''
        });
        setError("אחד או יותר מהפרטים שהוזנו לא נימצאו נסה שנית");
      }
    } catch (error) {
      setError("שגיאה בהתחברות, נא לנסות שוב");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });

    setFieldErrors({
      ...fieldErrors,
      [name]: false
    });
  };

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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  התחברות
                </Typography>
                {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="כתובת אימייל"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={fieldErrors.email}
                    helperText={fieldErrors.email && "כתובת אימייל נדרשת"}
                  />
                  <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="outlined-adornment-password" error={fieldErrors.password}>סיסמא*</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      error={fieldErrors.password}
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
                    {fieldErrors.password && <Typography variant="body2" color="error">הסיסמא נדרשת</Typography>}
                  </FormControl>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="זכור אותי"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    התחברות
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href={`${PATHS.forgetPassword}`} variant="body2">
                        שכחת סיסמא?
                      </Link>
                    </Grid>
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
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
