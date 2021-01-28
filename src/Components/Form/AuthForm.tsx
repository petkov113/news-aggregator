import { Formik, Form, FormikValues, ErrorMessage, FormikHelpers, FormikProps, Field } from 'formik'
import { FieldType, AuthProps } from './AuthTypes'
import { toCapital } from '../../utilities/js/string'
import React, { FC } from 'react'
import Button from '../UI/Button/Button'
import Loader from '../UI/Loader/Loader'
import * as Yup from 'yup'
import './AuthForm.scss'

const initialValues: FormikValues = { email: '', password: '' }

const onSubmit = (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
  actions.setSubmitting(false)
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('The field is required'),
  password: Yup.string()
    .min(6, 'The password should contain at least 6 symbols')
    .required('The field is required'),
  generall: Yup.string(),
})

const renderError = (message: string) => {
  return (
    <span className="Form__error">
      <i className="fas fa-exclamation-circle"></i>
      {message}
    </span>
  )
}

const FormField: FC<{ type: FieldType; name?: string }> = ({ type, name }) => {
  return (
    <Field
      className="Form__field"
      type={type}
      name={name || type}
      id={name || type}
      placeholder={name ? toCapital(name) : toCapital(type)}
    />
  )
}

const AuthForm: FC<AuthProps> = ({ handleRegister, isLoading, handleLogin }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(props: FormikProps<FormikValues>) => (
        <Form name="auth" className="Form">
          <div className="Form__wrapper">
            <FormField type="email" />
            <ErrorMessage name="email" render={renderError} />
          </div>
          <div className="Form__wrapper">
            <FormField type="password" />
            <ErrorMessage name="password" render={renderError} />
          </div>
          <div className="Form__wrapper-buttons">
            <Button
              type="button"
              btnType="primary"
              disabled={!(props.isValid && props.dirty)}
              onClick={() => handleLogin(props.values, props.setStatus, true)}
              value="Login"
            />
            <Button
              type="button"
              btnType="secondary"
              onClick={() => handleRegister(props.values, props.setStatus, false)}
              disabled={!(props.isValid && props.dirty)}
              value="Register"
            />
          </div>
          {isLoading ? (
            <div className="Form__loader">
              <Loader />
            </div>
          ) : (
            props.status && <span className="Form__error-form">{props.status.generall}</span>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default AuthForm
