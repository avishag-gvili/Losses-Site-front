import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Card, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { ItemType, UserType } from '../types/types';
import { format } from 'date-fns';
import { getById } from '../services/userService';
import { useState } from 'react';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { cacheRtl, theme } from '../style/style';
import ClearIcon from '@mui/icons-material/Clear';
interface PositionedMenuProps {
    item: ItemType;
}
const PositionedMenu: React.FC<PositionedMenuProps> = ({ item }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [moreDatailsOfUser, setMoreDatailsOfUser] = useState<UserType | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        const user = await getById(item.userId)
        setMoreDatailsOfUser(user)
        console.log(user)
        console.log(moreDatailsOfUser)
        console.log(moreDatailsOfUser?.phone)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div dir="rtl">
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            color: "white",
                            fontSize: 25,

                        }}
                    >
                        פרטים נוספים
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Grid>
                            <Card variant="outlined" sx={{ maxWidth: 360 ,height:"100%"}}>
                                <Box sx={{ p: 2 }} justifyContent="flex-end">
                                <Button variant="text"onClick={handleClose} >
                                    <ClearIcon/>
                                </Button>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            פורסם בתאריך:{format(new Date(item.date), 'dd/MM/yyyy')}
                                        </Typography>
                                    </Stack>
                                    <Typography color="text.secondary" variant="body2">
                                        הועלה על ידי: {moreDatailsOfUser?.name}
                                    </Typography>
                                    <Divider />
                                    <Box >
                                        <Typography color="text.secondary" variant="body2">
                                           ניתן ליצור קשר במיספר : {moreDatailsOfUser?.phone}
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* <Divider />
                                <Box>
                                    <Button variant="outlined" sx={{paddingRight:'100%'}} onClick={handleClose}>חזור</Button>
                                </Box> */}
                            </Card>
                        </Grid>
                    </Menu>
                </div>
            </ThemeProvider>
        </CacheProvider>
    );
}
export default PositionedMenu