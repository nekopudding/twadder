/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react'
import {ReactComponent as TwitterLogo} from 'assets/icons/twitter.svg'
import {ReactComponent as GoogleLogo} from 'assets/icons/google.svg'
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import styles from 'styles/css/SignUp.module.css'
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm';
import Toast from '../../components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from 'app/toastSlice';
import { baseURL, ins } from 'utils/fetch-api';

const cred1 = {
  username: 'dean',
  password: 'yang1234'
}
const cred2 = {
  username: 'dean2',
  password: 'yang1234'
}

function SignUp() {
  const [signUpFormOpen, setSignUpFormOpen] = useState(false);
  const [signInFormOpen,setSignInFormOpen] = useState(false);
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast);

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

  const autoSignIn = async (cred) => {
    try {
      const res = await ins({
        method: 'post',
        url: `${baseURL}/login`,
        data: cred
      });
      const {msg,sessionId} = res.data;
      if (msg) dispatch(setToast({update: !toast.update, msg: msg}));
      if (res.status === 200) {
        window.location.href = '/';
      }
    } catch(err) {
      return dispatch(setToast({update: !toast.update, msg: err.response.data.msg || err.message}));
    }
  }
  const testAccount1 = () => {
    return autoSignIn(cred1);
  }
  const testAccount2 = () => {
    return autoSignIn(cred2);
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
            <button className={`${styles.button} ${styles.light}`} onClick={testAccount1}>
              <span className='bodyHeader'>Sign in with test account 1</span>
            </button>
            <button className={`${styles.button} ${styles.light}`} onClick={testAccount2}>
              <span className='bodyHeader'>Sign in with test account 2</span>
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