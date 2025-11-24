import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Authenticator
        formFields={{
          signIn: {
            email: { placeholder: 'Email' },
            password: { placeholder: 'Password' }
          },
          signUp: {
            email: { order: 1, placeholder: 'Email' },
            password: { order: 2, placeholder: 'Password' },
            confirm_password: { order: 3, placeholder: 'Confirm Password' },
            phone_number: { order: 4, placeholder: 'Phone Number' },
            birthdate: { order: 5, placeholder: 'Birthdate (YYYY-MM-DD)' },
            gender: { order: 6, placeholder: 'Gender' }
          }
        }}

        /* ✅ inclure les attributs requis */
        signUpAttributes={[
          'email',
          'phone_number',
          'birthdate',
          'gender',
          'preferred_username',
          'name'
        ]}
      >
        {({ user }) => {
          if (user) {
            setTimeout(() => navigate('/'), 0);
          }
          return null;
        }}
      </Authenticator>
    </div>
  );
};

export default LoginPage;
