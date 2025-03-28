import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Paper,
  useTheme
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Login as LoginIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Mock data for demonstration
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      date: "2024-03-25",
      time: "10:30 AM",
      hospital: "MedYatra Hospital",
      location: "123 Healthcare Ave, Medical District",
      status: "Confirmed",
      patientName: user ? `${user.firstName} ${user.lastName}` : "John Doe"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialization: "Dermatologist",
      date: "2024-03-28",
      time: "2:00 PM",
      hospital: "MedYatra Hospital",
      location: "123 Healthcare Ave, Medical District",
      status: "Pending",
      patientName: user ? `${user.firstName} ${user.lastName}` : "John Doe"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // Unauthenticated view
  if (!user) {
    return (
      <Box 
        sx={{ 
          py: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh'
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            width: '100%',
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            p: 2
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <CalendarIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome to MedYatra
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please log in to view your appointment details and manage your healthcare journey.
            </Typography>
            <Box sx={{ 
              p: 2, 
              mb: 3, 
              backgroundColor: 'rgba(0, 127, 255, 0.05)', 
              borderRadius: 2,
              border: '1px solid rgba(0, 127, 255, 0.2)'
            }}>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                New to MedYatra? Book an appointment to receive your login credentials via email.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/chat')}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                Chat with AI to Book Appointment
              </Button>
            </Box>
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              onClick={handleLoginRedirect}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Log In
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Authenticated view
  return (
    <Box sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome back, {user.firstName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's an overview of your upcoming appointments
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          Log Out
        </Button>
      </Box>

      {/* Quick Actions */}
      <Paper sx={{ p: 2, mb: 4, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Book New Appointment
          </Button>
        </Box>
      </Paper>

      {/* Appointments Grid */}
      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} md={6} key={appointment.id}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                '&:hover': {
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 56, 
                        height: 56,
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.main
                      }}
                    >
                      <HospitalIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {appointment.doctorName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.specialization}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CalendarIcon color="action" fontSize="small" />
                      <Typography variant="body2">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <TimeIcon color="action" fontSize="small" />
                      <Typography variant="body2">{appointment.time}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationIcon color="action" fontSize="small" />
                      <Typography variant="body2">{appointment.hospital}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <PersonIcon color="action" fontSize="small" />
                      <Typography variant="body2">{appointment.patientName}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <Tooltip title="Edit Appointment">
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel Appointment">
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {appointments.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: 2
          }}
        >
          <CalendarIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No appointments scheduled
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Book your first appointment to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Book Appointment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage; 