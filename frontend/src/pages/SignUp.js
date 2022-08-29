import React from 'react'
import {ReactComponent as TwitterLogo} from '../assets/icons/twitter.svg'
import {ReactComponent as GoogleLogo} from '../assets/icons/google.svg'

import styles from '../styles/css/Signup.module.css'
function SignUp() {
  return (
    <>
    <div className={styles.root}>
      <div className={styles.bg}></div>
      <div className={styles.container}>
          <div className={styles.logo}>
            <TwitterLogo/>
          </div>
          <div className={styles.banner}>Happening Now</div>
          <div className={styles.actionsSection}>
            <div className={styles.subBanner}>Join Twadder today</div>
            <div className={`${styles.button} ${styles.light}`} >
              <GoogleLogo/>
              <span className='chatHeaderSelected'>Sign up with Google</span>
            </div>
            <div>
              <div className={`body ${styles.divider}`}>
                <div className={`body ${styles.text}`}>or</div>
              </div>
            </div>
            <div className={`${styles.button} ${styles.accented}`}>
              <span className='bodyHeader'>Sign up with email</span>
            </div>
            <div className={`sidebarButton ${styles.haveAccountText}`}>Already have an account?</div>
            <div className={`${styles.button} ${styles.outlined}`}>
              <span className='bodyHeader'>Sign in</span>
            </div>
          </div>
        </div>
    </div>
      
      
      
    </>
  )
}

export default SignUp