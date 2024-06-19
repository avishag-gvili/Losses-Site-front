import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import image from '../צילום מסך 2024-06-16 184331.png';
import { List, ListItem } from '@mui/material';
const CustomBox = () => {
    return (
        <Box display="flex">
            <Box width="60%">
                <img src={image} alt="תמונה" style={{ width: '100%', height: '420px' }} />
            </Box>
            <Box width="40%"
                sx={{
                    backgroundColor: '#1565c0',
                    height: '420px',
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <List sx={{ borderBottom: '3px solid #ad1457', paddingBottom: '10px' }}>
                    <ListItem>
                        <Typography variant="h4" sx={{ color: 'white' }}>
                            נתקעתם עם אבידה בבית!?
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h2" sx={{ color: 'white' }}>
                            אנחנו כאן בישבילכם
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h5" sx={{ color: 'white' }}>
                            באו אלינו לנקודת האיסוף והשאירו את החפצים שמצאתם
                        </Typography>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default CustomBox;