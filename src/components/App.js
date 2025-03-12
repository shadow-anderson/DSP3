import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { db } from '../firebase';
import Layout from './Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AIChat = React.lazy(() => import('./AIChatImproved'));
const ClinicRecommender = React.lazy(() => import('./ClinicRecommenderEnhanced'));
const CalendarComponent = React.lazy(() => import('./CalendarComponent'));
const TimeSlotGrid = React.lazy(() => import('./TimeSlotGrid'));
const BookingConfirmationForm = React.lazy(() => import('./BookingConfirmationForm'));

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingFallback />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/recommend" element={<ClinicRecommender />} />
            <Route path="/book" element={
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <CalendarComponent />
                <TimeSlotGrid />
                <BookingConfirmationForm />
              </Box>
            } />
          </Routes>
        </Layout>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;