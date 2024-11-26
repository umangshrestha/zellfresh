import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { RatingDialogProps } from './RatingDialog.types.ts';
import CircularProgress from '@mui/material/CircularProgress';

export const RatingDialog = ({
  lastRating,
  currentRating,
  loading,
  comment,
  submitFeedback,
}: RatingDialogProps) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [description, setDescription] = useState(comment || '');
  useEffect(() => {
    if (comment && comment !== description)
      setDescription(comment);
  }, [comment, description]);

  const onClose = () => {
    submitFeedback(rating, description);
  };

  return (
    <Dialog
      open={true}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Submit your rating</DialogTitle>
      {
        loading? <CircularProgress />
          : (
      [<DialogContent key="content">
        {(lastRating === undefined) && (
          <Box>
            <FormLabel component="legend">Your last rating</FormLabel>
            <Rating name="read-only" value={lastRating} readOnly
                    precision={0.5}
                    disabled
            />
          </Box>
        )}
        <Box>
          <FormLabel component="legend">
            {lastRating ? 'Your new rating' : 'Your rating'}
          </FormLabel>
          <Rating
            name="simple-controlled"
            value={rating}
            max={5}
            precision={0.5}
            onChange={(_, newValue) => {
              setRating(newValue || 0);
            }}
          />
        </Box>
        <Box>
          <FormLabel component="legend">Description</FormLabel>
          <TextField
            multiline
            rows={4}
            value={description}
            onChange={(e) => {
              if (e.target.value?.length <= 255) setDescription(e.target.value);
            }}
          />
        </Box>
      </DialogContent>,
      <DialogActions key="actions">
        <Button onClick={onClose}>Submit</Button>
      </DialogActions>
      ]
      )
      }
    </Dialog>
  );
};
