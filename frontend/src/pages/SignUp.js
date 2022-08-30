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
import styles from '../styles/css/SignUp.module.css'
import SignUpForm from './components/SignUpForm';


function SignUp() {
  const [formOpen, setFormOpen] = useState(false);

  // const signUpWithEmail = () => {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       // ...
  //     })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
  // }
  const signUpWithGoogle = async () => {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }
  const signUpWithEmail = () => {
    setFormOpen(true);
  }
  function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
  }
  // Initialize firebase auth
  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), (user) => {
      // if (user) {
      //   // User is signed in!
      //   // Get the signed-in user's profile pic and name.
      //   var profilePicUrl = getProfilePicUrl();
      //   var userName = getUserName();
    
      //   // Set the user's profile pic and name.
      //   userPicElement.style.backgroundImage =
      //     'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
      //   userNameElement.textContent = userName;
    
      //   // Show user's profile and sign-out button.
      //   userNameElement.removeAttribute('hidden');
      //   userPicElement.removeAttribute('hidden');
      //   signOutButtonElement.removeAttribute('hidden');
    
      //   // Hide sign-in button.
      //   signInButtonElement.setAttribute('hidden', 'true');
    
      //   // We save the Firebase Messaging Device token and enable notifications.
      //   saveMessagingDeviceToken();
      // } else {
      //   // User is signed out!
      //   // Hide user's profile and sign-out button.
      //   userNameElement.setAttribute('hidden', 'true');
      //   userPicElement.setAttribute('hidden', 'true');
      //   signOutButtonElement.setAttribute('hidden', 'true');
    
      //   // Show sign-in button.
      //   signInButtonElement.removeAttribute('hidden');
      // }
    });
  }
  
  // // Returns the signed-in user's profile Pic URL.
  // function getProfilePicUrl() {
  //   return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
  // }
  
  // // Returns the signed-in user's display name.
  // function getUserName() {
  //   return getAuth().currentUser.displayName;
  // }
  
  // // Returns true if a user is signed-in.
  // function isUserSignedIn() {
  //   return !!getAuth().currentUser;
  // }
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
              <span className='chatHeaderSelected' onClick={signUpWithGoogle}>Sign up with Google</span>
            </div>
            <div>
              <div className={`body ${styles.divider}`}>
                <div className={`body ${styles.text}`}>or</div>
              </div>
            </div>
            <div className={`${styles.button} ${styles.accented}`}>
              <span className='bodyHeader' onClick={signUpWithEmail}>Sign up with email</span>
            </div>
            <div>{`${formOpen}`}</div>
            <div className={`sidebarButton ${styles.haveAccountText}`}>Already have an account?</div>
            <div className={`${styles.button} ${styles.outlined}`}>
              <span className='bodyHeader'>Sign in</span>
            </div>
          </div>
        </div>
    </div>
    <SignUpForm open={formOpen} setOpen={setFormOpen}/>
    </>
  )
}

export default SignUp