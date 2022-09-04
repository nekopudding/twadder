import React, { useEffect, useRef, useState } from 'react'
import styles from 'styles/css/SignUpForm.module.css'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'
import {ReactComponent as BackIcon} from  'assets/icons/arrow-left.svg'
import Step1 from './Step1'
import Step2 from './Step2';
import Step3 from './Step3';
import Toast from '../Toast';

function SignUpForm({
  setOpen, setToast
}) {

  const [currStep, setCurrStep] = useState(3);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
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
    if (e.target.name === 'enableNotifications') {
      setFormData(prev => { return { ...prev, enableNotifications: !prev.enableNotifications} });
    } else if (e.target.name === 'verificationCode') {
      // console.log({verificationCode: Number(e.target.value)});
      setFormData(prev => { return { ...prev, verificationCode: Number(e.target.value)} });
    } else {
      // console.log(`${e.target.name}: ${e.target.value}`)
      setFormData(prev => { return { ...prev, [e.target.name]: e.target.value} });
    }

  }

  return (
    <>
      <div className={styles.form}>
        <div className={styles.header}>
          {currStep <= 1 ? 
            <div className={styles.closeIconContainer} onClick={()=>setOpen(false)}><CloseIcon/></div>
            :
            <div className={styles.closeIconContainer} onClick={()=>setCurrStep(currStep-1)}><BackIcon/></div>
          }
          <h2 className='h2'>{`Step ${currStep} of 3`}</h2>
        </div>
        {currStep === 1 && <Step1 formData={formData} handleDataChange={handleDataChange} setFormData={setFormData} changeStep={changeStep} setToast={setToast}/>}
        {currStep === 2 && <Step2 formData={formData} handleDataChange={handleDataChange} setFormData={setFormData} changeStep={changeStep} setToast={setToast}/>}
        {currStep === 3 && <Step3 formData={formData} handleDataChange={handleDataChange} changeStep={changeStep} setToast={setToast} setOpen={setOpen}/>}
      </div>
    </>
  )
}

export default SignUpForm