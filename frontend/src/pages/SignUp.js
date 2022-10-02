/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import {ReactComponent as TwitterLogo} from '../assets/icons/twitter.svg'
import {ReactComponent as GoogleLogo} from '../assets/icons/google.svg'
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import styles from 'styles/css/SignUp.module.css'
import SignUpForm from './components/DialogForm/SignUpForm/SignUpForm';
import SignInForm from './components/DialogForm/SignInForm';
import Toast from './components/Toast';
import { useDispatch } from 'react-redux';
import { setToast } from 'app/toastSlice';

function SignUp() {
  const [signUpFormOpen, setSignUpFormOpen] = useState(false);
  const [signInFormOpen,setSignInFormOpen] = useState(false);
  const dispatch = useDispatch();

  const signUpWithGoogle = async () => {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }
  const signUpWithEmail = () => {
    setSignUpFormOpen(true);
    setSignInFormOpen(false);
  }

  const signIn = () => {
    setSignInFormOpen(true);
    setSignUpFormOpen(false);
  }

  useEffect(()=> {
    dispatch(setToast({update: true, msg:''})); //reset toast msg
  },[])

  return (
    <>
    <div className={styles.root} css={css`
      overflow: ${signUpFormOpen || signInFormOpen ? 'hidden' : 'visible'};
      pointer-events: ${signUpFormOpen || signInFormOpen ? 'none' : 'auto'};
    `}>
      <div className={styles.bg}></div>
      <div className={styles.container}>
          <div className={styles.logo}>
            <TwitterLogo/>
          </div>
          <div className={styles.banner}>Happening Now</div>
          <div className={styles.actionsSection}>
            <div className={styles.subBanner}>Join Twadder today</div>
            <button className={`${styles.button} ${styles.light}`} onClick={signUpWithGoogle} disabled>
              <GoogleLogo/>
              <span className='chatHeaderSelected'>Sign up with Google</span>
            </button>
            <div>
              <div className={`body ${styles.divider}`}>
                <div className={`body ${styles.text}`}>or</div>
              </div>
            </div>
            <button className={`${styles.button} ${styles.accented}`} onClick={signUpWithEmail}>
              <span className='bodyHeader'>Sign up with email</span>
            </button>
            <div className={`sidebarButton ${styles.haveAccountText}`}>Already have an account?</div>
            <button className={`${styles.button} ${styles.outlined}`} onClick={signIn}>
              <span className='bodyHeader'>Sign in</span>
            </button>
          </div>
        </div>
    </div>
    {signUpFormOpen && <SignUpForm setOpen={setSignUpFormOpen} />}
    {signInFormOpen && <SignInForm setOpen={setSignInFormOpen} />}
    <Toast duration='2s' fadeOutTime='0.5s'/>
    </>
  )
}

export default SignUp