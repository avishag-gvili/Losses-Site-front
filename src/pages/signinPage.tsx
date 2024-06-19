// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { ThemeProvider } from '@mui/material/styles';
// import { PATHS } from '../router/path';
// import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ChangeEvent, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../redux/user/user.slice';
// import { AuthUserType, UserType } from '../types/types';
// import { PostApi } from '../services/userService';
// import { login } from '../services/authService';
// import { setUser } from '../redux/auth/auth.slice';
// import { setSession } from '../utils/auth.utils';
// import { useNavigate } from 'react-router-dom';
// import { theme, cacheRtl } from '../style/style'
// import { CacheProvider } from "@emotion/react";
// import { validateEmail, validatePassword,validatePhoneNumber } from '../functions/validation';


// function Copyright(props: any) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="">
//                 avishag gvili
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }


// export default function SignUp() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = React.useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//     }

//     const checkingIntegrityFields = () => {
//         if (formData.FirstName == '' && formData.LastName == '') {
//             setError("השדות לא מלאים בערכים תקינים ")
//             return false
//         }
//         if (!validatePhoneNumber(formData.Phone)) {
//             setError("מיספר הטלפון אינו חוקי")
//             return false
//         }
//         if (!validatePassword(formData.Password)) {
//             setError("צור סיסמא חזקה המורכבת מ 8 תווים לפחות אותיות ,מיספרים ותוים מיוחדים")
//             return false
//         }
//         if (!validateEmail(formData.Email)) {
//             setError("כתובת המייל אינה תקינה")
//             return false
//         }
//         return true
//     }

//     const [formData, setFormData] = useState({
//         FirstName: '',
//         LastName: '',
//         Phone: '',
//         Email: '',
//         Password: ''
//     });

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (!checkingIntegrityFields())
//             return
//         const userToPost: UserType = {
//             id: 0,
//             name: formData.FirstName + " " + formData.LastName,
//             phone: formData.Phone,
//             email: formData.Email,
//             password: formData.Password
//         }
//         try {
//             const user: UserType = await PostApi(userToPost)
//             dispatch(addUser(user));
//             const authUser: AuthUserType = await login(formData.Email, formData.Password);
//             dispatch(setUser(authUser));// שמירת הנתונים ברידקס
//             setSession(authUser);
//             console.log(authUser.token);
//             navigate(`/${PATHS.home}`);
//         }
//         catch (error) {
//             setError("אופס... היתה בעיה בהרשמה אנא נסה שנית")
//         }

//     };
//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         setFormData({
//             ...formData,
//             [event.target.name]: event.target.value
//         });
//     };
//     return (
//         <CacheProvider value={cacheRtl}>
//             <ThemeProvider theme={theme}>
//                 <div dir="rtl">
//                     <Container component="main" maxWidth="xs">
//                         <CssBaseline />
//                         <Box
//                             sx={{
//                                 marginTop: 8,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                                 <LockOutlinedIcon />
//                             </Avatar>
//                             <Typography component="h1" variant="h5">
//                                 הרשמה
//                             </Typography>
//                             <Typography component="h1" variant="h5">
//                                 {error && <Alert variant="outlined" severity="error">{error}</Alert>}
//                             </Typography>
//                             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12} sm={6}>

//                                         {/* ///////////////////////////////// */}
//                                         <TextField onChange={handleChange}
//                                             autoComplete="given-name"
//                                             name="FirstName"
//                                             required
//                                             fullWidth
//                                             id="firstName"
//                                             label="שם פרטי"
//                                             autoFocus
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField onChange={handleChange}
//                                             required
//                                             fullWidth
//                                             id="lastName"
//                                             label="שם מישפחה"
//                                             name="LastName"
//                                             autoComplete="family-name"
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField onChange={handleChange}
//                                             required
//                                             fullWidth
//                                             id="פhone"
//                                             label="מיספר טלפון"
//                                             name="Phone"
//                                             autoComplete="phone"
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField onChange={handleChange}
//                                             required
//                                             fullWidth
//                                             id="email"
//                                             label="כתובת איימיל"
//                                             name="Email"
//                                             autoComplete="email"
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <FormControl sx={{ width: '62ch' }} onChange={handleChange} variant="outlined" margin="normal">
//                                             <InputLabel htmlFor="outlined-adornment-password">סיסמא*</InputLabel>
//                                             <OutlinedInput
//                                                 id="outlined-adornment-password"
//                                                 name="Password"
//                                                 type={showPassword ? 'text' : 'password'}
//                                                 endAdornment={
//                                                     <InputAdornment position="end">
//                                                         <IconButton
//                                                             aria-label="toggle password visibility"
//                                                             onClick={handleClickShowPassword}
//                                                             onMouseDown={handleMouseDownPassword}
//                                                             edge="end"
//                                                         >
//                                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                                         </IconButton>
//                                                     </InputAdornment>
//                                                 }
//                                                 label="סיסמא"
//                                             />
//                                         </FormControl>
//                                     </Grid>
//                                 </Grid>
//                                 <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     sx={{ mt: 3, mb: 2 }}
//                                 >
//                                     הרשמה
//                                 </Button>
//                                 <Grid container justifyContent="flex-end">
//                                     <Grid item>
//                                         <Link href={`${PATHS.login}`} variant="body2">
//                                             יש לך כבר חשבון ? התחבר
//                                         </Link>
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Box>
//                         <Copyright sx={{ mt: 5 }} />
//                     </Container>
//                 </div>
//             </ThemeProvider>
//         </CacheProvider>
//     );
// }
import * as React from 'react';
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
import { ThemeProvider } from '@mui/material/styles';
import { PATHS } from '../router/path';
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/user/user.slice';
import { AuthUserType, UserType } from '../types/types';
import { PostApi } from '../services/userService';
import { login } from '../services/authService';
import { setUser } from '../redux/auth/auth.slice';
import { setSession } from '../utils/auth.utils';
import { useNavigate } from 'react-router-dom';
import { theme, cacheRtl } from '../style/style';
import { CacheProvider } from "@emotion/react";
import { validateEmail, validatePassword, validatePhoneNumber } from '../functions/validation';

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

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState({
        FirstName: false,
        LastName: false,
        Phone: false,
        Email: false,
        Password: false,
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const checkingIntegrityFields = () => {
        let isValid = true;
        const newFieldErrors = {
            FirstName: false,
            LastName: false,
            Phone: false,
            Email: false,
            Password: false,
        };

        if (formData.FirstName === '') {
            setError("שם פרטי לא תקין");
            newFieldErrors.FirstName = true;
            isValid = false;
        }
        if (formData.LastName === '') {
            setError("שם משפחה לא תקין");
            newFieldErrors.LastName = true;
            isValid = false;
        }
        if (!validatePhoneNumber(formData.Phone)) {
            setError("מספר הטלפון אינו חוקי");
            newFieldErrors.Phone = true;
            isValid = false;
        }
        if (!validatePassword(formData.Password)) {
            setError("צור סיסמא חזקה המורכבת מ 8 תווים לפחות אותיות, מספרים ותווים מיוחדים");
            newFieldErrors.Password = true;
            isValid = false;
        }
        if (!validateEmail(formData.Email)) {
            setError("כתובת המייל אינה תקינה");
            newFieldErrors.Email = true;
            isValid = false;
        }

        setFieldErrors(newFieldErrors);
        return isValid;
    };

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Phone: '',
        Email: '',
        Password: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!checkingIntegrityFields())
            return;

        const userToPost: UserType = {
            id: 0,
            name: `${formData.FirstName} ${formData.LastName}`,
            phone: formData.Phone,
            email: formData.Email,
            password: formData.Password
        };

        try {
            const user: UserType = await PostApi(userToPost);
            dispatch(addUser(user));
            const authUser: AuthUserType = await login(formData.Email, formData.Password);
            dispatch(setUser(authUser));
            setSession(authUser);
            navigate(`${PATHS.home}`);
        } catch (error) {
            setError("אופס... היתה בעיה בהרשמה אנא נסה שנית");
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

        // Reset field error when user types
        setFieldErrors({
            ...fieldErrors,
            [event.target.name]: false
        });
    };

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div dir="rtl">
                    <Container component="main" maxWidth="xs">
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
                                הרשמה
                            </Typography>
                            {error && <Alert variant="outlined" severity="error">{error}</Alert>}
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            onChange={handleChange}
                                            autoComplete="given-name"
                                            name="FirstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="שם פרטי"
                                            autoFocus
                                            error={fieldErrors.FirstName}
                                            helperText={fieldErrors.FirstName && "שם פרטי נדרש"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="שם משפחה"
                                            name="LastName"
                                            autoComplete="family-name"
                                            error={fieldErrors.LastName}
                                            helperText={fieldErrors.LastName && "שם משפחה נדרש"}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                            id="phone"
                                            label="מספר טלפון"
                                            name="Phone"
                                            autoComplete="phone"
                                            error={fieldErrors.Phone}
                                            helperText={fieldErrors.Phone && "מספר טלפון לא חוקי"}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={handleChange}
                                            required
                                            fullWidth
                                            id="email"
                                            label="כתובת אימייל"
                                            name="Email"
                                            autoComplete="email"
                                            error={fieldErrors.Email}
                                            helperText={fieldErrors.Email && "כתובת מייל לא חוקית"}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{ width: '62ch' }} variant="outlined" margin="normal">
                                            <InputLabel htmlFor="outlined-adornment-password" error={fieldErrors.Password}>סיסמא*</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                name="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                error={fieldErrors.Password}
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
                                            {fieldErrors.Password && <Typography variant="body2" color="error">הסיסמא נדרשת ומורכבת מתווים חוקיים</Typography>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    הרשמה
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href={`${PATHS.login}`} variant="body2">
                                            יש לך כבר חשבון? התחבר
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                </div>
            </ThemeProvider>
        </CacheProvider>
    );
}
