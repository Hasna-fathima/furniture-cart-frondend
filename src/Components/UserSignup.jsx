import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; 
import '/src/Components/Signup.Login.css';
import { useNavigate } from 'react-router-dom';


const UserSignup = () => {

  const navigate=useNavigate()
  const initialValues = {
    firstname: '',
    lastname: '',
    username:'',
    email: '',
    password: '',
    phoneNumber: ''
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    lastname: Yup.string().max(10, 'Must be 10 characters or less').required('Required'),
    username: Yup.string().max(10, 'Must be 10 characters or less').required('Required'),
    email: Yup.string().email('Please use a valid email address.').required('Email address is required.'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters.'),
    phoneNumber: Yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Invalid phone number')
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Send form data to backend API
      const response = await axios.post('http://localhost:3000/api/user/signup', values);

      // Handle successful response
      console.log('Form submitted: ', response.data);
      navigate('/user/login')

      // Reset form after successful submission
      resetForm();

      // Set submitting state to false after form is reset
      setSubmitting(false);
    } catch (error) {
      // Handle error state if backend call fails
      console.error('Error submitting form: ', error);
      // You can set an error state and display an error message to the user
    }
  };

  return (
    <div className='container'>
      <h3>Signup</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form>
            <label htmlFor="firstname">First Name</label>
            <Field type="text" name="firstname" onChange={handleChange} />
            <ErrorMessage className="error" name="firstname" component="div" /><br/>

            <label htmlFor="lastname">Last Name</label>
            <Field type="text" name="lastname" onChange={handleChange} />
            <ErrorMessage className="error" name="lastname" component="div" /><br/>

             <label htmlFor="username">username</label>
            <Field type="text" name="username" onChange={handleChange} />
            <ErrorMessage className="error" name="username" component="div" /><br/>

            <label htmlFor="email">Email Address</label>
            <Field type="email" name="email" onChange={handleChange} />
            <ErrorMessage className="error" name="email" component="div" /><br/>

            <label htmlFor="password">Password</label>
            <Field type="password" name="password" onChange={handleChange} />
            <ErrorMessage className="error" name="password" component="div" /><br/>

            <label htmlFor="phoneNumber">Phone</label>
            <Field type="text" name="phoneNumber" onChange={handleChange} />
            <ErrorMessage className="error" name="phoneNumber" component="div" /><br/>

            <button type='submit'>Signup</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserSignup