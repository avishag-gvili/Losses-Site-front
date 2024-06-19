import * as React from 'react';
import { keyframes, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getSession } from '../utils/auth.utils';
import { AuthUserType, ItemType } from '../types/types';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DeleteApi, GetByUserIdApi } from '../services/itemService';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../redux/item/item.slice';
import { PATHS } from '../router/path';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CardActionArea, Divider } from '@mui/material';
import { format } from 'date-fns';
import { Chip } from '@mui/joy';
import ToggleMenu from '../componnent/componentRequest';

// הגדרת האנימציה
const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// הגדרת ה-Div בעזרת styled-components
const BouncingDiv = styled('div')`
  animation: ${bounceAnimation} 2s infinite; // הוספת האנימציה על ה-Div
`;




interface AccessibilityTooltipsProps {
  item: ItemType;
  itemsOfUser: ItemType[];
  setItemsOfUser: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

const AccessibilityTooltips: React.FC<AccessibilityTooltipsProps> = ({ item, itemsOfUser, setItemsOfUser }) => {

  const dispatch = useDispatch();

  const DelateItem = async () => {
    const itemToDelate = await DeleteApi(item.id!);
    dispatch(deleteItem(item.id!));
    setItemsOfUser(itemsOfUser.filter((i) => i.id !== item.id));
  };

  return (
    <div>
      <Tooltip title="מחק פריט">
        <IconButton onClick={DelateItem}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};


const AccordionExpandIcon: React.FC<AccessibilityTooltipsProps> = ({ item, itemsOfUser, setItemsOfUser }) => {
  const formattedDate = format(new Date(item.date), 'dd/MM/yyyy');
  return (
    <div>
      <Accordion sx={{ width: '100%', padding: '10px' }}>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid container spacing={3}>
              <Grid xs={8} sx={{ fontSize: 'large' }}>
                שם: {"  " + item.name}
              </Grid>
              <Grid xs={8} sx={{ fontSize: 'large' }}>
                תאריך העלאה: {"  " + formattedDate}
              </Grid>
              <Grid xs={8} sx={{ fontSize: 'large' }}>
                מיקום:{"  " + item.location}
              </Grid>
              <Grid xs={8} sx={{ fontSize: 'large' }}>
                אבידה / מציאה: {item && item.status == 1 ? " אבידה " : " מציאה "}
              </Grid>
            </Grid>
            <AccessibilityTooltips item={item} itemsOfUser={itemsOfUser} setItemsOfUser={setItemsOfUser} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [userLetter, setUserLetter] = React.useState<null | string>(null);
  const [itemsOfUser, setItemsOfUser] = React.useState<ItemType[]>([]);
  const user: AuthUserType | null | undefined = getSession();
  useEffect(() => {
    if (user && user.user && user.user.name)
      setUserLetter(user.user.name.charAt(0))
    else
      setUserLetter(null)
  }, [[], userLetter, user]);

  const handleExpandClick = async () => {
    if (!expanded) {
      const items = await GetByUserIdApi(user?.user.id!)
      setItemsOfUser([...items]);
      setExpanded(true);
    }
    else
      setExpanded(false);
  };

  return (
    <Box sx={{ width: '350px', paddingRight: '20px', paddingTop: '20px' }}>
      <Box sx={{ width: '350px', paddingRight: '20px', paddingTop: '20px' }}>
        <Box>
          <ToggleMenu id={user?.user.id!} />
        </Box>
        <BouncingDiv>
          <Avatar sx={{ width: 60, height: 60, bgcolor: '#ad1457', fontSize: '40px', marginRight: '5px' }} aria-label="recipe">
            {userLetter}
          </Avatar>
        </BouncingDiv>
        <Divider>
          <Chip variant="soft" color="neutral" size="sm">
            - הפרטים שלי -
          </Chip>
        </Divider>
      </Box>

      <CardActionArea>
        <Typography variant="body2">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={8} sx={{
                fontSize: '28px',
                fontFamily: 'Arial Hebrew',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: 'black',
              }}>
                שם: {user?.user.name}
              </Grid>
              <Grid xs={8} sx={{ fontFamily: 'Arial Hebrew', fontWeight: 'bold', fontSize: '28px' }}>
                טלפון : {user?.user.phone}
              </Grid>
              <Grid xs={8} sx={{ fontFamily: 'Arial Hebrew', fontWeight: 'bold', fontSize: '28px' }}>
                כתובת איימיל : {user?.user.email}
              </Grid>
            </Grid>
          </Box>
        </Typography>
      </CardActionArea>
      
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Tooltip title="הפריטים שלי"><ExpandMoreIcon /></Tooltip>
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {itemsOfUser.map((item: ItemType) => (
            <AccordionExpandIcon item={item} itemsOfUser={itemsOfUser} setItemsOfUser={setItemsOfUser} />
          ))}
        </Collapse>
      
    </Box>
  );
}

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <Avatar />
        אזור אישי
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <RecipeReviewCard />
      </Drawer>
    </div>
  );
}