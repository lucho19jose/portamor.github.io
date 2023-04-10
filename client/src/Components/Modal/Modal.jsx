import React, { useState } from 'react';
import Login from '../Login/Login';
import RegisterUser from '../RegisterUser/RegisterUser';
import styles from './Modal.module.css';
import CustomButton from '../CustomButton/CustomButton';

function Modal({ onClose }) {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const onRegister = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setShowContent(true);
  };

  const onLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowContent(true);
  };

  const registerForm = showRegisterForm ? <RegisterUser /> : null;
  const loginForm = showLoginForm ? <Login /> : null;
  const content = showContent ? (registerForm || loginForm) : null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h1>Bienvenidos!</h1>
        {content && <div className={styles.modalContent}>{content}</div>}
        {!showContent && (
          <div className={styles.buttonsContainer}>
            {!showLoginForm    && <CustomButton content={"Registrarme"} primary={false} onClick={onRegister} /> }
            {!showRegisterForm && <CustomButton content={"Iniciar sesion"} primary={true} onClick={onLogin} />  }
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;