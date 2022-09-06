import React from 'react'
import { useState } from 'react'
import styles from '../../../../styles/css/SignUpForm.module.css'
import { fetchApi } from '../../../../utils/fetch-api';
import StyledInput from '../StyledInput';

const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;
//Password must be between 8 and 16 characters long.
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+`~]{8,16}$/

function Step3({
  formData,
  handleDataChange,
  changeStep,
  setToast,
  setOpen
}) {
  const [enableChecks,setEnableChecks] = useState({
    username: false,
    password: false
  })
  const toggleCheck = (key,bool) => {
    setEnableChecks(prev => { return ({
      ...prev,
      [key]:bool
    }) })
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const {name,email,username,password,month,day,year,enableNotifications,verificationCode} = formData;

    const res = await fetchApi(`/signup`,'POST',{
      name,email,username,password,enableNotifications,verificationCode,
      birthday: new Date(`${month}/${day}/${year}`)    
    });
    const {msg} = await res.json();
    if (msg) setToast(prev => {return {update: !prev.update, msg: msg}});
    if (res.status === 200)
      setOpen(false);
  }

  const usernameIsValid = () => {
    return usernameRegex.test(formData.username);
  }
  const passwordIsValid = () => {
    return passwordRegex.test(formData.password);
  }

  const inputsAreValid = () => {
    return usernameIsValid() && passwordIsValid()
  }

  return (
    <>
      <div className={`${styles.stepTitle}`}>Finishing up</div>
      <StyledInput
        name='username'
        label='Username'
        autoComplete='off'
        type='text'
        value={formData.username}
        onChange={handleDataChange}
        onBlur={()=>toggleCheck('username',true)}
        showError={enableChecks.username && !usernameIsValid()}
        errorMsg = 'Usernames can only contain alphanumeric characters, and be between 3 and 16 characters.'
      />

      <StyledInput
        name='password'
        label='Password'
        type='password'
        autoComplete='off'
        value={formData.password}
        onChange={handleDataChange}
        onBlur={()=>toggleCheck('password',true)}
        showError={enableChecks.password && !passwordIsValid()}
        errorMsg = 'Passwords must be between 8 and 16 characters.'
      />
      
      <div className={styles.buttonContainer}>
        <button 
          className={`sidebarButton ${styles.signUpButton}`} 
          onClick={submitForm}
          disabled={!inputsAreValid()}
        >Sign Up</button>
      </div>
    </>
  )
}

export default Step3