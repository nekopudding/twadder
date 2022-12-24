import React from 'react'
import styles from 'styles/css/SignUpForm.module.css'
import StyledInput from './StyledInput'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'
import {ReactComponent as Logo} from 'assets/icons/twitter.svg'
import {ReactComponent as GoogleLogo} from 'assets/icons/google.svg'
import { baseURL, ins } from 'utils/fetch-api'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from 'app/toastSlice'
import axios from 'axios'


function SignInForm({
  setOpen
}) {
  const [formData,setFormData] = useState({
    username: '',
    password: ''
  })
  const toast = useSelector(state => state.toast);
  const dispatch = useDispatch();

  const handleDataChange = (e) => {
    setFormData(prev => { return { ...prev, [e.target.name]: e.target.value} });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const {username,password} = formData;
    try {
      const res = await ins({
        method: 'post',
        url: `${baseURL}/login`,
        data: {username,password}
      });
      const {msg,sessionId} = res.data;
      if (msg) dispatch(setToast({update: !toast.update, msg: msg}));
      if (res.status === 200) {
        setOpen(false);
        window.location.href = '/';
      }
      console.log(res)

    } catch(err) {
      return dispatch(setToast({update: !toast.update, msg: err.response.data.msg || err.message}));
    }
    
  }
  const signInWithGoogle = async () => undefined;

  return (
    <>
      <div className={styles.form}>
        <div className={styles.header}>
            <div className={styles.closeIconContainer} onClick={()=>setOpen(false)}>
              <CloseIcon/>
            </div>
          <div className={styles.twitterIcon}><Logo/></div>
        </div>
        <div className={`${styles.stepTitle}`}>Sign in to Twadder</div>
        <div className={`${styles.googleButton} ${styles.light}`} onClick={signInWithGoogle}>
          <GoogleLogo/>
          <span className='chatHeaderSelected'>Sign in with Google</span>
        </div>
        <div className={`body ${styles.divider}`}>
          <div className={`body ${styles.text}`}>or</div>
        </div>
        <StyledInput
          name='username'
          label='Username'
          autoComplete='off'
          type='text'
          value={formData.username}
          onChange={handleDataChange}
        />

        <StyledInput
          name='password'
          label='Password'
          type='password'
          autoComplete='off'
          value={formData.password}
          onChange={handleDataChange}
          enableShowToggle={true}
        />
        <div className={`subText ${styles.link}`}>Forgot password?</div>
        <div className={`${styles.buttonContainer} ${styles.signInButtonContainer}`}>
          <button 
            className={`sidebarButton ${styles.nextButton}`} 
            onClick={submitForm}
            disabled={!(formData.username && formData.password)}
          >Sign In</button>
        </div>
      </div>
    </>
  )
}

export default SignInForm;