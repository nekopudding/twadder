import React from 'react'
import styles from '../../../styles/css/Timeline.module.css'
import InputBox from './InputBox'
import PostSection from './PostSection'



function Timeline() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitleContainer}>
        <h2 className='h2'>Home</h2>
      </div>
      <div className={styles.sectionTitleOffset}></div>
      <InputBox/>
      <PostSection/>
    </div>
  )
}

export default Timeline