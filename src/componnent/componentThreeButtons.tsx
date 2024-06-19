// import React from 'react';
// import { Paper, Box } from '@mui/material';
// import { styled, keyframes } from '@mui/system';
// import { IconButton } from '@mui/material';
// import { Add } from '@mui/icons-material';
// import { Navigate, useNavigate } from 'react-router';
// import { PATHS } from '../router/path';

// const pulse = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.1);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

// const rotate360 = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// const CustomPaper = styled(Paper)(({ theme }) => ({
//   backgroundColor: 'rgba(130, 119, 23, 0.5)',
//   width: 200, // גודל הכפתור גדול יותר
//   height: 200, // גודל הכפתור גדול יותר
//   borderRadius: '50%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   transition: 'background-color 0.3s, transform 0.3s, color 0.3s',
//   cursor: 'pointer',
//   color: '#000', // צבע טקסט רגיל
//   fontSize: '1.2em',
//   margin: '20px', // מרווח גדול יותר בין הכפתורים
//   position: 'relative',
//   '&:hover': {
//     backgroundColor: '#9e9d24',
//     animation: `${pulse} 0.5s infinite, ${rotate360} 0.5s`,
//     color: 'rgba(255, 255, 255, 0.8)', // צבע טקסט לבן שקוף כשעוברים על הכפתור
//     textShadow: '0 0 5px rgba(255, 255, 255, 0.5)', // אפקט מילוי אותיות
//   },
//   '&:hover::after': {
//     content: '""',
//     position: 'absolute',
//     zIndex: -1,
//     top: '0',
//     left: '0',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//     borderRadius: '50%',
//   },
// }));

// const ThreeButtons = () => {
//   const navigate = useNavigate(); 
//   const handleClick = (index: number) => {
//     navigate(`/items/${index}`);
//   };

//   return (
//     <Box display="flex" justifyContent="center" margin="20px">
//       {[1, 2, 3].map((index) => (
//         <CustomPaper
//           key={index}
//           onClick={() => handleClick(index)}
//           sx={{ mx: 10 }} 
//           elevation={24} // הוספת צל לכפתור
//         >
//           <IconButton
//             sx={{
//               color: 'white',
//             }}
//           >
//       {index==1?"אבידות":index==2?"מציאות":"אבידות/מציאות"}
//           </IconButton>
//         </CustomPaper>
//       ))}
//     </Box>
//   );
// };

// export default ThreeButtons;
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';

const CustomPaper = styled(Paper)(({ theme }) => ({
  flex: 1,
  height: '178px', // Increase height for taller rectangles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'relative',
  transition: 'background-color 0.3s',
  borderRadius: 0, // Sharp edges instead of rounded
  '&:hover': {
    '& .MuiTypography-root': {
      color: 'black', // Change text color to black on hover
    },
  },
}));

const ThreeButtons = () => {
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    navigate(`/items/${index}`);
  };

  return (
    <Box display="flex" width="100vw">
      <CustomPaper
        onClick={() => handleClick(1)}
        sx={{ backgroundColor: '#ad1457' }}
      >
        <Typography variant="h4" sx={{ color: 'white' }}>
          אבידות
        </Typography>
      </CustomPaper>
      <CustomPaper
        onClick={() => handleClick(2)}
        sx={{ backgroundColor: '#1565c0' }}
      >
        <Typography variant="h4" sx={{ color: 'white' }}>
          מציאות
        </Typography>
      </CustomPaper>
      <CustomPaper
        onClick={() => handleClick(3)}
        sx={{ backgroundColor: '#1a237e' }}
      >
        <Typography variant="h4" sx={{ color: 'white' }}>
          אבידות/מציאות
        </Typography>
      </CustomPaper>
    </Box>
  );
};

export default ThreeButtons;
