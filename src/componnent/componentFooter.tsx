import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isBottom = currentScrollY >= (document.documentElement.scrollHeight - window.innerHeight);
      setIsVisible(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        visibility: isVisible ? 'visible' : 'hidden',
        backgroundColor: '#1a237e',
        height: isExpanded ? '20vh' : '60px',
        transition: 'height 0.3s ease-in-out',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ position: 'absolute', left: '16px' }}>
        <SavedSearchIcon/>
          השבת אבידה
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button color="inherit" onClick={handleContactClick}>צרו קשר</Button>
          <Button color="inherit" href="/about">אודותינו</Button>
        </Box>
      </Toolbar>
      {isExpanded && (
        <Slide direction="up" in={isExpanded} mountOnEnter unmountOnExit>
          <Box sx={{ padding: 2, color: 'white' }}>
          <Typography variant="body1" style={{ display: 'block', minHeight: '30px' }}>
                מספר טלפון: 123-456-7890
            </Typography>
            <Typography variant="body1" style={{ display: 'block', minHeight: '30px' }}>
                או במייל: projectavishag@gmail.com
            </Typography>
            <Typography variant="body1" style={{ display: 'block', minHeight: '30px' }}>
                או בקרו אותנו בינקודת האיסוף ברחוב העליה 16 א אור עקיבא
            </Typography>
            <Box
              id="map"
              sx={{
                width: '100%',
                height: '100px',
                marginTop: '20px',
                backgroundColor: 'whait',
              }}
            >
              {/* כאן ניתן להטמיע את המפה באמצעות API מתאים כמו Google Maps */}
            </Box>
          </Box>
        </Slide>
      )}
    </AppBar>
  );
};

export default Footer;
