/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import styles from 'styles/css/SignUpForm.module.css'

function Step1({
  formData,
  handleDataChange,
  setFormData,
  changeStep
}) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const [maxDay,setMaxDay] = useState(31);

  const [enableChecks,setEnableChecks] = useState({
    name: false,
    email: false
  })
  const toggleCheck = (key,bool) => {
    setEnableChecks(prev => { return ({
      ...prev,
      [key]:bool
    }) })
  }

  useEffect(() => {
    const day = getMaxDay();
    setMaxDay(day);
  },[formData])

  const getMaxDay = () => {
    const {day,month,year} = formData;
    // console.log(`day: ${day}; month: ${month}; year: ${year}`);
    const md = new Date(year || 2022, month || 1, 0).getDate();
    //clear formData day if overflowing max
    if (formData.day > md) {
      setFormData(prev => { return {...prev, day: 0}})
    }
    return md;
  }
  const inputsAreValid = () => {
    let valid = true;
    if (!nameIsValid()) valid = false;
    if (!emailIsValid()) valid = false;
    if (formData.month === 0 || formData.year === 0 || formData.day === 0) valid = false;
    return valid;
  }
  const nameIsValid = () => {
    return /[a-zA-Z0-9]{3,}$/.test(formData.name);
  }
  const emailIsValid = () => {
    return /[a-zA-Z0-9._+-]+@[a-zA-Z0-9 -]+\.[a-z]{2,}$/.test(formData.email);
  }

  return (
    <>
      <form className={styles.stepContainer}>
        <div>
          <div className={styles.stepTitle}>Create your account</div>
          <div className={`${styles.inputContainer} ${enableChecks.name && !nameIsValid() && styles.error}`}>
            <div className={`subText ${styles.label}`}>Name</div>
            <input 
              type="text" 
              name='name' 
              className={styles.input} 
              value={formData.name} 
              onChange={handleDataChange}
              onBlur={() => toggleCheck('name',true)}
              onFocus={()=>toggleCheck('name',false)}
            />
          </div>
          {enableChecks.name && !nameIsValid() && <p className={`subText ${styles.inputTooltip}`}>Name can only contain alphanumeric characters, and must contain a minimum of 3 characters.</p>}

          <div className={`${styles.inputContainer} ${enableChecks.email && !emailIsValid() && styles.error}`}>
            <div className={`subText ${styles.label}`}>Email</div>
            <input 
              type="email" 
              className={styles.input} 
              name='email' 
              value={formData.email} 
              onChange={handleDataChange}
              onBlur={() => toggleCheck('email',true)}
              onFocus={()=>toggleCheck('email',false)}
            />
          </div>
          {enableChecks.email && !emailIsValid() && <p className={`subText ${styles.inputTooltip}`}>Invalid email.</p>}

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
      </div>
        
        <div className={styles.buttonContainer}>
          <button className={`sidebarButton ${styles.nextButton}`} onClick={()=>changeStep(2)} disabled={!inputsAreValid()}>Next</button>
        </div>
      </form>
      
    </>
  )
}

export default Step1;