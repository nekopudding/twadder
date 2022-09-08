import React from 'react'
import styles from '../../../styles/css/Timeline.module.css'

function Header() {
  return (
    <>
      <div className={styles.sectionTitleContainer}>
        <h2 className='h2'>Home</h2>
      </div>
      <div className={styles.sectionTitleOffset}></div>
    </>
  )
}

export default Header