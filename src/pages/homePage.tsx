

import { Box, List, ListItem, Typography, styled } from '@mui/material';
import ThreeButtons from '../componnent/componentThreeButtons';
import { keyframes } from '@emotion/react';
import image from '../close-up-people-connecting-through-hands.jpg';
import NewsItems from '../componnent/componentNews';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { GetApi } from '../services/itemService';
import { setItem } from '../redux/item/item.slice';
import { useAppSelector } from '../redux/Store';
import { selectItem } from '../redux/item/item.selectoe';
import { ItemType } from '../types/types';
import CustomBox from '../componnent/componentMap';
const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '420px', // Set height of the image container
  overflow: 'hidden',
});

const FixedImage = styled('img')({
  width: '100%',
  height: '765px', // Set height of the image
  objectFit: 'cover',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
  animation: `${slideInFromRight} 1s forwards`,
});

const CenteredText = styled(Typography)({
  position: 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: '75px',
  fontWeight: 'bold',
  zIndex: 1,
});

const CenteredText2 = styled(Typography)({
  position: 'absolute',
  top: '90%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: '40px',
  fontWeight: 'bold',
  zIndex: 1,
});

const ContentContainer = styled(Box)({
  position: 'relative',
  zIndex: 2, // Ensure content is above the image
  backgroundColor: 'white',
  marginTop: '250px', // Adjusted to start below the image
  paddingBottom: '50px',
});

export default function HomePage() {
  const dispatch = useDispatch();
  const [latestItems, setLatestItems] = useState<ItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetApi();
      dispatch(setItem(data));

      const sortedData = [...data];
      sortedData.sort((a: ItemType, b: ItemType) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
      const latestItems = sortedData.slice(0, 6);
      setLatestItems(latestItems);
    };

    fetchData();
  }, []);
  const copiedItems = latestItems.map(item => ({ text: item.name +" \n מקטגורית:"+ item.category +" \n באזור:"+item.area }));
    const cardsData = [
      ...copiedItems
    ];

  return (
    <>
      <ImageContainer>
        <FixedImage src={image} alt="תיאור תמונה" />
        <CenteredText>השינוי מתחיל איתך</CenteredText>
        <CenteredText2>-המקום שלך לתת ולקבל-</CenteredText2>
      </ImageContainer>

      <ContentContainer>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={-6}>
          <ThreeButtons />
        </Box>
        <Box height="1500px" mt={5}>
          <Typography variant="h3" align="center" mt={10}>
            האבידות והמציאות החדשות
          </Typography>
          <Typography variant="body1" align="center" style={{ alignItems: 'center', justifyContent: 'center' }} mt={5}>
            לכל האבידות והמציאות ליחצו על הכפתור למטה
            <ArrowDownwardIcon />
          </Typography>
          <Typography mt={5} >
            <NewsItems cards={cardsData} />
          </Typography>
          <Box
            sx={{
              backgroundColor: '#1a237e',
              height: '200px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            mt={15}
          >
            <List>
              <ListItem>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  סגולה בדוקה ומנוסה למציאת אבידה, לומר ג' פעמים את המדרש :
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h4" sx={{ color: 'white' }}>
                  "אמר רבי בנימין, הכל בחזקת סומין, עד שהקדוש ברוך הוא מאיר את עיניהם."
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  (מדרש רבה בראשית נ"ג, י"ד)
                </Typography>
              </ListItem>
            </List>
          </Box>
          <Typography mt={15} >
            <CustomBox/>
          </Typography>
        </Box>
      </ContentContainer>
    </>
  );
}
