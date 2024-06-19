import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthUserType } from "../types/types";
import { RootState } from "../redux/Store";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../router/path";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { router } from "../router/router";
import { RouterProvider } from "react-router-dom";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const useProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector<RootState>((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect user to login page if not authenticated
      navigate(PATHS.login);
    }
  }, [isAuthenticated, navigate]);

  //   const handleLogout = () => {
  //     // Logout user and redirect to login page
  //     dispatch(logout());
  //     navigate(PATHS.login);
  //   };

  return { isAuthenticated };
};




export default function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
     
      {/* <Container fixed>
        </Container> */}
      <Grid
        container
        direction="column-reverse"
        justifyContent="flex-start"
        alignItems="stretch"
      > <RouterProvider router={router} /></Grid>
    </React.Fragment>
  );
}