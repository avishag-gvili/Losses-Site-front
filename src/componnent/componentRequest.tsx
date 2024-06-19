import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Collapse, FormControlLabel, Switch, TextField, Button, Grid, Autocomplete, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { addRequest, deleteRequest, setRequest } from '../redux/request/request.slice';
import { selectRequest } from '../redux/request/request.selectors';
import { useAppSelector } from '../redux/Store';
import { RequestType } from '../types/types';
import { DeleteApi, GetByUserIdApi, PostApi } from '../services/requestService';
import MailIcon from '@mui/icons-material/Mail';
interface ToggleMenuProps {
    id: number;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [requestToAdd, setRequestToAdd] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const data: RequestType[] = await GetByUserIdApi(id);
            dispatch(setRequest(data));
        };
        fetchData();
    }, [id, dispatch]);

    const requests = useAppSelector(selectRequest);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleToggleDelete = async (id: number) => {
        try {
            await DeleteApi(id);
            dispatch(deleteRequest(id));
        } catch (error) {
            console.error('Failed to delete request:', error);
            alert('Failed to delete request');
        }
    };

    const handleAddProduct = async () => {
        if (requestToAdd.trim() !== '') {
            const categoryExists = requests.some(request => request.category === requestToAdd);

            if (categoryExists) {
                alert('הקטגוריה כבר קיימת עבור המשתמש הנוכחי.');
                return;
            }

            const request: RequestType = {
                id: 0,
                category: requestToAdd,
                userId: id,
                date: new Date().toISOString(),
            };
            const r = await PostApi(request);
            dispatch(addRequest(r));
            setRequestToAdd('');
        }
    };

    const handleChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        if (value !== null && value !== '') {
            setRequestToAdd(value);
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end" ml={5}>
                <Tooltip title="הבקשות שלי">
                    <IconButton onClick={handleToggle}>
                        {open ? <RemoveIcon /> : <MailIcon/>}
                    </IconButton>
                </Tooltip>
            </Box>
            <Collapse in={open}>
                <Box mt={2}>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        {requests.map((request) => (
                            <Grid item xs={12} key={request.id} display="flex" justifyContent="space-between" alignItems="center" width="100%" ml={5}>
                                <Typography variant="body1">{request.category}</Typography>
                                <Box ml={5}>
                                    <FormControlLabel control={<Switch defaultChecked />} onClick={() => handleToggleDelete(request.id!)} label="" />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Box display="flex" justifyContent="center" alignItems="center" mt={2} ml={5} mb={4}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={8}>
                                <Autocomplete
                                    options={top100Categories}
                                    onInputChange={handleChange}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField {...params} label="קטגוריות" variant="standard" fullWidth />
                                    )}
                                />
                            </Grid>
                            <Grid item display="flex" ml={5}>
                                <Button onClick={handleAddProduct} endIcon={<AddIcon />} variant="outlined" sx={{ color: '#827717' }}>
                                    הוסף בקשה
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
};

export default ToggleMenu;

const top100Categories = [
    { title: 'אביזרים לבית' },
    { title: 'אופניים ואביזרים' },
    { title: 'גינון' },
    { title: 'דיברי דואר' },
    { title: 'בגדים' },
    { title: 'הנעלה' },
    { title: 'כרטיסים שוברים וזיכויים' },
    { title: 'מוצרי תינוקות וילדים' },
    { title: 'מפתחות' },
    { title: 'מצלמות' },
    { title: 'משחקים' },
    { title: 'משקפים' },
    { title: 'ספרים' },
    { title: 'עגלות' },
    { title: 'פלאפונים ואוזניות' },
    { title: 'שקית קניות' },
    { title: 'תיקים וארנקים' },
    { title: 'תכשיטים' },
    { title: 'תשמישי קדושה' },
    { title: 'כלי עבודה' },
    { title: 'כלי נגינה' },
    { title: 'מוצרי חשמל' },
    { title: 'חיות מחמד' },
    { title: 'מזוודות' },
    { title: 'מחשבים וציוד מיחשוב' },
    { title: 'ריהוט' },
    { title: 'תרופות וציוד רפואי' }
];
