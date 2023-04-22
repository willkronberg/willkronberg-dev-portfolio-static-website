import { Container, Paper } from '@mui/material';
import React from 'react';
import Snowfall from 'react-snowfall';

export const April: React.FC = () => {
  return (
    <>
      <Snowfall color="#FF69B4" radius={[2.0, 20.0]} style={{ zIndex: -1 }} />
      <Snowfall color="#99CCFF" radius={[2.0, 20.0]} style={{ zIndex: -1 }} />
      <Snowfall color="#99FFCC" radius={[2.0, 20.0]} style={{ zIndex: -1 }} />
      <Container>
        <Paper style={{ padding: '2rem' }}>
          <p style={{ fontSize: '45px', textAlign: 'center' }}>I love April Scott with all of my heart!!!</p>
        </Paper>
      </Container>
    </>
  );
};

export default April;
