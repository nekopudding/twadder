import React, { useState } from 'react'
import styles from '../../styles/css/SignUpForm.module.css'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'

function SignUpForm({
  open,
  setOpen
}) {
  const [currStep, setCurrStep] = useState(0);

  return (
    <>
      <div className={styles.form}>
        <div className={styles.header}>
          <CloseIcon/>
          <h2 className='h2'>{`Step ${currStep + 1} of 1`}</h2>
        </div>
        <div className={styles.stepTitle}>Create your account</div>
        <div className={styles.inputContainer}>
          <div className={`subText ${styles.label}`}>Name</div>
          <input type="text" className={styles.input}/>
        </div>
      </div>
    </>
  )
}

export default SignUpForm