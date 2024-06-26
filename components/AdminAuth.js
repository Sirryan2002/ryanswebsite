import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AdminAuth = ({ onAuthSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      onAuthSuccess();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Admin Login</Typography>
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default AdminAuth;
