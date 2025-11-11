import React, { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';

const formFields = {
  signUp: {
    gender: {
      order: 6,
      label: "Gender",
      placeholder: "Select your gender",
      isRequired: true,
      isReadOnly: false,
      type: "select",
      options: ["Male", "Female", "Other", "Prefer not to say"]
    },
    email: {
      order: 1
    },
    preferred_username: {
      order: 2,
      label: "Username"
    },
    phone_number: {
      order: 3
    },
    password: {
      order: 4
    },
    confirm_password: {
      order: 5
    }
  },
};

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Authenticator 
        formFields={{
          signUp: {
            username: {
              order: 1,
              placeholder: 'Username'
            },
            email: {
              order: 2,
              placeholder: 'Email'
            },
            password: {
              order: 3,
              placeholder: 'Password'
            },
            confirm_password: {
              order: 4,
              placeholder: 'Confirm Password'
            },
            phone_number: {
              order: 5,
              placeholder: 'Phone Number'
            },
            birthdate: {
              order: 6,
              placeholder: 'Birthdate (YYYY-MM-DD)'
            },
            gender: {
              order: 7,
              placeholder: 'Gender'
            }
          }
        }}
        services={{
          async handleSignUp(formData) {
            let { username, password, attributes } = formData;
            // S'assurer que username est en minuscules
            username = username.toLowerCase();
            attributes = {
              ...attributes,
              email: attributes.email.toLowerCase()
            };
            return { username, password, attributes };
          }
        }}
        signUpAttributes={[
          'email',
          'phone_number',
          'birthdate',
          'gender'
        ]}
      >
        {({ signOut, user }) => {
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
