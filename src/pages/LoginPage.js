import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const formFields = {
    signIn: {
      username: {
        label: 'Email',
        placeholder: 'Enter your email',
        isRequired: true,
        order: 1
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
        isRequired: true,
        order: 2
      }
    },
    signUp: {
      username: {
        label: 'Email',
        placeholder: 'Enter your email',
        isRequired: true,
        order: 1
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
        isRequired: true,
        order: 2
      },
      confirm_password: {
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        isRequired: true,
        order: 3
      },
      email: {
        isRequired: false,
        order: 4,
        // Masquer complètement le champ email
        hidden: true
      }
    }
  };

  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      // Utiliser l'email comme username
      username = username.toLowerCase();
      attributes.email = username;
      return { username, password, attributes };
    }
  };

  return (
    <Authenticator 
      formFields={formFields}
      services={services}
      loginMechanisms={['email']}
    >
      {({ user }) => {
        if (user) {
          setTimeout(() => navigate('/'), 0);
        }
        return null;
      }}
    </Authenticator>
  );
};

export default LoginPage;