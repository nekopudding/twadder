import { useEffect, useState } from 'react';
import styles from '../../../../styles/css/SignUpForm.module.css'
import { fetchApi } from '../../../../utils/fetch-api';

function Step2({
  formData,
  handleDataChange,
  changeStep,
  setToast
}) {
  const {email,verificationCode} = formData;

  const submitForm = async (e) => {
    e.preventDefault();
    
    const res = await fetchApi(`/signup/verify`,'POST',{verificationCode,email});
    const {msg} = await res.json();
    if (msg) setToast(prev => {return {update: !prev.update, msg: msg}});
    if (res.status === 200)
      changeStep(3);
  }

  return (
    <>
      <div className={`${styles.stepTitle} ${styles.step2Title}`}>We sent you a code</div>
      <div className={`body ${styles.verifyText}`}>Enter it below to verify {formData.email}.</div>
        <div className={styles.inputContainer}>
          <div className={`subText ${styles.label}`}>Verification code</div>
          <input 
            type="text" 
            name='verificationCode' 
            className={styles.input} 
            value={formData.verificationCode || ''} 
            onChange={handleDataChange}  
          />
        </div>
        <div className={styles.buttonContainer}>
          <button 
            className={`sidebarButton ${styles.nextButton}`} 
            onClick={submitForm}
            disabled={formData.verificationCode === ''}
          >Next</button>
        </div>
    </>
  )
}

export default Step2;