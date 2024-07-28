import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css"

const FirstStep = ({ nextStep, formData }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={nextStep}
    >
      {({ isValid, errors, touched }) => (
        <Form>
          <h1>Muslim in Tech - Registration</h1>
          <div>
            <label>Email</label>
            <Field type="email" name="email" />
            <div className={`errorMsg ${errors.email && touched.email ? 'visible' : ''}`}>
              <ErrorMessage name="email" component="div" />
            </div>
          </div>
          <div>
            <label>First Name</label>
            <Field type="text" name="firstName" />
            <div className={`errorMsg ${errors.firstName && touched.firstName ? 'visible' : ''}`}>
              <ErrorMessage name="firstName" component="div" />
            </div>
          </div>
          <div>
            <label>Last Name</label>
            <Field type="text" name="lastName" />
            <div className={`errorMsg ${errors.lastName && touched.lastName ? 'visible' : ''}`}>
              <ErrorMessage name="lastName" component="div" />
            </div>
          </div>
          <div className="select-container">
            <label>Country</label>
            <Field as="select" name="country">
              <option value="" disabled>Select Country</option>
              <option value="Australia">Australia</option>
              <option value="Canada">Canada</option>
              <option value="NewZealand">New Zealand</option>
              <option value="Other">Other</option>
            </Field>
            <div className={`errorMsg ${errors.country && touched.country ? 'visible' : ''}`}>
              <ErrorMessage name="country" component="div" />
            </div>
          </div>
          <div className="buttons-div">
            <button type="submit" disabled={!isValid}>
              Next
            </button>
          </div>
        </Form>
      )
      }
    </Formik >
  );
};

export default FirstStep;
