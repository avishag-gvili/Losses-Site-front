import React from 'react';
import { Box, Typography } from '@mui/material';
import SiteImage from '../magnifying-glass-isolated-white.jpg'; // הוסף את התמונה המתאימה

const AboutPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, alignItems: 'center', marginTop: { xs: '30px', md: 0 } }}>
      <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: 'right', paddingRight: '20px', order: { xs: 2, md: 1 } }}>
        <Typography variant="h4" sx={{ display: 'inline-block', color: '#000', transition: 'color 0.3s', '&:hover': { color: '#827717' }, position: 'relative', marginBottom: { xs: '10px', md: '100px' }, marginTop: { xs: '80px', md: 0 } }} gutterBottom>
          <span style={{ position: 'relative', zIndex: '2' }}>אודותינו..</span>
          <span style={{ position: 'absolute', zIndex: '1', width: '100%', height: '2px', backgroundColor: '#827717', bottom: '0', left: '0', transition: 'width 0.3s' }}></span>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mt: '20px' , marginBottom: { xs: '10px', md: '250px' }}}>
          אנחנו כאן כדי לספק לך את הפתרון המושלם לכל צרכייך. אנו מחויבים לאיכות, נוחות ושירות לקוח מעולה. תרגישו חופשי לפנות אלינו עם כל שאלה או בקשה!
        </Typography>
      </Box>
      <Box sx={{ width: { xs: '100%', md: '50%' }, order: { xs: 1, md: 2 }, marginTop: { xs: 0, md: '90px' } }}>
        <img src={SiteImage} alt="תמונת האתר" style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', transition: 'box-shadow 0.3s' }} />
      </Box>
    </Box>
  );
};

export default AboutPage;
