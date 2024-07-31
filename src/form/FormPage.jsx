import React, { useState, useEffect } from 'react';
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal';
import axios from 'axios';
import { HashLoader } from 'react-spinners';

const countryProvinces = {
    USA: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
    Australia: ["ACT", "New South Wales", "Northern Territory", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"],
    Canada: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"],
    NewZealand: ["Northland", "Auckland", "Waikato", "Bay of Plenty", "Gisborne", "Hawke's Bay", "Taranaki", "Manawatū-Whanganui", "Wellington", "Tasman", "Nelson", "Marlborough", "West Coast", "Canterbury", "Otago", "Southland"]
};

const countryCodes = {
    USA: "+1",
    Australia: "+61",
    Canada: "+1",
    NewZealand: "+64",
    Other: "",
};

const FormPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        country: '',
        mobileNumber: '',
        province: '',
        city: '',
        postcode: '',
        involvement: '',
        specialties: [],
        referral: '',
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("This field is required"),
        firstName: Yup.string().min(2, "First name must be at least 2 characters").required("This field is required"),
        lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("This field is required"),
        country: Yup.string().required("This field is required"),
        mobileNumber: Yup.string()
            .matches(/^\d{9,10}$/, "Please enter a valid mobile number")
            .required("This field is required"),
        province: Yup.string().required("This field is required"),
        city: Yup.string().min(2, "City name must be at least 2 characters").required("This field is required"),
        postcode: Yup.string().matches(/^\d{4,10}$/, "Postcode must be between 4 and 10 digits").notRequired(),
        involvement: Yup.string().required("This field is required"),
        specialties: Yup.array().of(Yup.string()).min(1, "Select at least one specialty").required("This field is required"),
        referral: Yup.string().min(2, "Referral must be at least 2 characters").required("This field is required"),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isCountrySelected, setIsCountrySelected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (modalIsOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalIsOpen]);

    const [otherSpecialty, setOtherSpecialty] = useState('');
    const [otherInvolvement, setOtherInvolvement] = useState('');

    const handleSubmit = async (values) => {
        let { involvement, specialties, country, mobileNumber, ...rest } = values;

        if (involvement === "Other") {
            involvement = otherInvolvement;
        }

        specialties = specialties.filter(specialty => specialty !== "Other");
        if (otherSpecialty) {
            specialties.push(otherSpecialty);
        }

        const fullPhoneNumber = `${countryCodes[country]}${mobileNumber}`;

        const formData = {
            ...rest,
            country,
            mobileNumber: fullPhoneNumber,
            involvement,
            specialties
        };

        setFormData(formData);
        setIsLoading(true);
        console.log('Submitting form data:', formData);

        try {
            const response = await axios.post('https://muslimintech-server.onrender.com/api/register', formData);
            console.log('Response data:', response.data);
            navigate('/thank-you');
        } catch (error) {
            console.error('There was an error!', error);
            setIsLoading(false);
        }
    };




    const handleCountryChange = (values) => {
        if (values.country === "Other") {
            setModalIsOpen(true);
        }
        setFormData({ ...formData, countryCode: countryCodes[values.country] });
        setIsCountrySelected(true);
    };

    return (
        <div>
            {isLoading ? (
                <div className="spinner-container">
                    <HashLoader size={50} color={"#DA22FF"} loading={isLoading} />
                </div>
            ) : (
                <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, errors, touched, values, setFieldValue }) => (
                        <Form>
                            <h1>Muslim in Tech - Registration</h1>
                            <div>
                                <label>Email<span className='star'>*</span></label>
                                <Field type="email" name="email" placeholder="Enter email" />
                                <div className={`errorMsg ${errors.email && touched.email ? 'visible' : ''}`}>
                                    <ErrorMessage name="email" component="div" />
                                </div>
                            </div>
                            <div>
                                <label>First Name<span className='star'>*</span></label>
                                <Field type="text" name="firstName" placeholder="Your firstname" />
                                <div className={`errorMsg ${errors.firstName && touched.firstName ? 'visible' : ''}`}>
                                    <ErrorMessage name="firstName" component="div" />
                                </div>
                            </div>
                            <div>
                                <label>Last Name<span className='star'>*</span></label>
                                <Field type="text" name="lastName" placeholder="Your lastname" />
                                <div className={`errorMsg ${errors.lastName && touched.lastName ? 'visible' : ''}`}>
                                    <ErrorMessage name="lastName" component="div" />
                                </div>
                            </div>
                            <div className="select-container">
                                <label>Country<span className='star'>*</span></label>
                                <div>
                                    <Field as="select" name="country" onChange={(e) => {
                                        handleCountryChange({ ...values, country: e.target.value });
                                        setFieldValue('country', e.target.value);
                                    }}>
                                        <option value="" disabled>Select Country</option>
                                        <option value="USA">USA</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Canada">Canada</option>
                                        <option value="NewZealand">New Zealand</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                </div>
                                <div className={`errorMsg ${errors.country && touched.country ? 'visible' : ''}`}>
                                    <ErrorMessage name="country" component="div" />
                                </div>
                            </div>
                            {values.country !== "Other" && isCountrySelected && (
                                <>
                                    <div>
                                        <label>Mobile Number<span className='star'>*</span></label>
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
                                    <div>
                                        <label>Province/Territory<span className='star'>*</span></label>
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
                                        <label>City/Town<span className='star'>*</span></label>
                                        <Field type="text" name="city" placeholder="Your city" />
                                        <div className={`errorMsg ${errors.city && touched.city ? 'visible' : ''}`}>
                                            <ErrorMessage name="city" component="div" />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Postcode/Zipcode</label>
                                        <Field type="text" name="postcode" placeholder="Your zipcode" />
                                        <div className={`errorMsg ${errors.postcode && touched.postcode ? 'visible' : ''}`}>
                                            <ErrorMessage name="postcode" component="div" />
                                        </div>
                                    </div>
                                    <div className="involvement">
                                        <label>What is your involvement in tech?<span className='star'>*</span></label>
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
                                            <div className='otherField'>
                                                <Field type="radio" name="involvement" value="Other" />
                                                <span>Other:</span>
                                                <input type="text" placeholder="Your answer" value={otherInvolvement}
                                                    onChange={(e) => setOtherInvolvement(e.target.value)} />
                                            </div>
                                            <div className={`errorMsg ${errors.involvement && touched.involvement ? 'visible' : ''}`}>
                                                <ErrorMessage name="involvement" component="div" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>What's your tech specialty/interest?<span className='star'>*</span></label>
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
                                            <div className='otherField'>
                                                <Field type="checkbox" name="specialties" value="Other" />
                                                <span>Other:</span>
                                                <input
                                                    type="text"
                                                    placeholder="Your answer"
                                                    value={otherSpecialty}
                                                    onChange={(e) => setOtherSpecialty(e.target.value)} />
                                            </div>
                                            <div className={`errorMsg ${errors.specialties && touched.specialties ? 'visible' : ''}`}>
                                                <ErrorMessage name="specialties" component="div" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>What's the name of the person that referred you or how did you get to know about us?<span className='star'>*</span></label>
                                        <Field type="text" placeholder="Your answer" name="referral" />
                                        <div className={`errorMsg ${errors.referral && touched.referral ? 'visible' : ''}`}>
                                            <ErrorMessage name="referral" component="div" />
                                        </div>
                                    </div>
                                </>
                            )}

                            <span style={{ color: 'red' }}>* singed fields are required</span>
                            <button type="submit">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik >
            )}
            <div>
                <CustomModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
            </div>
        </div>
    );
};

export default FormPage;
