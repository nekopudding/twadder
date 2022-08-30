import React, { useEffect, useRef, useState } from 'react'
import styles from '../../styles/css/SignUpForm.module.css'
import {ReactComponent as CloseIcon} from  'assets/icons/close.svg'

function SignUpForm({
  open,
  setOpen
}) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const [currStep, setCurrStep] = useState(0);
  const [maxDay,setMaxDay] = useState(31);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    month: 0, //0 if unselected
    day: 0,
    year: 0,
    enableNotifications: false
  })

  useEffect(() => {
    const day = getMaxDay();
    setMaxDay(day);
  },[formData])

  const getMaxDay = () => {
    const {day,month,year} = formData;
    console.log(`day: ${day}; month: ${month}; year: ${year}`);
    const md = new Date(year || 2022, month || 1, 0).getDate();
    //clear formData day if overflowing max
    if (formData.day > md) {
      setFormData(prev => { return {...prev, day: 0}})
    }
    return md;
  }
  const handleDataChange = (e) => {
    setFormData(prev => { return { ...prev, [e.target.name]: e.target.value} });
  }

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
          <input type="text" name='name' className={styles.input} value={formData.name} onChange={handleDataChange}/>
        </div>
        <div className={styles.inputContainer}>
          <div className={`subText ${styles.label}`}>Email</div>
          <input type="email" className={styles.input}/>
        </div>
        <div className={`bodyHeader ${styles.subTitle}`}>Date of birth</div>
        <div className={styles.subBody}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>
        <div className={styles.dateInputContainer}>
          <div className={`${styles.inputContainer} ${styles.birthday} ${styles.month}`}>
            <div className={`subText ${styles.label}`}>Month</div>
            <select id='monthSelect' name="month" className={styles.input} onChange={handleDataChange}>
              <option value={0}></option>
              {months.map((m,i) => 
                <option key={m} value={i+1}>{m}</option>
              )}
            </select>

          </div>
          <div className={`${styles.inputContainer} ${styles.birthday} ${styles.day}`}>
            <div className={`subText ${styles.label}`}>Day</div>
            <select id='daySelect' name="day" className={styles.input} onChange={handleDataChange}>
              <option value={0}></option>
              {
                [...Array(maxDay)].map((_,i) => <option key={i} value={i+1}>{i+1}</option>)
              }
            </select>
          </div>
          <div className={`${styles.inputContainer} ${styles.birthday} ${styles.year}`}>
            <div className={`subText ${styles.label}`}>Year</div>
            <select id='yearSelect' name="year" className={styles.input} onChange={handleDataChange}>
              <option value={0}></option>
              {
                [...Array.from({length: 100}, (_, i) => new Date().getFullYear() - i)]
                  .map((y,i) => <option key={i} value={y}>{y}</option>)
              }
            </select>
          </div>
        </div>
        <div className={styles.submitButtonContainer}>
          <div className={`sidebarButton ${styles.submitButton}`}>Sign Up</div>
        </div>
      </div>
    </>
  )
}

export default SignUpForm