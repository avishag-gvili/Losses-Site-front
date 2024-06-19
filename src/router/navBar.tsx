import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { AuthUserType, UserDetailsType } from '../types/types';
import { getSession, removeSession } from '../utils/auth.utils';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { deepOrange } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PATHS } from './path';
import ScrollDialog from '../pages/addItemPage';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { Button, ButtonGroup } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { deleteUser } from '../redux/auth/auth.slice';
import { useDispatch } from 'react-redux';
import useCurrentUser from '../redux/getCurrentUser/getCurrentUser';
import StickyHeadTable from '../componnent/commponentGetAllItems';
import ItemList from '../componnent/commponentGetAllItems';
import TemporaryDrawer from '../pages/profilePage';
import HomePage from '../pages/homePage';
import GuestGuard from '../utils/GuestGuard';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { Login } from '@mui/icons-material';
// import AboutPage from '../pages/aboutPage';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function BackToTop() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar />
      <AppBar>
      </AppBar>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [userLetter, setUserLetter] = React.useState<null | string>(null);
  const [currentUser, setCurrentUser] = React.useState<UserDetailsType | null>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = getSession();
    if (storedUser) {
      setCurrentUser(storedUser.user);
    }
  }, []);
  useEffect(() => {
    if (currentUser && currentUser.name) {
      setUserLetter(currentUser.name.charAt(0));
    } else {
      setUserLetter(null);
    }
  }, [currentUser]);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const removeUser = () => {
    dispatch(deleteUser())
    removeSession()
    setCurrentUser(null)
    setUserLetter(null)
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    // rgba(130, 119, 23, 0.5)
    <AppBar sx={{ bgcolor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex',color:'red' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={`${PATHS.about}`}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <SavedSearchIcon/>
            השבת אבידה
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {/* <React.Fragment> */}
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink to={PATHS.home} style={{ textDecoration: 'none', color: 'inherit'}}>
                      דף הבית
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <NavLink to={PATHS.about} style={{ textDecoration: 'none', color: 'inherit' }}>
                      אודותינו
                    </NavLink>
                  </MenuItem>
                  <Box onClick={handleCloseNavMenu}>
                  <ScrollDialog/>
                    {/* <NavLink to={PATHS.additem} style={{ textDecoration: 'none', color: 'inherit' }}>
                      הוסף אבידה/מציאה
                    </NavLink> */}
                  </Box>
                  {/* </React.Fragment> */}
                </Menu>
              </Box>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={`${PATHS.about}`}
            sx={{
              mr: 0,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize:'40px',
            }}
          >
            <SavedSearchIcon sx={{width: '60px',height: '60px'}}/>
            השבת אבידה
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent: 'center' }}>
            <MenuItem>
              <NavLink to={PATHS.home} style={{ textDecoration: 'none', color: 'inherit' }}>
                דף הבית
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={PATHS.about} style={{ textDecoration: 'none', color: 'inherit' }}>
                אודותינו
              </NavLink>
            </MenuItem>
            <ScrollDialog/>
            <MenuItem>
              <NavLink to={PATHS.conected} style={{ textDecoration: 'none', color: 'inherit' }}>
                צרו קשר
              </NavLink>
            </MenuItem>
            {/* <NavLink to={PATHS.additem} style={{ textDecoration: 'none', color: 'inherit' }}>
              הוסף אבידה/מציאה
            </NavLink> */}
          </Box>

          {userLetter ? (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="האזור שלי">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                ><Avatar sx={{ width: 32, height: 32, bgcolor: '#ad1457' }}>{userLetter}</Avatar>
                </StyledBadge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                {/* <Link to={PATHS.myArea} style={{ textDecoration: 'none', color: 'inherit' }}> */}
                <ListItemIcon>
                  <TemporaryDrawer />
                </ListItemIcon>
                {/* </Link> */}
              </MenuItem>
              <Divider />
              <MenuItem onClick={removeUser}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                התנתקות
              </MenuItem>
            </Menu>
          </Box>)
            :
            (
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
              >
                <MenuItem onClick={() => { navigate(PATHS.signin) }}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" sx={{color:'#ad1457'}}/>
                  </ListItemIcon>
                  הרשמה
                </MenuItem>
                <MenuItem onClick={() => { navigate(PATHS.login) }}>
                  <ListItemIcon>
                    <Login fontSize="small" sx={{color:'#ad1457'}}/>
                  </ListItemIcon>
                  התחברות
                </MenuItem>
              </ButtonGroup>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
