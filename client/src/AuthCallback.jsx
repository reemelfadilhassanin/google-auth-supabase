// src/AuthCallback.jsx
import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session) {
          navigate('/'); 
        } else {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error during callback:', error);
        navigate('/login');
      });
  }, []);

  return <p>Signing in...</p>;
};

export default AuthCallback;
