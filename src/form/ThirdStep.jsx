import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ThirdStep = ({ handleSubmit, prevStep, formData }) => {
  const validationSchema = Yup.object().shape({
    involvement: Yup.string().required("Required"),
    specialties: Yup.array().min(1, "Select at least one specialty"),
    referral: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ isValid, errors, touched }) => (
        <Form>
          <h1>Muslim in Tech - Registration</h1>
          <div className="involvement">
            <label>What is your involvement in tech?</label>
            <div className="involvement-div">
              <div>
                <Field type="radio" name="involvement" value="Student" />
                Student
              </div>
              <div>
                <Field type="radio" name="involvement" value="Seeking employment" />
                Seeking employment
              </div>
              <div>
                <Field type="radio" name="involvement" value="Employed" />
                Employed
              </div>
              <div>
                <Field type="radio" name="involvement" value="Own a tech-based business" />
                Own a tech-based business
              </div>
              <div>
                <Field type="radio" name="involvement" value="Simply interested" />
                Simply interested
              </div>
              <div>
                <Field type="radio" name="involvement" value="Other" />
                Other
              </div>
              <div className={`errorMsg ${errors.involvement && touched.involvement ? 'visible' : ''}`}>
                <ErrorMessage name="involvement" component="div" />
              </div>
            </div>
          </div>
          <div>
            <label>What's your tech specialty/interest?</label>
            <div className="interest-div">
              <div>
                <Field type="checkbox" name="specialties" value="Software Engineering" />
                Software Engineering
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Data Science" />
                Data Science
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Data Engineering" />
                Data Engineering
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Artificial Intelligence" />
                Artificial Intelligence
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Machine Learning (Deep Learning, NLP, Neural Networks...)" />
                Machine Learning (Deep Learning, NLP, Neural Networks...)
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Technical Art (Animation, Design, 3D, VFX...)" />
                Technical Art (Animation, Design, 3D, VFX...)
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Hardware Engineering" />
                Hardware Engineering
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Data Analytics" />
                Data Analytics
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="UI/UX" />
                UI/UX
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Product Management" />
                Product Management
              </div>
              <div>
                <Field type="checkbox" name="specialties" value="Other" />
                Other
              </div>
              <div className={`errorMsg ${errors.specialties && touched.specialties ? 'visible' : ''}`}>
                <ErrorMessage name="specialties" component="div" />
              </div>
            </div>
          </div>
          <div>
            <label>What's the name of the person that referred you or how did you get to know about us?</label>
            <Field type="text" name="referral" />
            <div className={`errorMsg ${errors.referral && touched.referral ? 'visible' : ''}`}>
              <ErrorMessage name="referral" component="div" />
            </div>
          </div>
          <div className="buttons-div">
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit" disabled={!isValid}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ThirdStep;
