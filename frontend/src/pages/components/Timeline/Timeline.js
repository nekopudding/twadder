import React from 'react'
import styles from '../../../styles/css/Timeline.module.css'
import Header from './Header'
import InputBox from './InputBox'
import PostSection from './PostSection/PostSection'



function Timeline() {
  return (
    <div className={styles.container}>
      <Header/>
      <InputBox/>
      <PostSection/>
    </div>
  )
}

export default Timeline