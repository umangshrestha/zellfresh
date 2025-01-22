import { useStorageStore } from '@/lib/store';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Box from '@mui/material/Box';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { CustomerExperienceRatingProps } from './CustomerExperienceRating.types.ts';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export const CustomerExperienceRating = ({
  onSubmitFeedback,
  rating,
}: CustomerExperienceRatingProps) => {
  const [open, setOpen] = useState(rating === undefined);
  const theme = useStorageStore((state) => state.theme);

  return (
    <Snackbar
      open={open}
      autoHideDuration={null}
      onClose={() => setOpen(false)}
      message="Feedback submitted!"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Box
        className="flex justify-center flex-wrap flex-col p-4 rounded-lg"
        sx={{
          backgroundColor:
            theme === 'dark'
              ? 'rgba(0, 0, 0, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          boxShadow: 1,
          borderRadius: 1,
        }}
      >
        Please rate your experience with our service
        <StyledRating
          name="highlight-selected-only"
          onChange={(_, newValue) => {
            setOpen(false);
            onSubmitFeedback(newValue || 0);
          }}
          IconContainerComponent={IconContainer}
          getLabelText={(value: number) => customIcons[value].label}
          highlightSelectedOnly
        />
      </Box>
    </Snackbar>
  );
};
