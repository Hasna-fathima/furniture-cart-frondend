import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    const { email, password } = values;

    try {
      let response;

      // Attempt admin login
      try {
        response = await axios.post('http://localhost:3000/api/user/admin/signin', { email, password });
        if (response.status === 200 && response.data.user && response.data.user.role === 'admin') {
          console.log('Admin login successful!');
          localStorage.setItem('userId', response.data.userId); // Store admin user ID in localStorage
          navigate('/admin/home');
          return;
        }
      } catch (adminError) {
        console.log('Admin login failed, trying user login');
      }

      // Attempt regular user login
      try {
        response = await axios.post('http://localhost:3000/api/user/signin', { email, password });
        if (response.status === 200) {
          console.log('User login successful!');
          localStorage.setItem('userId', response.data.userId); // Store regular user ID in localStorage
          navigate('/home');
          return;
        } else {
          throw new Error('Invalid login credentials');
        }
      } catch (userError) {
        console.error('User login failed:', userError.response.data);
        setFieldError('email', 'Invalid login credentials');
        setFieldError('password', 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setFieldError('email', 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage className="error" name="email" component="div" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage className="error" name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
