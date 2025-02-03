import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { Rating } from '@mui/material';

const Ratings = ({ ratings, size, id }) => {
    const [rating, setRating] = useState(ratings ?? 0);

    useEffect(() => {
        if (!isNaN(ratings)) {
            setRating(Number(ratings));
        }
    }, [ratings]);

    return (
        <>
            {/* {rating} */}
            <Stack spacing={1}>
                <Rating
                    name={`rating-${id}-${Math.random()}`} // Ensure uniqueness
                    value={rating}
                    precision={0.1}
                    readOnly
                    size={size || "small"}
                />
            </Stack>
        </>
    );
};

export default Ratings;
