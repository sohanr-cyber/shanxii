import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Rating } from '@mui/material';

const Ratings = ({ ratings, size, id, gap, color }) => {
    const [rating, setRating] = useState(ratings ?? 0);

    useEffect(() => {
        if (!isNaN(ratings)) {
            setRating(Number(ratings));
        }
    }, [ratings]);

    return (
        <Stack spacing={2}>
            <Rating
                name={`rating-${id}-${Math.random()}`}
                value={rating}
                precision={0.1}
                readOnly
                size={size || 'small'}
                sx={{
                    '& .MuiRating-icon': {
                        marginRight: gap || '2px',
                    },
                    '& .MuiRating-iconEmpty': {
                        color: color ? `${color}55` : 'rgb(107, 106, 106)', // subtle transparency
                    },
                }}
            />
        </Stack>
    );
};

export default Ratings;
