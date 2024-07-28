import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const countryProvinces = {
  Australia: ["ACT", "New South Wales", "Northern Territory", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"],
  Canada: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"],
  NewZealand: ["Northland", "Auckland", "Waikato", "Bay of Plenty", "Gisborne", "Hawke's Bay", "Taranaki", "Manawatū-Whanganui", "Wellington", "Tasman", "Nelson", "Marlborough", "West Coast", "Canterbury", "Otago", "Southland"]
};

const countryCodes = {
  Australia: "+61",
  Canada: "+1",
  NewZealand: "+64",
  Other: "",
};

const SecondStep = ({ nextStep, prevStep, formData }) => {
  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .matches(/^\d+$/, "Mobile number must be numeric")
      .required("Required"),
    province: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });

  const handleNext = (values) => {
    if (values.country === "Other") {
      alert("Thank you for your interest in joining Muslims in Tech! We currently officially operate only in Australia, Canada, and New Zealand. If you are from a different country and still interested in joining our community, please express your interest by reaching out to us at info@muslimsintech.org");
      nextStep(values);
    } else {
      const updatedValues = {
        ...values,
        mobileNumber: `${countryCodes[values.country]}${values.mobileNumber}`,
      };
      nextStep(updatedValues);
    }
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleNext}
    >
      {({ isValid, errors, touched, values, setFieldValue }) => (
        <Form>
          <h1>Muslim in Tech - Registration</h1>
          <div>
            <label>Mobile Number</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Field
                type="text"
                name="countryCode"
                value={countryCodes[values.country]}
                disabled
                style={{ marginRight: '10px', width: '35px' }}
              />
              <Field
                type="text"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                pattern="\d*"
                title="Please enter only numbers"
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*$/.test(value)) {
                    setFieldValue('mobileNumber', value);
                  }
                }}
              />
            </div>
            <div className={`errorMsg ${errors.mobileNumber && touched.mobileNumber ? 'visible' : ''}`}>
              <ErrorMessage name="mobileNumber" component="div" />
            </div>
          </div>
          {values.country !== "Other" && (
            <>
              <div>
                <label>Province/Territory</label>
                <Field as="select" name="province">
                  <option value="" disabled>Select Province/Territory</option>
                  {countryProvinces[values.country]?.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </Field>
                <div className={`errorMsg ${errors.province && touched.province ? 'visible' : ''}`}>
                  <ErrorMessage name="province" component="div" />
                </div>
              </div>
              <div>
                <label>City/Town</label>
                <Field type="text" name="city" />
                <div className={`errorMsg ${errors.city && touched.city ? 'visible' : ''}`}>
                  <ErrorMessage name="city" component="div" />
                </div>
              </div>
              <div>
                <label>Postcode/Zipcode</label>
                <Field type="text" name="postcode" />
                <div className={`errorMsg ${errors.postcode && touched.postcode ? 'visible' : ''}`}>
                  <ErrorMessage name="postcode" component="div" />
                </div>
              </div>
            </>
          )}
          <div className="buttons-div">
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit" disabled={!isValid}>
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SecondStep;
