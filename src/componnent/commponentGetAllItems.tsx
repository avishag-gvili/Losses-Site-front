import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetApi } from '../services/itemService';
import { format } from 'date-fns';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Autocomplete,
  Grid,
  IconButton,
  ThemeProvider,
  Accordion,
  Typography,
  Alert,
  AlertTitle
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { cacheRtl, theme } from '../style/style';
import { ItemType } from '../types/types';
import PositionedMenu from './componetMoreDitails.tsx';
import { useAppSelector } from '../redux/Store';
import { selectItem } from '../redux/item/item.selectoe';
import { setItem } from '../redux/item/item.slice';
import { CacheProvider } from '@emotion/react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useParams } from 'react-router';


interface Column {
  id: 'Name' | 'Category' | 'Date' | 'Area' | 'Location' | 'Discraption';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Name', label: 'שם', minWidth: 170 },
  { id: 'Category', label: 'קטגוריה', minWidth: 100 },
  {
    id: 'Date',
    label: 'תאריך עדכון',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Location',
    label: 'מקום',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Area',
    label: 'אזור',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Discraption',
    label: 'תאור',
    minWidth: 170,
    align: 'right',
  },
];

const top100Categories = [
  { title: 'אביזרים לבית' },
  { title: 'אופניים ואביזרים' },
  { title: 'גינון' },
  { title: 'דיברי דואר' },
  { title: 'בגדים' },
  { title: 'הנעלה' },
  { title: 'כרטיסים שוברים וזיכויים' },
  { title: 'מוצרי תינוקות וילדים' },
  { title: "מפתחות" },
  { title: 'מצלמות' },
  { title: 'משחקים', },
  { title: 'משקפים' },
  { title: 'ספרים' },
  { title: 'עגלות', },
  { title: 'פלאפונים ואוזניות', },
  { title: 'שקית קניות ' },
  { title: 'תיקים וארנקים' },
  { title: 'תכשיטים', },
  { title: "תשמישי קדושה" },
  { title: 'כלי עבודה' },
  { title: 'כלי נגינה' },
  { title: 'מוצרי חשמל' },
  { title: 'חיות מחמד' },
  { title: 'מיזוודות' },
  { title: 'מחשבים וציוד מיחשוב' },
  { title: 'ריהוט' },
  { title: "תרופות וציוד רפואי" }
];

const top100Areas = [
  { title: 'החוף הצפוני' },
  { title: 'הצפון' },
  { title: 'הגליל' },
  { title: 'השרון' },
  { title: 'המרכז' },
  { title: 'השפלה' },
  { title: 'הנגב' },
  { title: 'ירושלים והסביבה' },
  { title: 'הרי יהודה והשומרון' },
  { title: 'ערבה' },
];

export default function StickyHeadTable() {
  const { id } = useParams();
  const flagNumber = parseInt(id!); 
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<ItemType[] | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [filters, setFilters] = useState({ category: '', date: '', area: '' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetApi();
      dispatch(setItem(data));
    };

    fetchData();
  }, []);

  const items = useAppSelector(selectItem);

  useEffect(() => {
    let filteredItems = items;
    debugger
    if (flagNumber === 1 || flagNumber === 2) {
      filteredItems = filteredItems.filter((i: { status: number; }) => i.status === flagNumber);
    }

    if (filters.category) {
      filteredItems = filteredItems.filter(i => i.category === filters.category);
    }

    if (filters.date) {
      filteredItems = filteredItems.filter(i => format(new Date(i.date), 'yyyy-MM-dd') === filters.date);
    }

    if (filters.area) {
      filteredItems = filteredItems.filter(i => i.area === filters.area);
    }

    // if (filteredItems.length === 0) {
    //   setRows(items);
    // } else {
      setRows(filteredItems);
    // }
  }, [items, id, filters]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowMouseEnter = (rowId: number) => {
    setHoveredRow(rowId);
  };

  const handleRowMouseLeave = () => {
    setHoveredRow(null);
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const isFiltered = !!filters.category || !!filters.date || !!filters.area;
  const noResults = isFiltered && rows?.length === 0;

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Paper elevation={24} variant="elevation" square={false} sx={{ width: '100%', overflow: 'hidden', marginTop: '10%' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                סינון<FilterAltIcon sx={{color:'#1565c0'}}/>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Autocomplete
                      options={top100Categories}
                      getOptionLabel={(option) => option.title}
                      onInputChange={(event, newValue) => handleFilterChange('category', newValue)}
                      renderInput={(params) => (
                        <TextField {...params} label="קטגוריות" variant="standard" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="תאריך"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => handleFilterChange('date', event.target.value)}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      options={top100Areas}
                      getOptionLabel={(option) => option.title}
                      onInputChange={(event, newValue) => handleFilterChange('area', newValue)}
                      renderInput={(params) => (
                        <TextField {...params} label="אזור בארץ" variant="standard" />
                      )}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            {noResults ? (
                <Alert severity="warning">
                  <AlertTitle>אופס...</AlertTitle>
                  לא נמצאו פרטים העונים למה שחיפשת
                </Alert>
            ) : (
              <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow sx={{ Maxwidth: '100%' }}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          sx={{
                            Maxwidth: '100',
                            fontSize: '19px',
                            fontFamily: 'Arial Hebrew',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            display: 'table-cell',
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid xs={8}>
                              {column.label}
                            </Grid>
                            <Grid xs={4}>
                            </Grid>
                          </Grid>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        onMouseEnter={() => handleRowMouseEnter(row.id!)}
                        onMouseLeave={handleRowMouseLeave}
                        sx={{
                          cursor: 'pointer',
                          position: 'relative',
                          width: '100',
                          transition: 'none',
                        }}
                      >
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell>{row.category} </TableCell>
                        <TableCell>{format(new Date(row.date), 'dd/MM/yyyy')} </TableCell>
                        <TableCell>{row.location} </TableCell>
                        <TableCell>{row.area} </TableCell>
                        <TableCell>{row.discraption}</TableCell>
                        {hoveredRow === row.id && (<PositionedMenu item={row} />)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
