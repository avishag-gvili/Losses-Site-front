import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';

type CardData = {
    text: string;
};

type ExampleComponentProps = {
    cards: CardData[];
};

const NewsItems: React.FC<ExampleComponentProps> = ({ cards }) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/items/${3}`);
    };
    const handleExpandClick = (index: number) => {
        setExpandedCard(index === expandedCard ? null : index);
    };

    return (
        <><Grid container spacing={2}>
            {cards.map((card, index) => (
                <Grid item xs={4} key={index}>
                    <Card>
                        <CardContent>
                            <IconButton
                                aria-label="expand"
                                onClick={() => handleExpandClick(index)}
                            >
                                <ZoomInIcon />
                            </IconButton>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {index === expandedCard || card.text.length <= 30
                                    ? card.text
                                    : `${card.text.substring(0, 30)}...`}
                            </Typography>
                            {card.text.length > 30 && (
                                <Button onClick={() => handleExpandClick(index)}>
                                    {expandedCard === index ? 'סגור' : 'קרא עוד'}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
            <Button variant="contained"
                onClick={handleClick}
                sx={{
                    top: 45,
                    right: '47%',
                    backgroundColor: '#ad1457'
                }}
            >
                לכל האבידות והמציאות
            </Button>
        </>
    );
};

export default NewsItems;
