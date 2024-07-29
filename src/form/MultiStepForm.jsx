import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import CustomModal from './CustomModal';
import axios from 'axios';
import { HashLoader } from 'react-spinners';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
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
        referral: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (modalIsOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalIsOpen]);

    const nextStep = (values) => {
        setFormData({ ...formData, ...values });
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (values) => {
        setFormData({ ...formData, ...values });
        setIsLoading(true);
        console.log('Submitting form data:', { ...formData, ...values });

        axios.post('https://muslimintech-server.onrender.com/api/register', { ...formData, ...values })
            .then(response => {
                console.log('Response data:', response.data);
                navigate('/thank-you');
            })
            .catch(error => {
                console.error('There was an error!', error);
                setIsLoading(false);
            });
    };

    const handleCountryChange = (values) => {
        if (values.country === "Other") {
            setModalIsOpen(true);
        } else {
            nextStep(values);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <FirstStep nextStep={handleCountryChange} formData={formData} />;
            case 2:
                return <SecondStep nextStep={nextStep} prevStep={prevStep} formData={formData} />;
            case 3:
                return <ThirdStep handleSubmit={handleSubmit} prevStep={prevStep} formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {isLoading ? (
                <div className="spinner-container">
                    <HashLoader size={50} color={"#123abc"} loading={isLoading} />
                </div>
            ) : (
                renderStep()
            )}
            <div>
                <CustomModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
            </div>
        </div>
    );
};

export default MultiStepForm;