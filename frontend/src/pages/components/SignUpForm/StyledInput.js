import React from 'react'
import styles from 'styles/css/SignUpForm.module.css'

function StyledInput({
  name,
  label,
  type = 'text',
  value,
  onChange = () => undefined,
  onBlur  = () => undefined,
  showError = false,
  errorMsg = '',
  autoComplete
}) {
  return (
    <>
      <div className={`${styles.inputContainer} ${showError && styles.error}`}>
        <label className={`subText ${styles.label}`}>{label}</label>
        <input 
          type={type} 
          name={name}
          className={styles.input} 
          value={value} 
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {showError && <p className={`subText ${styles.inputTooltip}`}>{errorMsg}</p>}
    </>
  )
}

export default StyledInput