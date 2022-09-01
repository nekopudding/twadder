import React, { useEffect, useRef, useState } from 'react'
import styles from 'styles/css/SignUpForm.module.css'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'
import Step1 from './Step1'
import Step2 from './Step2';

function SignUpForm({
  setOpen
}) {

  const [currStep, setCurrStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    month: 0, //0 if unselected
    day: 0,
    year: 0,
    enableNotifications: false,
    verificationCode: ''
  })

  const changeStep = (n) => {
    setCurrStep(n);
  }
  
  const handleDataChange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`)
    setFormData(prev => { return { ...prev, [e.target.name]: e.target.value} });
  }

  return (
    <>
      <div className={styles.form}>
        <div className={styles.header}>
          <div className={styles.closeIconContainer} onClick={()=>setOpen(false)}><CloseIcon/></div>
          <h2 className='h2'>{`Step ${currStep} of 3`}</h2>
        </div>
        {currStep === 1 && <Step1 formData={formData} handleDataChange={handleDataChange} setFormData={setFormData} changeStep={changeStep}/>}
        {currStep === 2 && <Step2 formData={formData} handleDataChange={handleDataChange} setFormData={setFormData} changeStep={changeStep}/>}
      </div>
    </>
  )
}

export default SignUpForm