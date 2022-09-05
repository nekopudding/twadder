/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react'
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
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignUpForm/SignInForm';
import Toast from './components/Toast';


function SignUp() {
  const [toast,setToast] = useState({update: true, msg: ''});
  const [signUpFormOpen, setSignUpFormOpen] = useState(false);
  const [signInFormOpen,setSignInFormOpen] = useState(false);

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
            <div className={`${styles.button} ${styles.light}`} onClick={signUpWithGoogle}>
              <GoogleLogo/>
              <span className='chatHeaderSelected'>Sign up with Google</span>
            </div>
            <div>
              <div className={`body ${styles.divider}`}>
                <div className={`body ${styles.text}`}>or</div>
              </div>
            </div>
            <div className={`${styles.button} ${styles.accented}`} onClick={signUpWithEmail}>
              <span className='bodyHeader'>Sign up with email</span>
            </div>
            <div className={`sidebarButton ${styles.haveAccountText}`}>Already have an account?</div>
            <div className={`${styles.button} ${styles.outlined}`} onClick={signIn}>
              <span className='bodyHeader'>Sign in</span>
            </div>
          </div>
        </div>
    </div>
    {signUpFormOpen && <SignUpForm setOpen={setSignUpFormOpen} setToast={setToast} />}
    {signInFormOpen && <SignInForm setOpen={setSignInFormOpen} setToast={setToast} />}
    {toast.msg !== '' && <Toast toast={toast} duration='2s' fadeOutTime='0.5s'/>}
    </>
  )
}

export default SignUp