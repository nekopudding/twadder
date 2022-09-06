import React from 'react'
import styles from 'styles/css/SignUpForm.module.css'
import {ReactComponent as ShowIcon} from 'assets/icons/eye-solid.svg'
import {ReactComponent as HideIcon} from 'assets/icons/eye-slash-solid.svg'
import { useState } from 'react'


function StyledInput({
  name,
  label,
  type = 'text',
  value,
  onChange = () => undefined,
  onBlur  = () => undefined,
  showError = false,
  errorMsg = '',
  autoComplete,
  enableShowToggle
}) {
  const [show,setShow] = useState(false);

  return (
    <>
      <div className={`${styles.inputContainer} ${showError && styles.error}`}>
        <label className={`subText ${styles.label}`}>{label}</label>
        <div className={styles.inputFlex}>
          <input 
            type={type === 'password' ? (show ? 'text' : 'password') : type} 
            name={name}
            className={styles.input} 
            value={value} 
            autoComplete={autoComplete}
            onChange={onChange}
            onBlur={onBlur}
          />
          {enableShowToggle !== undefined && <div className={styles.icon} onClick={() => setShow(!show)}>
            {show ? <HideIcon/> : <ShowIcon/>}
          </div>}
        </div>
      </div>
      {showError && <p className={`subText ${styles.inputTooltip}`}>{errorMsg}</p>}
    </>
  )
}

export default StyledInput