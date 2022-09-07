import React from 'react'
import styles from '../../../styles/css/PostSection.module.css'

function PostSection() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitleContainer}>
        <h2 className='h2'>Home</h2>
      </div>
      <div className={styles.sectionTitleOffset}>
        <h2 className='h2'>Home</h2>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.avatar}></div>
        <div className={styles.inputEditor}>
          <textarea className={`input ${styles.textarea}`} name="input" placeholder={`What's happening?`}>

          </textarea>
        </div>
      </div>
    </div>
  )
}

export default PostSection