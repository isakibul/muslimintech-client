import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose }) => {
    const handleClose = () => {
        onRequestClose();
        window.location.reload();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="Information Modal"
        >
            <div
                className='modal'
                style={{
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <p>Thank you for your interest in joining Muslims in Tech!</p>
                <p>
                    We currently officially operate only in Australia, Canada, and New Zealand. If you are from a different country and still interested in joining our community,
                    please express your interest by reaching out to us at <strong>info@muslimsintech.org</strong>
                </p>
                <button
                    style={{
                        background: 'transparent',
                        height: '50px',
                        width: '50px',
                        fontSize: '40px',
                        color: '#878483'
                    }}
                    onClick={handleClose}
                >
                    X
                </button>
            </div>
        </Modal>
    );
};

export default CustomModal;
