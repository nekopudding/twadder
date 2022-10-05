import { useEffect, useState } from 'react';
import styles from 'styles/css/SignUpForm.module.css'
import { baseURL } from 'utils/fetch-api';
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from 'app/toastSlice'
import axios from 'axios';

function Step2({
  formData,
  handleDataChange,
  changeStep
}) {
  const toast = useSelector(state => state.toast);
  const dispatch = useDispatch();
  const {email,verificationCode} = formData;

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios({
        method: 'post',
        url: `${baseURL}/signup/verify`,
        data: {verificationCode,email}
      });
      const {msg} = res.data;
      if (msg) dispatch(setToast({update: !toast.update, msg: msg}));
      if (res.status === 200)
        changeStep(3);
    } catch (err) {
      return dispatch(setToast({update: !toast.update, msg: err.response.data.msg || err.message}));
    }
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