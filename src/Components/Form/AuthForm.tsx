import React, { FC } from 'react';
import {
  Formik,
  Form,
  Field,
  FormikValues,
  ErrorMessage,
  FormikHelpers,
  FormikProps
} from 'formik';
import * as Yup from 'yup';
import Button from '../UI/Button/Button';
import './AuthForm.scss';
import { onRegister } from '../../redux/actions/appActions';
import { connect, ConnectedProps  } from 'react-redux';

const connector = connect(null, { onRegister });
type PropsFromRedux = ConnectedProps<typeof connector>

const initialValues: FormikValues = { email: '', password: '' };

const onSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
  console.log(values, actions);
  actions.setSubmitting(false);
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('The field is required'),
  password: Yup.string()
    .min(6, 'The password should contain at least 6 symbols')
    .required('The field is required'),
});

const renderError = (message: string) => (
  <span className='Form__error'>
    <i className='fas fa-exclamation-circle'></i>
    {message}
  </span>
);

const renderField = (type: 'email' | 'password' | 'text' | 'checkbox', name?: string) => {
  return (
    <Field
      className='Form__field'
      type={type}
      name={name || type}
      id={name || type}
      placeholder={
        name
          ? name.replace(/^\w/, (l) => l.toLocaleUpperCase())
          : type.replace(/^\w/, (l) => l.toUpperCase())
      }
    />
  );
};

const AuthForm: FC<PropsFromRedux> = ({ onRegister }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(props: FormikProps<FormikValues>) => (
        <Form className='Form'>
          <div className='Form__wrapper'>
            {renderField('email')}
            <ErrorMessage name='email' render={renderError} />
          </div>
          <div className='Form__wrapper'>
            {renderField('password')}
            <ErrorMessage name='password' render={renderError} />
          </div>
          <div className='Form__wrapper-buttons'>
            <Button
              type='submit'
              btnType='primary'
              disabled={!(props.isValid && props.dirty)}
              value='Login'
            />
            <Button
              onClick={() => onRegister(props.values, props.setErrors, props.setSubmitting)}
              type='button'
              btnType='secondary'
              disabled={!(props.isValid && props.dirty)}
              value='Register'
            />
          </div>
          <span className='Form__error-form'>Bad request</span>
        </Form>
      )}
    </Formik>
  );
};

export default connector(AuthForm);
