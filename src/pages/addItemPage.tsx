import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, AlertTitle, Box, FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Stack, TextField, Theme, ThemeProvider, createTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';
import RenderGroup from '../componnent/commponentInputCategory';
import { Add } from '@mui/icons-material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Playground from '../componnent/commponentInputArea';
import { ItemType } from '../types/types';
import { addItem } from '../redux/item/item.slice';
import { PostApi } from '../services/itemService';
import useCurrentUser from '../redux/getCurrentUser/getCurrentUser';
import { getSession } from '../utils/auth.utils';
import { theme, cacheRtl } from '../style/style'
import { CacheProvider } from "@emotion/react";
import GuestGuard from '../utils/GuestGuard';
import AuthGuard from '../utils/AuthGuard';
export default function ScrollDialog() {
  const dispatch = useDispatch()
  const currentUser = getSession();
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    location: '',
    status: 0,
    description: 'לא צויין תיאור',
    area: ''
  });
  const [open, setOpen] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    debugger
    event.preventDefault()
    if (formValid) {
      const itemToPost: ItemType = {
        id: 0,
        name: itemData.name,
        category: itemData.category,
        status: itemData.status,
        location: itemData.location,
        area: itemData.area,
        discraption: itemData.description,
        date: new Date(Date.now()).toISOString(),
        userId: currentUser?.user.id!
      }
      const item: ItemType = await PostApi(itemToPost)
      dispatch(addItem(item));
      console.log('Item added:', item);
      handleClose();
    } else {
      <Alert severity="error">
        <AlertTitle>אופס...</AlertTitle>
       כל השדות הן שדות חובה!
      </Alert>
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target
    setItemData({ ...itemData, [name]: value })
    setFormValid(
      itemData.name !== '' &&
      itemData.category !== '' &&
      itemData.location !== '' &&
      itemData.status !== 0 &&
      itemData.area !== ''
    );
  };
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Box dir="rtl">
          
             <MenuItem
              onClick={handleClickOpen}
              style={{ textDecoration: 'none', color: 'inherit'}}
            >
              הוסף מציאה /אבידה
            </MenuItem>
            
             {open&&(<AuthGuard> 
             <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title" dir="rtl">להוספת מציאה/אבידה</DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Stack spacing={3} >
                      <TextField
                        label="שם"
                        id="name"
                        name="name"
                        value={itemData.name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginTop: '20px' }}
                      />
                      <FormControl fullWidth>
                        <RenderGroup handleChange={handleChange} />
                      </FormControl>
                      <FormControl fullWidth>
                        <Playground handleChange={handleChange} />
                      </FormControl>
                      <FormControl fullWidth>
                        <RadioGroup
                          aria-label="סטטוס"
                          id="status"
                          name="status"
                          value={itemData.status}
                          onChange={handleChange}
                        >
                          <FormControlLabel value={1} control={<Radio />} label="אבדה" />
                          <FormControlLabel value={2} control={<Radio />} label="מציאה" />
                        </RadioGroup>
                      </FormControl>
                      <TextField
                        label="מיקום"
                        id="location"
                        name="location"
                        value={itemData.location}
                        onChange={handleChange}
                        fullWidth
                      />
                      <TextField
                        label="תיאור"
                        id="description"
                        name="description"
                        value={itemData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                      />
                    </Stack>
                    <Box
                      sx={{ m: 2 }}
                    >
                      <Button
                        onClick={handleClose}
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={<AutorenewIcon />}
                      >ביטול
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={<Add />}
                      >
                        הוסף
                      </Button>
                    </Box>
                  </Box>
                </DialogContentText>
              </DialogContent>
            </Dialog>
            </AuthGuard> )}
          </Box>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}