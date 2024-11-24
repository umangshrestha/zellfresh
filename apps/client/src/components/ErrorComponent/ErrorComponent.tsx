import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorComponentProps } from './ErrorComponent.types.ts';

export const ErrorComponent = ({
  title,
  description,
  image,
  cta,
}: ErrorComponentProps) => (
  <Container component="main" maxWidth="sm">
    <Box
      padding={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      {image && (
        <img src={image.url} alt={image.alt} width="250" loading="lazy" />
      )}
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">
        {description.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Typography>

      {cta && (
        <Box mt={2}>
          <Button
            component={RouterLink}
            to={cta?.to}
          >
            {cta?.text}
          </Button>
        </Box>
      )}
    </Box>
  </Container>
);
